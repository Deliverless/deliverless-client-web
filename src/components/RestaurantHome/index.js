import './styles.scss';

import React from 'react';

import {
  Route,
  Routes,
} from 'react-router-dom';

import RestaurantDetail from './components/RestaurantDetail';

export default function RestaurantsHome({ history }) {
  return (
    <Routes>
      <Route path={"/"} element={<RestaurantDetail history={history} />} />
    </Routes>
  );
}