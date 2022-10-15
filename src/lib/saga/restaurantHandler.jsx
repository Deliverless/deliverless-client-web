import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import {
  requestRestaurantById,
  requestRestaurantByName,
  requestRestaurantItems,
  requestRestaurants,
} from '../../models/restaurant';
import {
  addRestaurant,
  setRestaurantItems,
  setRestaurants,
  setSelectedRestaurantId,
} from '../redux/restaurantRedux';

function* fetchRestaurants() {
  const restaurants = yield call(requestRestaurants);
  yield put(setRestaurants(restaurants));
}

function* fetchRestaurantById(action) {
  const restaurant = yield call(requestRestaurantById, action.payload.id);
  yield put(addRestaurant(restaurant));
}

function* fetchRestaurantByName(action) {
  const restaurant = yield call(requestRestaurantByName, action.payload.name);
  console.log('fetchRestaurantByName', restaurant);
  yield put(setSelectedRestaurantId(restaurant.id));
  yield put(addRestaurant(restaurant));
}

function* fetchRestaurantItems(action) {
  const items = yield call(requestRestaurantItems, action.payload.id);
  yield put(setRestaurantItems({ id: action.payload.id, items: items.data }));
}

function* setRestaurant(action) {
  yield put(setSelectedRestaurantId(action.payload.id));
}

export function* restaurantsSaga() {
  yield takeLatest('GET_RESTAURANTS', fetchRestaurants);
  yield takeLatest('GET_RESTAURANT_BY_ID', fetchRestaurantById);
  yield takeLatest('GET_RESTAURANT_BY_NAME', fetchRestaurantByName);
  yield takeLatest('GET_RESTAURANT_ITEMS', fetchRestaurantItems);
  yield takeLatest('SET_RESTAURANT', setRestaurant);
}