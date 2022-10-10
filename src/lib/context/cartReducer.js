const Storage = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems.length > 0 ? cartItems : []));
}

export const sumItems = cartItems => {
    Storage(cartItems);
    let itemCount = cartItems.reduce((total, product) => total + product.quantity, 0);
    // get total price for each product's price + selected options * quantity
    let total = cartItems.reduce((total, product) => total + (product.price + product.selectedOptions.reduce((total, option) => total + option.price, 0)) * product.quantity, 0).toFixed(2);
    return { itemCount, total }
}

const compareItems = (a, b) => {
    console.log('compareItems', a, b);
    if (a.id === b.id && a.selectedOptions.length === b.selectedOptions.length && a.selectedOptions.every((option, index) => option.name === b.selectedOptions[index].name && option.price === b.selectedOptions[index].price)) {
        return true;
    }
    return false;
}

export const CartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            console.log("ADD_ITEM", action.payload)
            if (state.cartItems.length == 0 || state.cartItems.some(i => i.restaurantId == action.payload.restaurantId)) { //item to be added is the same restaurant as other items(if there are any others)
                if (!state.cartItems.find(i => compareItems(i, action.payload))) { //item to be added is not already in cart
                    state.cartItems.push({
                        ...action.payload,
                        quantity: action.payload.quantity
                    })
                } else {
                    state.cartItems[state.cartItems.findIndex(item => item.id === action.payload.id)].quantity += action.payload.quantity
                    return {
                        ...state,
                        ...sumItems(state.cartItems),
                        cartItems: [...state.cartItems]
                    }
                }
            }

            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems]
            }
        case "REMOVE_ITEM":
            return {
                ...state,
                ...sumItems(state.cartItems.filter(item => compareItems(item, action.payload) ? false : true)),
                cartItems: [...state.cartItems.filter(item => compareItems(item, action.payload) ? false : true)]
            }
        case "SET_QUANTITY":
            state.cartItems.find(item => compareItems(item, action.payload)).quantity = action.payload.quantity
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems]
            }
        case "INCREASE":
            state.cartItems[state.cartItems.findIndex(item => item.id === action.payload.id)].quantity++
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems]
            }
        case "DECREASE":
            state.cartItems[state.cartItems.findIndex(item => item.id === action.payload.id)].quantity--
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems]
            }
        case "CHECKOUT":
            return {
                cartItems: [],
                checkout: false,
                ...sumItems([]),
            }
        case "CLEAR":
            return {
                cartItems: [],
                ...sumItems([]),
            }
        default:
            return state

    }
}