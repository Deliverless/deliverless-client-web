import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import ItemList from '../../../components/ItemList/index';
import RestaurantHome from '../../../components/RestaurantHome';
import Restaurant from '../../../models/restaurant';

export default function RestaurantAccount() {
	const [tabValue, setTabValue] = useState('home');
	const [restaurant, setRestaurant] = useState(null);
	
	const restaurantList = useSelector(state => state.restaurant.list);
	const restaurantIsLoading = useSelector(state => state.restaurant.isLoading);
	const dispatch = useDispatch();
	
	const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

	const initializeRestaurant = () => {
		if (selectedRestaurantId) {
			// console.log('initializeRestaurant', selectedRestaurantId, restaurantList);
			const res_restaurant = restaurantList.find(restaurant => restaurant.id === selectedRestaurantId);
			if (res_restaurant) {
				const new_restaurant = new Restaurant();
				new_restaurant.initJson(res_restaurant);
				setRestaurant(new_restaurant);
			} else {
				dispatch({ type: 'GET_RESTAURANT_BY_ID', payload: { id: selectedRestaurantId } });
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
		<Box sx={{ width: '100%'}} className="main-content">
			<Tabs
				variant="scrollable"
				value={tabValue} 
				selectionFollowsFocus 
				onChange={handleChange}
				textColor="primary"
				scrollButtons={true}
				allowScrollButtonsMobile
				indicatorColor="primary"
				aria-label="primary customer account tabs" >

					{/* account info/updates */}
				<Tab sx={{'&.Mui-selected': {outline: 'none'}, width: '175px'}}
							value="home"label="Home" />
					{/* reviews from customers/drivers */}
				<Tab sx={{'&.Mui-selected': {outline: 'none'}, width: '175px'}} 
							value="feedback" label="Feedback" />
					{/* payment options/updates */}
				<Tab sx={{'&.Mui-selected': {outline: 'none'}, width: '175px'}}
							value="payments" label="Payments" />
					{/* restaurants orders */}
				<Tab sx={{'&.Mui-selected': {outline: 'none'}, width: '175px'}}
							value="orders" label="Orders" />
					{/* restau menu/updates */}
				<Tab sx={{'&.Mui-selected': {outline: 'none'}, width: '175px'}}
							value="menu" label="Menu" />
					{/* restau weekly hours & annual holiday hours */}
				<Tab sx={{'&.Mui-selected': {outline: 'none'}, width: '175px'}}
							value="hours" label="Holiday Hours" />
			</Tabs>

			<Box>
				{tabValue === 'home' && <RestaurantHome restaurant={restaurant} restaurantList={restaurantList} />}
				{tabValue === 'menu' && (
					<ItemList restaurant={restaurant} edit={true} isLoading={restaurantIsLoading} />
				)}
				{/* {tabValue === 'feedback' && <Feedback />}
				{tabValue === 'payments' && <Payment />}
				{tabValue === 'orders' && <MyOrders />}
				{tabValue === 'menu' && <Menu />}
				{tabValue === 'hours' && <Hours />} */}

			</Box>
		</Box>
		
  )
}
