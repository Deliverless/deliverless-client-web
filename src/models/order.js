import { getObjectById, updateObject, createNewObject, findObjectsByMetadata } from '../lib/web3-helper'
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

export const findOrdersByUserId = async (userId) => {
    return (await findObjectsByMetadata("order", { userId }, 0)
        .catch(err => console.log(err))).data;
}

export const updateOrder = async (id, newData) => {
    return (await updateObject("order", id, newData)
        .catch(err => console.log(err))).data;
}

export const createOrder = async (order, customer) => {
    console.log("given order", order);
    console.log("customer", customer);
    let returnobj = await createNewObject("order", order)
        .then((_order) => {
            console.log("order", _order)
            let prevOrderIds = customer.orderIds != null ? customer.orderIds : []
            updateCustomer(customer.id, { orderIds: [...prevOrderIds, _order.data.id] })
            return _order.data;
        }).catch(err => console.log(err));
    console.log("returning", returnobj);
    return returnobj
}
