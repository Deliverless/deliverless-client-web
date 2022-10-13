import { combineReducers } from 'redux';

import { restaurantsSlice } from '../pages/Restaurants/_redux/restaurantsRedux';

export const rootReducer = combineReducers({
  restaurants: restaurantsSlice.reducer,
});
