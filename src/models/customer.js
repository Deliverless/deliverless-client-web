import { getObjectById, updateObject, createNewObject, findObjectsByMetadata } from '../lib/web3-helper'

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

export const findCustomerByUserId = async (userId) => {
    return (await findObjectsByMetadata("customer", { userId })
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

export const signUpCustomer = async (customer) => {
    return (await createNewObject("customer", customer)
        .catch(err => console.log(err))).data;
}