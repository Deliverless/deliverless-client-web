import { getObjectById, updateObject, createNewObject } from '../lib/web3-helper'
export default class Restaurant {
    constructor(name, addressId, hours, itemIds, rating, reviewIds, image) {
        this.name = name;
        this.addressId = addressId;
        this.hours = hours;
        this.itemIds = itemIds;
        this.rating = rating;
        this.reviewIds = reviewIds;
        this.image = image;
    }
}

export const getRestaurant = async (id) => {
    return (await getObjectById("restaurants", id)
        .catch(err => console.log(err))).data;
}

export const getRestaurants = async () => {
    return (await getObjectById("restaurants", "")
        .catch(err => console.log(err))).data;
}

export const updateRestaurant = async (id, newData) => {
    return (await updateObject("restaurants", id, newData)
        .catch(err => console.log(err))).data;
}

export const createRestaurant = async (restaurant) => {
    return (await createNewObject("restaurants", restaurant)
        .catch(err => console.log(err))).data;
}