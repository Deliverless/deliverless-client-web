import React, { useContext, useEffect, useState } from "react";


import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Restaurant from '../models/restaurant';

import { ReactComponent as Checkmark } from "../check.svg";
import { CartContext } from "../lib/context/cartContext";
import { SnackbarProvider, useSnackbar } from 'notistack';
import { Backdrop, CircularProgress } from '@mui/material';
import { OrderContext } from '../lib/context/orderContext';
import { UserContext } from '../lib/context/userContext';
import { RestContext } from '../lib/context/restContext';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import sendEmail from "../lib/email-helper";
import { getUser } from "../models/user";
import { requestRestaurant, requestRestaurants } from "../models/restaurant";

function ThankYouPage() {
  const { handleCheckout, cartItems } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar: loadSnackbar } = useSnackbar();
  const { user, setUser } = useContext(UserContext);
  const { order, setOrder, clearOrder } = useContext(OrderContext)
  const [restaurant, setRestaurant] = useState(null);
	const restaurantList = useSelector(state => state.restaurant.list);
	const restaurantIsLoading = useSelector(state => state.restaurant.isLoading);
  const dispatch = useDispatch();

  const initializeRestaurant = () => {
		if (cartItems[0]?.restaurantId) {
      
			const res_restaurant = restaurantList.find(restaurant => restaurant.id === cartItems[0].restaurantId);
      
			if (res_restaurant && restaurantList.length != 0) {
				const new_restaurant = new Restaurant();
				new_restaurant.initJson(res_restaurant);
				setRestaurant(new_restaurant);
			} else {
				dispatch({ type: 'GET_RESTAURANT_BY_ID', payload: { id: cartItems[0].restaurantId } });
			}
		} else {
			console.log('No restaurant selected');
		}
	};


  useEffect(() => {
  initializeRestaurant()
  }, [restaurantList])

  const initializeEmailCheckout = async () => {

    let [handleCheckoutResult, restUser] = await Promise.all([
      handleCheckout(loadingUpdate),
      getUser(restaurant.id)
  ]);
  
    let tableString = "" 
    
    
      order.items.forEach(item => {
        tableString += ("<tr>");
      tableString += (`<td style="background-color:rgb(255,255,255)">` + `<img style="width: 50px;" src="${item.images[0].url}"></img>` + "   " +  "Qty: " + item.quantity + "       " + item.name + "      $" + item.price +   "</td>");
      tableString +=("</tr>");
      })
      


    sendEmail("template_3f5aeoq", {
      from_name: "The Food Chain",
      to_email:user.email,
      to_name:user.firstName + " " + user.lastName,
      rest_name:restaurant.name,
      rest_address:restaurant.address.street + ", " + restaurant.address.local + ", " + restaurant.address.region,
      rest_number:restUser.phone,
      cust_address:order.address.formatted,
      cust_number:user.phone,
      order_table: tableString,
      total: order.total
    })
    setLoading(false);
  }

  useEffect( () => {

    restaurant && initializeEmailCheckout()

  }, [restaurant]);

  const loadingUpdate = (update, variant)=>{
    loadSnackbar(update, {variant})
  }

  return (
    <div
      className="container"
      style={{ maxWidth: "800px", textAlign: "center" }}
    >
      <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
      </Backdrop>
      {loading ? (
         <Typography
         variant="h2"
         gutterBottom
         sx={{
           marginTop: 15,
           fontWeight: "bold",
         }}
       >
         Order Processing ...
       </Typography>
      ) : (
        <>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              marginTop: 15,
              fontWeight: "bold",
            }}
          >
            Thanks for ordering!
          </Typography>

          <Checkmark></Checkmark>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              marginTop: 10,
            }}
          >
            Your order has been successfully placed, a driver is being located.
          </Typography>
        </>
      )}

      <Button
        variant="contained"
        component={Link}
        to="/"
        sx={{ marginTop: 10 }}
      >
        RETURN TO HOME
      </Button>
    </div>
  );
}

export default function Thankyou() {
  return (
    <SnackbarProvider maxSnack={3}>
      <ThankYouPage />
    </SnackbarProvider>
  );
}
