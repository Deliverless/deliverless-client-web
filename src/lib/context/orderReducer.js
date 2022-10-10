
const Storage = (order) => {
    localStorage.setItem('order', JSON.stringify(Object.keys(order).length > 0 ? order : {}));
}

export const setOrder = order => {
    Storage(order);
    return {}
}

export const OrderReducer = (state, action) => {
    switch (action.type) {
        case "SET_ORDER":
            state.order = { ...action.payload }
            return {
                ...state,
                ...setOrder(state.order),
                order: { ...state.order }
            }
        case "CLEAR":
            return {
                order: {},
                ...setOrder({})
            }
        default:
            return state
    }
}