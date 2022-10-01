import React, {useContext} from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import { useState } from 'react';
import { CardActionArea } from '@mui/material';
import { foods } from '../lib/foodData';
import Divider from '@mui/material/Divider';
import { CartContext } from '../lib/context/cartContext'
import Checkbox from '@mui/material/Checkbox';
import { useSearchParams } from "react-router-dom";

const FoodCardModal = ({food}) => {

  const [searchParams, setSearchParams] = useSearchParams();
  food.restaurantId = searchParams.get("id")
  food.selOptions = [];


  const handleChange = (event) => {
    console.log("changed")
    console.log(event.target.value);
    console.log(event.target.checked);
    let selOptions = [];
    if(event.target.checked == true){
      selOptions  = [...cartItem.selOptions, event.target.value];
      console.log(selOptions);

    } else {

      selOptions  = [...cartItem.selOptions];
      let tmpOpt = selOptions.findIndex((opt) => opt == event.target.value)
      selOptions.splice(tmpOpt, 1);
      console.log(selOptions);


    }
    setCartItem({...cartItem, selOptions});
  };

  food.quantity = 1;
  const style = {
    position: 'relative',
    overflow: 'scroll',
    top: '50%',
    height:'600px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const imgStyle = {
    top: '50%',
    left: '50%',
    width: 345,
  
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [cartItem, setCartItem] = React.useState(food)
  const {addProduct} = useContext(CartContext);


  const incrementQty = () => {
    let qty  = cartItem.quantity + 1;
    setCartItem({...cartItem, quantity: qty});
  };

  const decrementQty = () => {
    let qty  = cartItem.quantity > 1 ? cartItem.quantity - 1 : cartItem.quantity;
    setCartItem({...cartItem, quantity: qty});
  };

  const handleAddToCart = () => {
    addProduct(cartItem)
    setCartItem({...cartItem, quantity: 1});
    setOpen(false)
  }


return(
<div>
<Button onClick={handleOpen}>
  <Icon className="fa fa-plus-circle"></Icon>
</Button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <img src={food.photoUrl} style={imgStyle}/>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      {food.title}
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      {food.description}
    </Typography>
    {food.options.map((option) =>{
      
      return <FormControl key={option.title}>
      <FormLabel id="option-title">{option.title}</FormLabel>
    

          {option.options.map((innerOption) => 
          <FormControlLabel control={<Checkbox value={innerOption.title} onChange={handleChange} />} label={innerOption.title} />
          )}
      
      </FormControl>
        
          })}

    <Divider />
    <br></br>
    <div>
      <Button onClick={incrementQty}>
        <Icon className="fa fa-plus-circle"></Icon>
      </Button>
      <span>{cartItem.quantity}</span>
      <Button onClick={decrementQty}>
        <Icon className="fa fa-minus-circle"></Icon>
      </Button>
      <Button onClick={handleAddToCart} variant="contained">
        Add {cartItem.quantity} To Cart &nbsp;
        <Icon className="fa fa-cart-plus"></Icon>
      </Button>

    </div>
    
  </Box>
</Modal>
</div>
);
}


export default FoodCardModal;