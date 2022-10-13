import './styles.scss';

import React, {
  Suspense,
  useState,
} from 'react';

import {
  Route,
  Routes,
} from 'react-router-dom';

import RestaurantHome from '../../components/RestaurantHome';
import { LayoutSplashScreen } from '../../lib/layout/SplashScreen';
import RestaurantList from './components/RestaurantList';
import {
  RestaurantsContextProvider,
} from './components/RestaurantsDataContext';

export default function RestaurantsHome({ history }) {
	const [refetch, setRefetch] = useState(false);
	const restaurantsUIEvents = {
		refetch: refetch,
		setRefetch: setRefetch
	}

	return (
		<RestaurantsContextProvider restaurantsUIEvents={restaurantsUIEvents}>
			<Suspense fallback={<LayoutSplashScreen />}>
					<Routes>
						<Route path={"/"} element={<RestaurantList history={history} />} />
						<Route path={"/:restaurantName"} element={<RestaurantHome history={history} />} />
					</Routes>
			</Suspense>
		</RestaurantsContextProvider>
	);
}
