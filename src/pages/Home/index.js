import './styles.scss';

import React, { Suspense } from 'react';

import {
  Route,
  Routes,
} from 'react-router-dom';

import RestaurantHome from '../../components/RestaurantHome';
import { LayoutSplashScreen } from '../../lib/layout/SplashScreen';
import RestaurantList from './components/RestaurantList';

export default function RestaurantsHome({ history }) {

	return (
		<Suspense fallback={<LayoutSplashScreen />}>
				<Routes>
					<Route path={"/"} element={<RestaurantList history={history} />} />
					<Route path={"/:restaurantName"} element={<RestaurantHome history={history} />} />
				</Routes>
		</Suspense>
	);
}
