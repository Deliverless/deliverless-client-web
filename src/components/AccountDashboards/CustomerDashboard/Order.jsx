import React, {
  useEffect,
  useState,
} from 'react';

import { Button } from '@mui/material';

import { getRestaurantById } from '../../../models/restaurant';

const Order = ({key, image, itemCount, foods, total,tax, restaurantID, timePlaced, status}) => {
	const [orderRestaurant, setOrderRestaurant] = useState(null)
	const [restaurantImg, setRestaurantImg] = useState(null)

	useEffect(() =>{
		getRest();
	}, [])

	const getRest = async ()=> {
		const restaurant = await getRestaurantById(restaurantID);
		console.log("restaurantID",restaurantID)
		setOrderRestaurant(restaurant)
		setRestaurantImg(restaurant.image)
	}

	const goToRestaurant = () =>{
		//open restaurant menu using restaurantID prop
	}
	return ( 
		
		<div className="center-container row">
			{orderRestaurant && <><div className="col-md-3">
				<img src={restaurantImg} alt="restaurant logo" style={{width:"150px",height:"100px"}}/>
				{/* <p className="h6">Tax: ${tax.toFixed(2)}</p>
				<p className="h6">Subtotal: ${parseFloat(total) - parseFloat(tax)}</p> */}
				<p className="h5">Status: {status}</p>
				<p className="h4">Total: ${total.toFixed(2)}</p>
				
			</div>
		
			<div className="col-md-7">
				<div className="center-container">
					<h2 className="h1">{orderRestaurant.name}</h2>
				</div>
				{foods.map(food => 
					<div key={food.id}>
						<p className="lead">{food.title} ${food.price} x {food.quantity}</p>
					</div>
					)
				}
			</div>

				{/* will use same functionality as RestaurantCard onClick */}
				<div className="col-md-2">
					<Button  onClick={goToRestaurant} variant="contained" sx={{height:'56px', backgroundColor:'#2196f3'}}>View Menu</Button>
				</div>
		</>}
			
		</div>
	 );
}
 
export default Order;