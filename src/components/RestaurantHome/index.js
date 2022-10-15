import './styles.scss';

import React from 'react';

import {
  Route,
  Routes,
} from 'react-router-dom';

import RestaurantDetail from './components/RestaurantDetail';

export default function RestaurantsHome({ history, restaurant }) {
  
  return (
    <Routes>
      <Route path={"/"} element={<RestaurantDetail history={history} restaurant={restaurant} />} />
    </Routes>
  );
}