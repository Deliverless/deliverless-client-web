import { getObjectById, updateObject, createNewObject, findObjectByMetadata } from '../lib/web3-helper'

export default class Address {
    constructor(type, local, region, country, postal, street, unit, lat, lon) {
        this.type = type;
        this.local = local;
        this.region = region;
        this.country = country;
        this.postal = postal;
        this.street = street;
        this.unit = unit;
        this.lat = lat;
        this.lon = lon;
    }
}

export const getAddress = async (id) => {
    return (await getObjectById("address", id)
        .catch(err => console.log(err))).data;
}

export const getAddresses = async () => {
    return (await getObjectById("address", "")
        .catch(err => console.log(err))).data;
}

export const updateAddress = async (id, newData) => {
    return (await updateObject("address", id, newData)
        .catch(err => console.log(err))).data;
}

export const createAddress = async (item) => {
    return (await createNewObject("address", item)
        .catch(err => console.log(err))).data;
}