import {
  createNewObject,
  getObjectById,
  updateObject,
} from '../lib/web3-helper';
import {
  requestRestaurant,
  updateRestaurant,
} from './restaurant';

export default class Item {
    constructor(name, description, size, category, imgs, options, price, quantity, discount, isPickupOnly, isAvailable, restaurantId) {
        this.name = name;
        this.description = description;
        this.size = size;
        this.category = category;
        this.imgs = imgs;
        this.options = options;
        this.isPickupOnly = isPickupOnly;
        this.isAvailable = isAvailable;
        this.price = price;
        this.quantity = quantity;
        this.discount = discount
        this.isPickupOnly = isPickupOnly;
        this.isAvailable = isAvailable;
        this.restaurantId = restaurantId;
    }
}

export const getItem = async (id) => {
    return (await getObjectById("item", id)
        .catch(err => console.log(err))).data;
}

export const getItems = async () => {
    return (await getObjectById("item", "")
        .catch(err => console.log(err))).data;
}

export const updateItem = async (id, newData) => {
    return (await updateObject("item", id, newData)
        .catch(err => console.log(err))).data;
}

export const createItem = async (item) => {
    const restaurant = requestRestaurant(item.restaurantId);
    return (await createNewObject("item", item)
        .then(async item => {
            let rest = await restaurant;
            let prevItemIds = rest.itemIds != null ? rest.itemIds : []
            updateRestaurant(rest.id, { itemIds: [...prevItemIds, item.id] })
            return item;
        }).catch(err => console.log(err))).data;
}