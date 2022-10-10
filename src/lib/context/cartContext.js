import React, { useContext, createContext, useReducer } from 'react';
import { CartReducer, sumItems } from './cartReducer';
import Order, { createOrder } from '../../models/order';
import { UserContext } from './userContext';
import Cookies from 'universal-cookie'
import { OrderContext } from './orderContext';

export const CartContext = createContext()

const storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const initialState = { cartItems: storage, ...sumItems(storage), checkout: false };

const CartContextProvider = ({ children }) => {
    const { user, setUser } = useContext(UserContext);
    const [state, dispatch] = useReducer(CartReducer, initialState)
    const { order, clearOrder } = useContext(OrderContext)

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
        createOrder(order, user.customer).then((newOrder) => {
            let prevOrderIds = user.customer.orderIds != null ? user.customer.orderIds : []
            let updatedUser = { ...user };
            updatedUser.customer.orderIds = [...prevOrderIds, newOrder.id]
            setUser(updatedUser)
        })
        clearOrder()
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