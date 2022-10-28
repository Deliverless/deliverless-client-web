import { createSlice } from '@reduxjs/toolkit';

// Add "SET_RESTAURANTS" action to the slice for saga to use
export const restaurantsSlice = createSlice({
  name: "restaurant",
  initialState: {
    list: [],
    selectedRestaurantId: null,
    isSyncing: false,
    isLoading: false,
  },
  reducers: {
    addRestaurant: (state, action) => {
      if (!state.list.find((restaurant) => restaurant.id === action.payload.id)) {
        state.list.push(action.payload);
      }
    },
    setRestaurants: (state, action) => {
      action.payload.forEach((restaurant) => {
        if (!state.list.find((r) => r.id === restaurant.id)) {
          state.list.push(restaurant);
        }
      });
    },
    setSelectedRestaurantId: (state, action) => {
      state.selectedRestaurantId = action.payload;
    },
    setRestaurantItems: (state, action) => {
      const restaurant = state.list.find(
        (restaurant) => restaurant.id === action.payload.id
      );
      restaurant.items = action.payload.items;
    },
    setIsSyncing: (state, action) => {
      state.isSyncing = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
});

export const { addRestaurant, setRestaurants, setSelectedRestaurantId, setRestaurantItems, setIsSyncing, setIsLoading } = restaurantsSlice.actions;