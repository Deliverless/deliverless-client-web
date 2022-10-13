import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import { requestRestaurants } from '../../models/restaurant';
import { setRestaurants } from '../redux/restaurantRedux';

function* fetchRestaurants() {
  const restaurants = yield call(requestRestaurants);
  yield put(setRestaurants(restaurants));
}

export function* restaurantsSaga() {
  yield takeLatest('GET_RESTAURANTS', fetchRestaurants);
}