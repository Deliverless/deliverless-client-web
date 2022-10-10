import React, { useContext, createContext, useReducer } from 'react';
import { CartReducer, sumItems } from './cartReducer';
import { createOrder } from '../models/order';
import { UserContext } from './userContext';
import Cookies from 'universal-cookie'

export const CartContext = createContext()

const storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const initialState = { cartItems: storage, ...sumItems(storage), checkout: false };

const CartContextProvider = ({ children }) => {
    const { user, setUser } = useContext(UserContext);
    const [state, dispatch] = useReducer(CartReducer, initialState)

    const setQuantity = payload => {
        dispatch({ type: 'SET_QUANTITY', payload })
    }

    const increase = payload => {
        dispatch({ type: 'INCREASE', payload })
    }

    const decrease = payload => {
        dispatch({ type: 'DECREASE', payload })
    }

    const addProduct = payload => {
        dispatch({ type: 'ADD_ITEM', payload })
    }

    const removeProduct = payload => {
        dispatch({ type: 'REMOVE_ITEM', payload })
    }

    const clearCart = () => {
        dispatch({ type: 'CLEAR' })
    }

    const handleCheckout = async () => {
        let cookies = new Cookies();
        const cookieAddress = cookies.get("Address")
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        today.toDateString();

        console.log('CHECKOUT', state);

        const order = {
            userID: user.asset_id,
            restaurantID: state.cartItems[0].restaurantId,
            restaurantName: "WIP",
            deliveryAddress: user.address != null ? user.address : cookieAddress,
            discount: state.discount,
            tax: state.total * 0.13,
            driverFee: 5.00,
            total: state.total * 1.13,
            status: "Pending",
            timePlaced: today,
            foods: state.cartItems
        }

        createOrder(order, user);
        dispatch({ type: 'CHECKOUT' })
    }

    const contextValues = {
        removeProduct,
        addProduct,
        setQuantity,
        increase,
        decrease,
        clearCart,
        handleCheckout,
        ...state
    }

    return (
        <CartContext.Provider value={contextValues} >
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;