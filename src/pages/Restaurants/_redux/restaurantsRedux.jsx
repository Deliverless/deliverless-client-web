import { createSlice } from '@reduxjs/toolkit';

export const restaurantsSlice = createSlice({
  name: "restaurants",
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