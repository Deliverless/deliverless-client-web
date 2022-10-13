import { combineReducers } from 'redux';

import { restaurantsSlice } from '../pages/Home/_redux/restaurantsRedux';

export const rootReducer = combineReducers({
  restaurants: restaurantsSlice.reducer,
});
