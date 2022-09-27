import orderSchema from '../metadata_schemas/Order.json'
import Orm from 'bigchaindb-orm'

export default class Order {
    constructor(userId, driverId, restaurantId, transactionId, addressId, isPickup,
        status, discount, tax, driverFee, subtotal, total, timestamp, items) {
        this.userId = userId;
        this.driverId = driverId;
        this.restaurantId = restaurantId;
        this.transactionId = transactionId;
        this.addressId = addressId;
        this.isPickup = isPickup;
        this.status = status;
        this.discount = discount;
        this.tax = tax;
        this.driverFee = driverFee;
        this.subtotal = subtotal;
        this.total = total;
        this.timestamp = timestamp;
        this.items = items;
    }
}

function bigchainORMClient(modelName, schema) {
    const bdbOrm = new Orm("http://24.150.93.243:9984/api/v1/")
    bdbOrm.define(modelName, schema)
    const newKeypair = new bdbOrm.driver.Ed25519Keypair()
    return { bdbOrm, newKeypair };
}

export const retrieve = (id) => {
    const { bdbOrm } = bigchainORMClient("orders", orderSchema);
    return bdbOrm.models.orders
        .retrieve(id)

}

export const updateOrder = async (id, newData) => {
    const updatedOrder = await retrieve(id)
        .then(async orderAsset => {
            return await orderAsset.append({
                toPublicKey: orderAsset.data.key_pair.publicKey,
                keypair: orderAsset.data.key_pair,
                data: { ...newData }
            })
        })
}

export const create = async (order, user) => {

    const { bdbOrm, newKeypair } = bigchainORMClient("orders", orderSchema);
    const { userID, restaurantID, restaurantName, deliveryAddress, discount, tax, driverFee, subtotal, total, status, timePlaced, foods } = order

    return await bdbOrm.models.orders
        .create({
            keypair: newKeypair,
            data: {
                userID,
                restaurantID,
                restaurantName,
                deliveryAddress,
                discount,
                tax,
                driverFee,
                subtotal,
                total,
                status,
                timePlaced,
                foods,
                key_pair: newKeypair
            }
        })
        .then(async asset => {
            let prevOrderIds = user.orderIds != null ? user.orderIds : []
            console.log("user ID", user.asset_id)
            const updatedUser = await retrieve(user.asset_id)
                .then(userAsset => {
                    console.log("USER ASSET", userAsset)
                    return userAsset[0].append({
                        toPublicKey: user.key_pair.publicKey,
                        keypair: user.key_pair,
                        data: {
                            orderIds: [...prevOrderIds, asset.id],
                        }
                    })
                })
            console.log({ asset, user: updatedUser.data })
            return { asset, user: updatedUser.data }
        })
        .then((newOrder) => { console.log("NEW ORDER", newOrder.asset); return newOrder })
}
