import { getObjectById, updateObject, createNewObject, findObjectByMetadata } from '../lib/web3-helper'
export default class Restaurant {
    constructor(name, address, hours, itemIds, rating, reviewIds, image, userId) {
        this.name = name;
        this.address = address;
        this.hours = hours;
        this.itemIds = itemIds;
        this.rating = rating;
        this.reviewIds = reviewIds;
        this.image = image;
        this.userId = userId;
    }
}

export const getRestaurant = async (id) => {
    return (await getObjectById("restaurants", id)
        .catch(err => console.log(err))).data;
}

export const findRestaurantByUserId = async (userId) => {
    return (await findObjectByMetadata("restaurant", { userId })
        .catch(err => console.log(err))).data;
}

export const getRestaurants = async () => {
    return (await getObjectById("restaurants", "")
        .catch(err => console.log(err))).data;
}

export const updateRestaurant = async (id, newData) => {
    return (await updateObject("restaurant", id, newData)
        .catch(err => console.log(err))).data;
}

export const signUpRestaurant = async (restaurant) => {
    return (await createNewObject("restaurant", restaurant)
        .catch(err => console.log(err))).data;
}