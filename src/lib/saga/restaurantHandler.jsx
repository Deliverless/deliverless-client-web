import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import {
  createRestaurantItem,
  deleteRestaurantItem,
  requestRestaurantById,
  requestRestaurantByName,
  requestRestaurantItems,
  requestRestaurants,
  updateRestaurantItem,
} from '../../models/restaurant';
import {
  addRestaurant,
  setIsLoading,
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

function* setRestaurantItem(action) {
  yield put(setIsLoading(true));
  yield call(updateRestaurantItem, action.payload.id, action.payload.data);
  yield call(fetchRestaurantItems, { payload: { id: action.payload.restaurantId } });
  yield put(setIsLoading(false));
}

function* addRestaurantItemSaga(action) {
  yield put(setIsLoading(true));
  yield call(createRestaurantItem, action.payload.data);
  yield call(fetchRestaurantItems, { payload: { id: action.payload.restaurantId } });
  yield put(setIsLoading(false));
}

function* deleteRestaurantItemSaga(action) {
  yield put(setIsLoading(true));
  yield call(deleteRestaurantItem, action.payload.id);
  yield call(fetchRestaurantItems, { payload: { id: action.payload.restaurantId } });
  yield put(setIsLoading(false));
}

export function* restaurantsSaga() {
  yield takeLatest('GET_RESTAURANTS', fetchRestaurants);
  yield takeLatest('GET_RESTAURANT_BY_ID', fetchRestaurantById);
  yield takeLatest('GET_RESTAURANT_BY_NAME', fetchRestaurantByName);
  yield takeLatest('GET_RESTAURANT_ITEMS', fetchRestaurantItems);
  yield takeLatest('SET_RESTAURANT', setRestaurant);
  yield takeLatest('SET_RESTAURANT_ITEM', setRestaurantItem);
  yield takeLatest('ADD_RESTAURANT_ITEM', addRestaurantItemSaga);
  yield takeLatest('DELETE_RESTAURANT_ITEM', deleteRestaurantItemSaga);
}