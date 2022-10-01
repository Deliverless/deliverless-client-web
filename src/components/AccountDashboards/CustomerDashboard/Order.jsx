import React, { useState, useEffect, useContext} from 'react';
import {Button}  from '@mui/material';
import { Link } from '@mui/icons-material';
import { RestContext } from '../../../lib/context/restContext';

const Order = ({ image, itemCount, foods, total,tax, restaurantId, timePlaced, status}) => {
	const [orderRestaurant, setOrderRestaurant] = useState(null)
	const [restaurantImg, setRestaurantImg] = useState('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fpicture-not-found&psig=AOvVaw0h0e6i48nPE1uBmtGdbu2B&ust=1664664455923000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKDQub7MvfoCFQAAAAAdAAAAABAE')
	const { rests } = useContext(RestContext);

	useEffect(() => {
		getRest();
	}, []);

	const getRest = async ()=> {
		console.log("rest id", restaurantId)
		const restaurant = rests.find(r=> r.id == restaurantId)
		setOrderRestaurant(restaurant)
		console.log("restaurant", restaurant)
		setRestaurantImg(restaurant.image)
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
					<Button to={`/restaurant/home?id=${orderRestaurant.id}`} variant="contained" sx={{height:'56px', backgroundColor:'#2196f3'}}>View Menu</Button>
				</div>
		</>}
			
		</div>
	 );
}
 
export default Order;