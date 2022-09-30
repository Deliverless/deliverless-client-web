import { getObjectById, updateObject, createNewObject, findObjectByMetadata } from '../lib/web3-helper'

export default class Driver {
    constructor(vehicleId, rating, reviewIds, userId) {
        this.vehicleId = vehicleId;
        this.rating = rating;
        this.reviewIds = reviewIds;
        this.userId = userId;
    }
}

export const getDriver = async (id) => {
    return (await getObjectById("driver", id)
        .catch(err => console.log(err))).data;
}

export const findDriverByUserId = async (userId) => {
    return (await findObjectByMetadata("driver", { userId })
        .catch(err => console.log(err))).data;
}

export const getDrivers = async () => {
    return (await getObjectById("driver", "")
        .catch(err => console.log(err))).data;
}

export const updateDriver = async (id, newData) => {
    return (await updateObject("driver", id, newData)
        .catch(err => console.log(err))).data;
}

export const signUpDriver = async (driver) => {
    return (await createNewObject("driver", driver)
        .catch(err => console.log(err))).data;
}