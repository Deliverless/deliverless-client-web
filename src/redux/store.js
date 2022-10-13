import createSagaMiddleware from 'redux-saga';

import { configureStore } from '@reduxjs/toolkit';

import { restaurantsSaga } from '../lib/saga/restaurantHandler';
import { rootReducer } from './rootReducer';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(restaurantsSaga);