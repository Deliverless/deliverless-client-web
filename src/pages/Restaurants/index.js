import React, { useState, Suspense } from 'react';
import { Routes } from "react-router-dom";
import { RestaurantsContextProvider } from "./components/RestaurantsDataContext";
import { LayoutSplashScreen } from "../../lib/layout/SplashScreen";
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import { Route } from 'react-router-dom';

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
						<Route path={"/"} element={<RestaurantList />} />
						<Route path={"/:restaurantName"} element={<RestaurantDetail />} />
					</Routes>
			</Suspense>
		</RestaurantsContextProvider>
	);
}
