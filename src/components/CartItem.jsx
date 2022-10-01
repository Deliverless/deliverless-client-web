import React, { useState ,useContext } from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CartContext } from '../lib/context/cartContext'

export default function CartItem({food, options}) {

  const { increase, decrease, removeProduct, setQuantity} = useContext(CartContext);

  const handleChange = (event) => {
		console.log(options)
    console.log("changed")
    if(event.target.value == -1){
     return removeProduct(food)
    }
    setQuantity({id:food.id, quantity:event.target.value})
  };

  const imgAlt = food.title

	const getOptions = () => {
		let opts = ""
		
		options.map(opt => {
			opts += opt + ", "
		})

		return opts.slice(0,-2)
	}


  return (
    <div sx={{ width: '100%' , borderRadius: '2em', margin: '20px'}}>
				<CardActionArea sx={{display:'flex', justifyContent: 'flex-start'}}>
					<CardMedia
						component="img"
						height="100"
            sx={{width:"100px!important"}}
						image={food.photoUrl}
						alt={imgAlt} />
					<CardContent>
						<Typography gutterBottom variant="h7" component="div">
							{food.title}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{'$' + (food.price * food.quantity).toFixed(2)}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{getOptions()}
						</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={food.quantity}
              label="Quantity"
              onChange={handleChange}
            >
                {[...Array(20).keys()].map((i)=>{
                  if(i == 0){
                    return <MenuItem key={i} value={-1}>Remove</MenuItem>
                  }
                  return <MenuItem key={i} value={i}>{i}</MenuItem>
                }
                   
                )}
          </Select>
					
					</CardContent>
          {/* {options.map(opt => {
						<span value={opt} color="text.secondary">
							{opt}
						</span>
					})}	 */}
				</CardActionArea>
			</div>
  )
}
