import { combineReducers } from 'redux';

import { restaurantsSlice } from '../lib/redux/restaurantRedux';

export const rootReducer = combineReducers({
  restaurant: restaurantsSlice.reducer,
});
