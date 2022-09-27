import React, {useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import FoodCards from './FoodCards'
import { foods } from '../lib/foodData';
import http from '../lib/api';
import { useNavigate } from 'react-router-dom'

const RestaurantCard = ({ restauId, name, image, address}) => {
	const imgAlt = name + "'s logo"
	const addressDets = `${address.number} ${address.street}`;
	const navigate = useNavigate()
	
	const getRestaurantMenu = async () =>{
		navigate(`/restaurant/home?id=${restauId}`);
	}
		return (
			<Card sx={{ width: 345 , borderRadius: '2em', margin: '20px'}}>
				<CardActionArea onClick={getRestaurantMenu}>
					<CardMedia
						component="img"
						height="140"
						image={image}
						alt={imgAlt} />
						
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{name}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{addressDets}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		);
	}
	
	
export default RestaurantCard;