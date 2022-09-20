import React, { Component, useEffect, useContext } from 'react';
import { CartContext } from '../lib/cartContext';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { textAlign } from '@mui/system';
import Button from '@mui/material/Button';
import {ReactComponent as Checkmark} from '../check.svg'

function ThankYou() {

  const {handleCheckout, cartItems} = useContext(CartContext);

useEffect(() => {
  handleCheckout()
  console.log(cartItems)
}, [])


  return ( 
    <div className="container" style={{ maxWidth: "800px", textAlign:"center" }}>
    <Typography variant="h2" gutterBottom sx={{
    marginTop: 15,
    fontWeight: 'bold',
  }}>
      Thanks for ordering!
    </Typography>

  <Checkmark></Checkmark>


    <Typography variant="h6" gutterBottom sx={{
    marginTop: 10,
  }}>
      Your order has been successfully placed, a driver is being located.
    </Typography>
    <Button variant="contained" sx={{ marginTop: 10,}}>RETURN TO HOME</Button>
    </div>
    );
  }

export default ThankYou;