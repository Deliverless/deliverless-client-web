import React, { useContext } from 'react';

import {
  CardActionArea,
  CardMedia,
  MenuItem,
} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import { CartContext } from '../lib/context/cartContext';

export default function CartItem({item}) {

  const { increase, decrease, removeProduct, setQuantity} = useContext(CartContext);

  const handleChange = (event) => {
    if(event.target.value == -1){
     return removeProduct(item)
    }
    setQuantity({id:item.id, quantity:event.target.value, price:item.price, selectedOptions:item.selectedOptions})
  };

  return (
    <div style={{ width: '100%' , borderRadius: '2em', margin: '20px'}}>
				<CardActionArea sx={{display:'flex', justifyContent: 'flex-start'}}>
					<CardMedia
						component="img"
						height="100"
            sx={{width:"100px!important"}}
						image={item.images.find(img => img.alt === "main").url}
						alt={item.name}
					/>
					<CardContent>
						<Typography gutterBottom variant="h6" component="div">
							{item.name}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{'$' + (item.price * item.quantity).toFixed(2)}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{item.selectedOptions.map(opt => opt.price > 0 ? 'Add ' + opt.name : 'Remove ' + opt.name).join(', ')}
						</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={item.quantity}
              label="Quantity"
              onChange={handleChange}
            >
							<MenuItem value={-1}>Remove</MenuItem>
                {[...Array(10).keys()].map((x) => (
									<MenuItem key={x} value={x+1}>
										{x+1}
									</MenuItem>
								))}

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
