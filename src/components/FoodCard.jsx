import React, {useContext, useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { foods } from '../lib/foodData';
import FoodCardModal from './FoodCardModal';
import Badge from '@mui/material/Badge';
import { CartContext } from '../lib/context/cartContext'

const FoodCard = ({food}) => {
	const {cartItems} = useContext(CartContext);
	const cartCount = cartItems?.find(i=>i.id == food.id)?.quantity;
	const imgAlt = food.title

		return (
			<div style={{position:'relative'}}>
				<Badge sx={{position: 'absolute',right: '50px',top: '50px'}} badgeContent={cartCount} color="primary"></Badge>
				<Card sx={{ width: 285 , borderRadius: '2em', margin: '20px'}}>
					
					
						<CardActionArea>
							<CardMedia
								component="img"
								height="180"
								image={food.photoUrl}
								alt={imgAlt} />
							<CardContent>
								<Typography gutterBottom variant="h7" component="div">
									{food.title}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{'$' + food.price}
								</Typography>
							</CardContent>
							<FoodCardModal food={food}/>
						</CardActionArea>
				</Card>
			</div>
		);
	}
	
export default FoodCard;