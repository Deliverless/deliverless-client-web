import { getObjectById, updateObject, createNewObject } from '../lib/web3-helper'

export default class Customer {
    constructor(orderIds, userId) {
        this.orderIds = orderIds;
        this.userId = userId;
    }
}

export const getCustomer = async (id) => {
    return (await getObjectById("customers", id)
        .catch(err => console.log(err))).data;
}

export const getCustomers = async () => {
    return (await getObjectById("customers", "")
        .catch(err => console.log(err))).data;
}

export const updateCustomer = async (id, newData) => {
    return (await updateObject("customers", id, newData)
        .catch(err => console.log(err))).data;
}

export const createCustomer = async (cust) => {
    return (await createNewObject("customers", cust)
        .catch(err => console.log(err))).data;
}