import { getObjectById, updateObject, createNewObject, findObjectByMetadata } from '../lib/web3-helper'
import { updateCustomer } from '../models/customer'
export default class Order {
    constructor(userId, driverId, restaurantId, transactionId, address, isPickup,
        status, discount, tax, driverFee, subtotal, total, tip, timestamp, items) {
        this.userId = userId;
        this.driverId = driverId;
        this.transactionId = transactionId;
        this.restaurantId = restaurantId;
        this.address = address;
        this.isPickup = isPickup;
        this.status = status;
        this.discount = discount;
        this.tax = tax;
        this.driverFee = driverFee;
        this.subtotal = subtotal;
        this.total = total;
        this.tip = tip;
        this.timestamp = timestamp;
        this.items = items;
    }
}

export const getOrder = async (id) => {
    return (await getObjectById("order", id)
        .catch(err => console.log(err))).data;
}

export const getOrders = async () => {
    return (await getObjectById("order", "")
        .catch(err => console.log(err))).data;
}

// export const getUserOrders = async (userId) => {
//     return (await getObjectById("order", { userId })
//         .catch(err => console.log(err))).data;
// }

export const updateOrder = async (id, newData) => {
    return (await updateObject("order", id, newData)
        .catch(err => console.log(err))).data;
}

export const createOrder = async (order, customer) => {
    return (await createNewObject("order", order)
        .then((order) => {
            console.log(order)
            let prevOrderIds = customer.orderIds != null ? customer.orderIds : []
            updateCustomer(customer.id, { orderIds: [...prevOrderIds, order.id] })
            return order;
        }).catch(err => console.log(err))).data;
}
