import React, {useContext, useEffect, useState} from 'react'
import CartItem from '../components/CartItem';
import { CartContext } from '../lib/cartContext'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import CheckoutForm from "../components/CheckoutForm";
import "../StripeForm.css";

const stripePromise = loadStripe("pk_test_51LiTBOHlhPKJMrfBUI52YU8nihPcSYlBkCHy46irESS7ev1J7vBI1rHNId6wM0kpZ5OybUNUwPvnT0GdyZo9xQG500i6jQAWVw");

const Checkout = () =>{
    const {total, cartItems, itemCount, clearCart, checkout, handleCheckout, increase} = useContext(CartContext);


    const [clientSecret, setClientSecret] = useState("");

    const steps = ['Verify Address', 'Subtotal + Tip', 'Details & Payment'];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };



    useEffect(() => {
        // Create PaymentIntent as soon as the page loads

        console.log(typeof(total))
        fetch("/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ total: parseFloat(total) * 100 }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, []);

      const appearance = {
        theme: 'stripe',
      };

      const options = {
        clientSecret,
        appearance,
      };

    return (
      <div className="container" style={{ maxWidth: "800px" }}>
        <div>
          <div className="text-center mt-5">
            <h1>Checkout</h1>
          </div>

          <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>


          <div className="row no-gutters justify-content-center">
            <div className="col-sm-8 p-3">
              {cartItems.length > 0 ? (
                cartItems.map((food) => (

              <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="100"
                        image={food.photoUrl}
                        alt={food.food}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {food.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {
                          food.selOptions.map(opt =>(opt + ", "))
                          }
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>


                  // <CartItem
                  //   key={food.id}
                  //   food={food}
                  //   options={food.selOptions}
                  // />
                ))
              ) : (
                <div className="p-3 text-center text-muted">
                  Your cart is empty!
                </div>
              )}

              
            </div>
            {cartItems.length > 0 && (
              <div className="col-sm-4 p-3">
                <div className="card card-body">
                  <p className="mb-1">Total Items</p>
                  <h4 className=" mb-3 txt-right">{itemCount}</h4>
                  <p className="mb-1">Total Payment</p>
                  <h3 className="m-0 txt-right">{total}</h3>
                  <hr className="my-4" />
                  <div className="text-center">
                    <p>
                    </p>
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={clearCart}
                    >
                      CLEAR
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="App">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm handleCheckout={handleCheckout} />
            </Elements>
          )}
        </div>
      </div>
    );
    
}
export default Checkout;