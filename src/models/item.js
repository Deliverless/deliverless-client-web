
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