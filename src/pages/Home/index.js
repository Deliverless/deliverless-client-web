import './styles.scss';

import React, {
  Suspense,
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  Route,
  Routes,
} from 'react-router-dom';

import RestaurantHome from '../../components/RestaurantHome';
import { LayoutSplashScreen } from '../../lib/layout/SplashScreen';
import Restaurant from '../../models/restaurant';
import RestaurantList from './components/RestaurantList';

export default function RestaurantsHome({ history }) {
	const [restaurant, setRestaurant] = useState(null);
	
	const restaurantList = useSelector(state => state.restaurant.list);
	// const selectedRestaurantId = useSelector(state => state.restaurant.selectedRestaurantId);
	const selectedRestaurantId = "id:global:restaurant:25aaf9af-2c0b-4b17-9939-b222eaee89e5";
	const dispatch = useDispatch();

	const initializeRestaurant = () => {
		if (selectedRestaurantId) {
			console.log('initializeRestaurant', selectedRestaurantId, restaurantList);
			const res_restaurant = restaurantList.find(restaurant => restaurant.id === selectedRestaurantId);
			if (res_restaurant) {
				const new_restaurant = new Restaurant();
				new_restaurant.initJson(res_restaurant);
				setRestaurant(new_restaurant);
			} else {
				dispatch({ type: 'GET_RESTAURANT', payload: { id: selectedRestaurantId } });
			}
		} else {
			console.log('No restaurant selected');
		}
	};

	const fetchRestaurantItems = async () => {
    dispatch({ type: 'GET_RESTAURANT_ITEMS', payload: { id: selectedRestaurantId } });
  };

	useEffect(() => {
		console.log('RestaurantAccount useEffect', restaurant, restaurantList);
		if (restaurant === null || restaurant.items.length === 0) {
			initializeRestaurant();
		}
	}, [restaurantList]);

  useEffect(() => {
    console.log("restaurantDetail useEffect", restaurant);
    restaurant && restaurant.id && restaurant.items.length === 0 && fetchRestaurantItems();
  }, [restaurant]);

	return (
		<Suspense fallback={<LayoutSplashScreen />}>
				<Routes>
					<Route path={"/"} element={<RestaurantList history={history} />} />
					<Route path={"/:restaurantName"} element={<RestaurantHome restaurant={restaurant} history={history} />} />
				</Routes>
		</Suspense>
	);
}
