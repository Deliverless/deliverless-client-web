import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { ReactComponent as Checkmark } from "../check.svg";
import { CartContext } from "../lib/context/cartContext";
import { SnackbarProvider, useSnackbar } from 'notistack';
import { Backdrop, CircularProgress } from '@mui/material';

function ThankYouPage() {
  const { handleCheckout, cartItems } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar: loadSnackbar } = useSnackbar();

  useEffect(async () => {
    setLoading(true);
    await handleCheckout(loadingUpdate);
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
