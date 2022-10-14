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

export const delegateOrder = async (order) => {
    let { address } = order;
    //get all online drivers
    let drivers = await findObjectsByMetadata("driver", { online: true }, 0);
    //find drivers that are in the same city as the order destination address
    let sameCityDrivers = drivers?.filter((d) => {
        return address.local?.includes(d.city);
    })
    //if there are any drivers nearby, pick from them, otherwise pick from all
    if (sameCityDrivers?.length >= 0) drivers = sameCityDrivers;

    let isValidDriver = false, randomDriver;
    let allPendingOrders = await findObjectsByMetadata("order", { status: 'Pending' }, 0);
    if(!drivers || !allPendingOrders) return false;
    console.log("Drivers to pick from", drivers);
    console.log("Orders to check", allPendingOrders);
    do {
        //pick random driver from drivers
        randomDriver = drivers[Math.floor((Math.random() * drivers.length))]
        //fetch all pending orders, if any contain the selected randomDriver id, the driver already has an order pending and it thereby invalid, loop, try again.
        isValidDriver = !allPendingOrders.some((o) => {
            return o.driverId == randomDriver.id;
        });
    } while (!isValidDriver);
    //assign order to driver
    updateObject("order", order.id, { driverId: randomDriver.id });
    return true;
}