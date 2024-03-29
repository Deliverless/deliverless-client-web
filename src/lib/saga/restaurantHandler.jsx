import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import {
  createRestaurantItem,
  deleteRestaurantItem,
  getLocalRestaurants,
  requestRestaurantById,
  requestRestaurantByName,
  requestRestaurantItems,
  requestRestaurants,
  setLocalRestaurants,
  updateRestaurant,
  updateRestaurantItem,
} from '../../models/restaurant';
import {
  addRestaurant,
  setIsLoading,
  setIsSyncing,
  setRestaurant,
  setRestaurantItems,
  setRestaurants,
  setSelectedRestaurantId,
} from '../redux/restaurantRedux';

function* fetchRestaurantsSaga() {
  const local_restaurants = yield call(getLocalRestaurants);
  yield put(setRestaurants(local_restaurants ? local_restaurants : []));
  yield put(setIsSyncing(true));
  const eth_restaurants = yield call(requestRestaurants);
  yield call(setLocalRestaurants, eth_restaurants);
  yield put(setRestaurants(eth_restaurants));
  yield put(setIsSyncing(false));
}

function* fetchRestaurantByIdSaga(action) {
  const restaurant = yield call(requestRestaurantById, action.payload.id);
  yield put(addRestaurant(restaurant));
}

function* fetchRestaurantByNameSaga(action) {
  const restaurant = yield call(requestRestaurantByName, action.payload.name);
  yield put(setSelectedRestaurantId(restaurant.id));
  yield put(addRestaurant(restaurant));
}

function* fetchRestaurantItemsSaga(action) {
  const items = yield call(requestRestaurantItems, action.payload.restaurantId);
  yield put(setRestaurantItems({ restaurantId: action.payload.restaurantId, items: items.data }));
}

// TODO: add error handling
// function* fetchRestaurantItemsSaga(action) {
//   const local_items = yield call(getLocalRestaurantItems, action.payload.restaurantId);
//   yield put(setRestaurantItems({ restaurantId: action.payload.restaurantId, items: local_items ? local_items : [] }));
//   yield put(setIsSyncing(true));
//   const eth_items = yield call(requestRestaurantItems, action.payload.restaurantId);
//   yield put(setRestaurantItems({ restaurantId: action.payload.restaurantId, items: eth_items.data }));
//   yield call(setLocalRestaurantItems, action.payload.restaurantId, eth_items.data);
//   yield put(setIsSyncing(false));
// }

function* setSelectedRestaurantIdSaga(action) {
  yield put(setSelectedRestaurantId(action.payload.id));
}

function* setRestaurantSaga(action) {
  yield put(setIsLoading(true));
  yield call(setRestaurant, action.payload.restaurant);
  yield put(setIsLoading(false));
}

function* updateRestaurantSaga(action) {
  yield put(setIsLoading(true));
  const restaurant = yield call(updateRestaurant, action.payload.id, action.payload.data);
  yield put(setRestaurant(restaurant));
  yield put(setIsLoading(false));
}

function* setRestaurantItemSaga(action) {
  yield put(setIsLoading(true));
  yield call(updateRestaurantItem, action.payload.id, action.payload.data);
  yield call(fetchRestaurantItemsSaga, { payload: { restaurantId: action.payload.restaurant.id } });
  yield put(setIsLoading(false));
}

function* addRestaurantItemSaga(action) {
  yield put(setIsLoading(true));
  yield call(createRestaurantItem, action.payload.data);
  yield call(fetchRestaurantItemsSaga, { payload: { restaurantId: action.payload.restaurant.id } });
  yield put(setIsLoading(false));
}

function* deleteRestaurantItemSaga(action) {
  yield put(setIsLoading(true));
  yield call(deleteRestaurantItem, action.payload.id);
  yield call(fetchRestaurantItemsSaga, { payload: { restaurantId: action.payload.restaurant.id } });
  yield put(setIsLoading(false));
}

export function* restaurantsSaga() {
  yield takeLatest('GET_RESTAURANTS', fetchRestaurantsSaga);
  yield takeLatest('GET_RESTAURANT_BY_ID', fetchRestaurantByIdSaga);
  yield takeLatest('GET_RESTAURANT_BY_NAME', fetchRestaurantByNameSaga);
  yield takeLatest('GET_RESTAURANT_ITEMS', fetchRestaurantItemsSaga);
  yield takeLatest('SET_SELECTED_RESTAURANT_ID', setSelectedRestaurantIdSaga);
  yield takeLatest('SET_RESTAURANT', setRestaurantSaga);
  yield takeLatest('UPDATE_RESTAURANT', updateRestaurantSaga);
  yield takeLatest('SET_RESTAURANT_ITEM', setRestaurantItemSaga);
  yield takeLatest('ADD_RESTAURANT_ITEM', addRestaurantItemSaga);
  yield takeLatest('DELETE_RESTAURANT_ITEM', deleteRestaurantItemSaga);
}