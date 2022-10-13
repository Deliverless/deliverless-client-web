import { createSlice } from '@reduxjs/toolkit';

// Add "SET_RESTAURANTS" action to the slice for saga to use
export const restaurantsSlice = createSlice({
  name: "restaurant",
  initialState: {
    list: []
  },
  reducers: {
    setRestaurants: (state, action) => {
      state.list = action.payload;
    }
  }

    
});

export const { setRestaurants } = restaurantsSlice.actions;