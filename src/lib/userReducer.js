
const Storage = (user) => {
    localStorage.setItem('user', JSON.stringify(Object.keys(user).length > 0 ? user : {}));
}

export const setUser = user => {
    Storage(user);
    return { logout: Object.keys(user).length === 0 }
}

export const UserReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            console.log('setting user')
            state.user = { ...action.payload }
            return {
                ...state,
                ...setUser(state.user),
                user: { ...state.user }
            }
        case "lOGOUT_USER":
            return {
                ...state,
                ...setUser({}),
                user: {}
            }
        default:
            return state

    }
}