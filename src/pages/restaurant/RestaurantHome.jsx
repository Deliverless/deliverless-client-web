import React, {useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import FoodCards from '../../components/FoodCards';
// import { retrieve } from '../../smartcontracts/entities/restaurant'

const RestaurantHome = () => {
	const [foods, setFoods] = useState([])
	const [restaurant, setRestaurant] = useState()
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(async() =>{
		console.log("here")
		// await retrieve(searchParams.get("id"))
		// .then(r=>{
		// 	setRestaurant(r[0].data);
		// 	// console.log(r.data.foods)
		// 	console.log(r[0].data.foods)
		// 	setFoods(r[0].data.foods);
		// });
		
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