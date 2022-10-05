const Storage = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems.length > 0 ? cartItems : []));
}

export const sumItems = cartItems => {
    Storage(cartItems);
    let itemCount = cartItems.reduce((total, product) => total + product.quantity, 0);
    let total = cartItems.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    return { itemCount, total }
}

export const CartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            if (state.cartItems.length == 0 || state.cartItems.some(i => i.restaurantId == action.payload.restaurantId)) { //item to be added is the same restaurant as other items(if there are any others)
                if (!state.cartItems.find(item => item.id === action.payload.id)) {
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
                ...sumItems(state.cartItems.filter(item => item.id !== action.payload.id)),
                cartItems: [...state.cartItems.filter(item => item.id !== action.payload.id)]
            }
        case "SET_QUANTITY":
            state.cartItems[state.cartItems.findIndex(item => item.id === action.payload.id)].quantity = action.payload.quantity
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
                checkout: true,
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