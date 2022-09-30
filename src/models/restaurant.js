import { getObjectById, updateObject, createNewObject } from '../lib/web3-helper'
export default class Restaurant {
    constructor(name, addressId, hours, itemIds, rating, reviewIds, image, userId) {
        this.name = name;
        this.addressId = addressId;
        this.hours = hours;
        this.itemIds = itemIds;
        this.rating = rating;
        this.reviewIds = reviewIds;
        this.image = image;
        this.userId = userId;
    }
}

export const getRestaurant = async (id) => {
    return (await getObjectById("restaurant", id)
        .catch(err => console.log(err))).data;
}

export const getRestaurants = async () => {
    return (await getObjectById("restaurant", "")
        .catch(err => console.log(err))).data;
}

export const updateRestaurant = async (id, newData) => {
    return (await updateObject("restaurant", id, newData)
        .catch(err => console.log(err))).data;
}

export const createRestaurant = async (restaurant) => {
    return (await createNewObject("restaurant", restaurant)
        .catch(err => console.log(err))).data;
}