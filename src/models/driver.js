import { getObjectById, updateObject, createNewObject, findObjectsByMetadata, deleteObject } from '../lib/web3-helper'

export default class Driver {
    constructor(vehicleId, rating, reviewIds, userId, online, city) {
        this.vehicleId = vehicleId;
        this.rating = rating;
        this.reviewIds = reviewIds;
        this.userId = userId;
        this.online = online;
        this.city = city;
    }
}

export const getDriver = async (id) => {
    return (await getObjectById("driver", id)
        .catch(err => console.log(err))).data;
}

export const findDriverByUserId = async (userId) => {
    return (await findObjectsByMetadata("driver", { userId })
        .catch(err => console.log(err))).data;
}

export const getDrivers = async () => {
    return (await getObjectById("driver", "")
        .catch(err => console.log(err))).data;
}

export const deleteDriver = async (id) => {
    return (await deleteObject("driver", id)
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