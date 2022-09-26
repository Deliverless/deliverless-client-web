import React, {useContext, useEffect, useState} from 'react'
import CartItem from '../components/CartItem';
import { CartContext } from '../lib/cartContext'
import { Link } from 'react-router-dom';
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
import Cookies from 'universal-cookie'
import {Button, TextField}  from '@mui/material';
import { getAutoComplete } from '../lib/addressapi';

import CheckoutForm from "../components/CheckoutForm";
import "../StripeForm.css";

const stripePromise = loadStripe("pk_test_51LiTBOHlhPKJMrfBUI52YU8nihPcSYlBkCHy46irESS7ev1J7vBI1rHNId6wM0kpZ5OybUNUwPvnT0GdyZo9xQG500i6jQAWVw");

const Checkout = () =>{
    
    const {total, cartItems, itemCount, clearCart, checkout, handleCheckout, increase} = useContext(CartContext);

    const [clientSecret, setClientSecret] = useState("");

    const steps = ['Verify Address', 'Subtotal + Tip', 'Details & Payment'];

  const [activeStep, setActiveStep] = React.useState(0);

  const [errors, setErrors] = React.useState(null);


  const cookies = new Cookies();
  const cookieAddress = cookies.get("Address");

  const [address, setAddress] = useState(cookieAddress)


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setErrors(null)
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  const handleChange = (e, input) =>{
		if (input === "housenumber")	setAddress({...address, housenumber: e.currentTarget.value})
		else if (input === "street") setAddress({...address, street: e.currentTarget.value})
		else if (input === "city") setAddress({...address, city: e.currentTarget.value})
		else if (input === "postcode") setAddress({...address, postcode: e.currentTarget.value})
		else if (input === "state_code") setAddress({...address, state_code: e.currentTarget.value})
    else if (input === "country_code") setAddress({...address, country_code: e.currentTarget.value})
	}

  useEffect(() => {



    if (activeStep === 1){

      getAutoComplete(`${address.housenumber} ${address.street}, 
    ${address.city}, ${address.state_code} ${address.postcode}, ${address.country_code} `)
    .then(response => {
      if(response.results.length > 0){
        cookies.set("Address", response.results[0])
      } else {
        handleReset(0)
        setErrors("Address does not exist, please try again.")
      }
    })

    }

  }, [activeStep])

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

          

          {activeStep === 0 &&

            
            <div className="center-container" style={{textAlign: 'center', flexDirection: 'column'}}>
            <h1>Confirm Delivery Address</h1>

            {errors && <div className="alert alert-danger">{errors}</div>}
            
            <form className="form-group">
          
              <TextField onChange={(e) => handleChange(e, "housenumber")} autoFocus required style={{marginBottom: '20px'}} id="outlined-basic" label="Suite/House Number" variant="outlined" value={address.housenumber}  /><br/>	
              <TextField onChange={(e) => handleChange(e, "street")} required style={{marginBottom: '20px'}} id="outlined-basic" label="Street" variant="outlined" value={address.street}  /><br/>	
              <TextField onChange={(e) => handleChange(e, "city")} required style={{marginBottom: '20px'}} id="outlined-basic" label="City" variant="outlined" value={address.city}  /><br/>	
              <TextField onChange={(e) => handleChange(e, "postcode")} required style={{marginBottom: '20px'}} id="outlined-basic" label="Postal Code" variant="outlined" value={address.postcode}  /><br/>	
              <TextField onChange={(e) => handleChange(e, "state_code")} required style={{marginBottom: '20px'}} id="outlined-basic" label="Province" variant="outlined" value={address.state_code}  /><br/>
              <TextField onChange={(e) => handleChange(e, "country_code")} required style={{marginBottom: '20px'}} id="outlined-basic" label="Country" variant="outlined" value={address.country_code}  /><br/>
      
      
            </form>
          </div>
          }

          {activeStep === 1 &&
                  <h2>
                    Subtotal + Tip
                  </h2>

          
          } 

          {activeStep === 2 &&

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
          <div className="App">
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm handleCheckout={handleCheckout} />
                </Elements>
              )}
              </div>
          </div>

                }

        </React.Fragment>
      )}
    </Box>


        </div>

      </div>
    );
    
}
export default Checkout;