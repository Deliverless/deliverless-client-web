import React, { Component, useEffect, useContext } from 'react';
import { CartContext} from '../lib/cartContext';

function ThankYou() {

  const {handleCheckout} = useContext(CartContext);

useEffect(() => {
  handleCheckout()
}, [])


  return ( 
<h1>Thank You</h1>
   );
}

export default ThankYou;