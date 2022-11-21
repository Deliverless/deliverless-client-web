import React, { useContext, useEffect, useState } from "react";


import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar: loadSnackbar } = useSnackbar();
  const { user, setUser } = useContext(UserContext);
  const { order, setOrder, clearOrder } = useContext(OrderContext)
  

  useEffect(async () => {
    setLoading(true);

  //   let [handleCheckoutResult, restUser] = await Promise.all([
  //     handleCheckout(loadingUpdate),
  //     getUser(rest.id)
  // ]);

  const rests = await requestRestaurants();

  const rest = rests.find((r) => r.id == order.restaurantId)
  console.log("order -----------", order)
  console.log("hello this is the RESTs", rests)
  await handleCheckout(loadingUpdate);
  console.log("hello this is the REST", rest)
  // let restUser = getUser(rest.id);
  
    console.log("hello i am before restPhone")
    // let restPhone = (await restUser).data.phonenum;
   
    let tableString = "" 
    
    
      order.items.forEach(item => {
        tableString += ("<tr>");
      tableString += (`<td style="background-color:rgb(255,255,255)">` + `<img style="width: 50px;" src="${item.images[0].url}"></img>` + "   " +  "Qty: " + item.quantity + "       " + item.name + "      $" + item.price +   "</td>");
      tableString +=("</tr>");
      })
      

      console.log("after for loop string")

    sendEmail("template_3f5aeoq", {
      from_name: "The Food Chain",
      to_email:user.email,
      to_name:user.firstName + " " + user.lastName,
      rest_name:"Burger King",
      rest_address:"240 Wyecroft Road, Oakville, ON L6K 2G7",
      rest_number:"(905) 842-1681",
      // rest_name:rest.name,
      // rest_address:rest.address,
      // rest_number:restPhone,
      cust_address:order.address.formatted,
      cust_number:user.phone,
      order_table: tableString,
      total: order.total
    })
    console.log("after send email")
    setLoading(false);
  }, []);

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
