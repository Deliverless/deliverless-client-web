import { getObjectById, updateObject, createNewObject } from '../lib/web3-helper'
import { updateCustomer } from '../models/customer'
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

export const getOrder = async (id) => {
    return (await getObjectById("orders", id)
        .catch(err => console.log(err))).data;
}

// export const getCustomerOrders = async (id) => {
//     return (await getObjectById("orders", id)
//         .catch(err => console.log(err))).data;
// }

export const getOrders = async () => {
    return (await getObjectById("orders", "")
        .catch(err => console.log(err))).data;
}

export const updateOrder = async (id, newData) => {
    return (await updateObject("orders", id, newData)
        .catch(err => console.log(err))).data;
}

export const createOrder = async (order, user) => {
    return (await createNewObject("orders", order)
        .then((order) => {
            console.log(order)
            let prevOrderIds = user.orderIds != null ? user.orderIds : []
            updateCustomer(user.id, { orderIds: [...prevOrderIds, order.id] })
            return order;
        }).catch(err => console.log(err))).data;
}
