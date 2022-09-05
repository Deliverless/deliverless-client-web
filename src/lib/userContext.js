import React, { useContext, createContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom'
import api from './api'
import { UserReducer, setUser } from './userReducer';

export const UserContext = createContext()
const storage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
const initialState = { user: storage, ...setUser(storage) };

export const useAuthorized = (privilege) => {
    const user = useContext(UserContext)?.user
    return user?.role === privilege || user?.isAdmin;
}

export const useLogin = async ({ username, password }) => {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)
    return await api.post("", { username: atob(username), password: atob(password) })
        .then(({ user }) => {
            setUser(user)
            navigate("/")
        }).catch((err) => {
            console.log("error: ", err)
        })
}

const UserContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(UserReducer, initialState)

    const setUser = payload => {
        dispatch({ type: 'SET_USER', payload })
    }

    const logoutUser = () => {
        dispatch({ type: 'lOGOUT_USER' })
    }

    const contextValues = {
        setUser,
        logoutUser,
        ...state
    }

    return (
        <UserContext.Provider value={contextValues} >
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;