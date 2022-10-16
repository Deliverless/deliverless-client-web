import './styles.scss';

import React from 'react';

import { useDispatch } from 'react-redux';
import {
  Route,
  Routes,
  useParams,
} from 'react-router-dom';

import RestaurantDetail from './components/RestaurantDetail';

export default function RestaurantsHome({ history, restaurant, restaurantList }) {

  const dispatch = useDispatch();
  const { restaurantName } = useParams();

  if (restaurant === null) {
    const res_restaurant = restaurantList.find(restaurant => restaurant.name === restaurantName);
    if (res_restaurant) {
      dispatch({ type: 'SET_SELECTED_RESTAURANT', payload: { id: res_restaurant.id } });
    } else {
      dispatch({ type: 'GET_RESTAURANT_BY_NAME', payload: { name: restaurantName } });
    }
  }

  return (
    <Routes>
      <Route path={"/"} element={<RestaurantDetail history={history} restaurant={restaurant} />} />
    </Routes>
  );
}