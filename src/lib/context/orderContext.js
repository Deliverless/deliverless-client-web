import React, {
  createContext,
  useReducer,
} from 'react';

import {
  OrderReducer,
  setOrder,
} from '../orderReducer';

export const OrderContext = createContext()
const storage = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : {};
const initialState = { order: storage, ...setOrder(storage) };

const OrderContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(OrderReducer, initialState)

    const setOrder = payload => {
        dispatch({ type: 'SET_ORDER', payload })
    }

    const clearOrder = () => {
        dispatch({ type: 'CLEAR' })
    }

    const contextValues = {
        setOrder,
        clearOrder,
        ...state
    }

    return (
        <OrderContext.Provider value={contextValues} >
            {children}
        </OrderContext.Provider>
    );
}

export default OrderContextProvider;