import { createSlice } from '@reduxjs/toolkit';

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: {
    list: []
  },
  reducers: {
    setRestaurants: (state, action) => {
      state.list = action.payload;
    },
    getRestaurantById: (state, action) => {
      return state.list.find(r => r.id === action.payload);
    },
    getRestaurantByName: (state, action) => {
      return state.list.find(r => r.name === action.payload);
    },
  }
});

export const { setRestaurants } = restaurantsSlice.actions;