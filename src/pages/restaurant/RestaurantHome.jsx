import React, {useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import FoodCards from '../../components/FoodCards';
import { getRestaurant } from '../../models/restaurant'
const RestaurantHome = () => {
	const [foods, setFoods] = useState([])
	const [restaurant, setRestaurant] = useState()
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(async() =>{
		getRestaurant(searchParams.get("id"))
		.then(r=>{
			console.log("r",r)
			setRestaurant(r);
			setFoods(r.foods);
		});
	}, [])
	
	return (
		
		<div>
			<h1>{restaurant?.name}</h1>
			{foods.length > 0 && <FoodCards foods={foods}></FoodCards>}
		</div>
	);
}
 
export default RestaurantHome
;