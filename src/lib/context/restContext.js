import React, { useContext, createContext, useReducer } from 'react';
import { RestReducer, setRests } from './restReducer';

export const RestContext = createContext()
const storage = localStorage.getItem('rests') ? JSON.parse(localStorage.getItem('rests')) : [];
const initialState = { rests: storage, ...setRests(storage) };

const RestContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(RestReducer, initialState)

    const setRests = payload => {
        dispatch({ type: 'SET_RESTS', payload })
    }

    const clearRests = () => {
        dispatch({ type: 'CLEAR' })
    }

    const contextValues = {
        setRests,
        clearRests,
        ...state
    }

    return (
        <RestContext.Provider value={contextValues} >
            {children}
        </RestContext.Provider>
    );
}

export default RestContextProvider;