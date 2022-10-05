
const Storage = (rests) => {
    localStorage.setItem('rests', JSON.stringify(Object.keys(rests).length > 0 ? rests : []));
}

export const setRests = rests => {
    Storage(rests);
    return {}
}

export const RestReducer = (state, action) => {
    switch (action.type) {
        case "SET_RESTS":
            state.rests = [...action.payload]
            return {
                ...state,
                ...setRests(state.rests),
                rests: [...state.rests]
            }
        case "CLEAR":
            return {
                rests: {},
                ...setRests([])
            }
        default:
            return state
    }
}