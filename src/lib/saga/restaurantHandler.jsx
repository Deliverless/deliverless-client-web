import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import {
  requestRestaurantById,
  requestRestaurantItems,
  requestRestaurants,
} from '../../models/restaurant';
import {
  addRestaurant,
  setRestaurantItems,
  setRestaurants,
} from '../redux/restaurantRedux';

function* fetchRestaurants() {
  const restaurants = yield call(requestRestaurants);
  yield put(setRestaurants(restaurants));
}

function* fetchRestaurant(action) {
  const restaurant = yield call(requestRestaurantById, action.payload.id);
  yield put(addRestaurant(restaurant));
}

function* fetchRestaurantItems(action) {
  const items = yield call(requestRestaurantItems, action.payload.id);
  yield put(setRestaurantItems({ id: action.payload.id, items: items.data }));
}

export function* restaurantsSaga() {
  yield takeLatest('GET_RESTAURANTS', fetchRestaurants);
  yield takeLatest('GET_RESTAURANT', fetchRestaurant);
  yield takeLatest('GET_RESTAURANT_ITEMS', fetchRestaurantItems);
}