import {
  createNewObject,
  findObjectsByMetadata,
  getObjectById,
  updateObject,
} from '../lib/web3-helper';

export const PriceRange = {
    0: 'Cheap',
    1: 'Moderate',
    2: 'Expensive',
    3: 'Very Expensive'
}

export default class Restaurant {
    constructor(id = "", name = "", address = "", hours = "", rating = "", reviewIds = [], image = "", itemIds = [], items = [], userId = "") {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.address = address;
        this.hours = hours;
        this.rating = rating;
        this.reviewIds = reviewIds;
        this.itemIds = itemIds;
        this.items = items;
        this.menu = {};
        this.reviews = [];
        this.cuisine = "";
        this.images = [];
    }

    initJson(json) {
        this.id = json.id;
        this.name = json.name;
        this.address = json.address;
        this.hours = json.hours;
        this.rating = json.rating;
        this.reviewIds = json.reviewIds;
        this.reviews = json.reviews || [];
        this.cuisine = json.cuisine || "";
        this.images = json.images || [];
        this.itemIds = json.itemIds || [];
        this.items = json.items || [];
        this.menu = json.menu || {};
    }

    async initId(id) {
        const res = await requestRestaurantById(id);
        this.initJson(res);
    }

    getPriceIndex() {
        return getRestaurantPriceIndex(this);
    }

    async fetchItems(limit = 10) {
        const res_items = await findObjectsByMetadata("Item", { restaurantId: this.id }, limit);
        return res_items.data;
    }

    getRestaurantHours(military = false) {
        if (this.hours) {
            const currentHour = new Date().getHours();
            const currentMinute = new Date().getMinutes();
            let currentUTC = new Date().getUTCHours();
            if (currentUTC < currentHour) {
                currentUTC += 24;
            }
            const hourDiff = currentUTC - currentHour;
            const storeHoursObj = Object.keys(this.hours).map((day, index) => {
                const dayHours = this.hours[day];
                const openingTime = dayHours.split("-")[0];
                const closingTime = dayHours.split("-")[1];
                const openingHour = parseInt(openingTime.split(":")[0]);
                const closingHour = parseInt(closingTime.split(":")[0]);
                const openingMinute = parseInt(openingTime.split(":")[1]);
                const closingMinute = parseInt(closingTime.split(":")[1]);
                const duration = closingHour < openingHour ? closingHour + 24 - openingHour : closingHour - openingHour;
                const localOpeningHour = openingHour < hourDiff ? openingHour + 24 - hourDiff : openingHour - hourDiff;
                let localClosingHour = closingHour < hourDiff ? closingHour + 24 - hourDiff : closingHour - hourDiff;
                localClosingHour = localClosingHour < localOpeningHour ? localClosingHour + 24 : localClosingHour; //if closing hour is before opening hour, add 24 to closing hour
                return {
                    day: day,
                    openingTime: military ? (
                        `${localOpeningHour < 10 ? "0" + localOpeningHour : localOpeningHour}:${openingTime.split(":")[1]}`
                    ) : (
                        `${localOpeningHour % 12 === 0 ? 12 : localOpeningHour % 12}:${openingTime.split(":")[1]} ${localOpeningHour < 12 ? "AM" : "PM"}`
                    ),
                    closingTime: military ? (
                        `${localClosingHour < 10 ? "0" + localClosingHour : localClosingHour}:${closingTime.split(":")[1]}`
                    ) : (
                        `${localClosingHour % 12 === 0 ? 12 : localClosingHour % 12}:${closingTime.split(":")[1]} ${localClosingHour < 12 ? "AM" : "PM"}`
                    ),
                    duration: duration,
                    isOpen: (currentHour != localOpeningHour ? currentHour >= localOpeningHour : currentHour >= localOpeningHour && currentMinute >= openingMinute) 
                    && (currentHour != localClosingHour ? currentHour <= localClosingHour : currentHour <= localClosingHour && currentMinute <= closingMinute)
                }
            });
            return storeHoursObj;
        }
        return [];
    }

}

export const requestRestaurantItems = async (restaurantId) => {
    const items = findObjectsByMetadata('Item', { restaurantId: restaurantId }, 0);
    return items;
}

export const requestRestaurantByName = async (name) => {
    return (await findObjectsByMetadata("restaurant", { name: name })
        .catch(err => console.log(err))).data;
}

// TODO: requestRestaurant and requestRestaurantById are the same function
export const requestRestaurantById = async (id) => {
    console.log("requesting restaurant by id", id);
    return (await getObjectById("restaurant", id)
        .catch(err => console.log(err))).data;
}

export const requestRestaurant = async (id) => {
    return (await getObjectById("restaurants", id)
        .catch(err => console.log(err))).data;
}

export const findRestaurantByUserId = async (userId) => {
    return (await findObjectsByMetadata("restaurant", { userId })
        .catch(err => console.log(err))).data;
}

export const requestRestaurants = async () => {
    return (await getObjectById("restaurant", "")
        .catch(err => console.log(err))).data;
}

export const updateRestaurant = async (id, newData) => {
    return (await updateObject("restaurant", id, newData)
        .catch(err => console.log(err))).data;
}

export const updateRestaurantItem = async (id, newData) => {
    return (await updateObject("Item", id, newData)
        .catch(err => console.log(err))).data;
}

export const signUpRestaurant = async (restaurant) => {
    return (await createNewObject("restaurant", restaurant)
        .catch(err => console.log(err))).data;
}

export const getRestaurantPriceIndex = (restaurant) => {
    if (restaurant.items.length > 0) {
        let total = 0;
        restaurant.items.forEach(item => {
            total += item.price;
        })
        const avg = total / restaurant.items.length;
        switch (true) {
            case avg <= 10:
                return PriceRange[0];
            case avg <= 20:
                return PriceRange[1];
            case avg <= 35:
                return PriceRange[2];
            case avg > 35:
                return PriceRange[3];
            default:
                return PriceRange[1];
        }
    }
    return null;
}