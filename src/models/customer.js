import { getObjectById, updateObject, createNewObject } from '../lib/web3-helper'

export default class Customer {
    constructor(orderIds, userId) {
        this.orderIds = orderIds;
        this.userId = userId;
    }
}

export const getCustomer = async (id) => {
    return (await getObjectById("customer", id)
        .catch(err => console.log(err))).data;
}

export const getCustomers = async () => {
    return (await getObjectById("customer", "")
        .catch(err => console.log(err))).data;
}

export const updateCustomer = async (id, newData) => {
    return (await updateObject("customer", id, newData)
        .catch(err => console.log(err))).data;
}

export const createCustomer = async (cust) => {
    return (await createNewObject("customer", cust)
        .catch(err => console.log(err))).data;
}