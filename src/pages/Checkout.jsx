import '../StripeForm.css';

import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import Cookies from 'universal-cookie';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Button,
  TextField,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from '../components/CheckoutForm';
import { getAutoComplete } from '../lib/api/addressapi';
import { CartContext } from '../lib/context/cartContext';
import { OrderContext } from '../lib/context/orderContext';
import { UserContext } from '../lib/context/userContext';
import Order from '../models/order';
import { getStripeSecret } from '../lib/web3-helper';

const stripePromise = loadStripe(
  "pk_test_51LiTBOHlhPKJMrfBUI52YU8nihPcSYlBkCHy46irESS7ev1J7vBI1rHNId6wM0kpZ5OybUNUwPvnT0GdyZo9xQG500i6jQAWVw"
);

const Checkout = () => {
  const {
    total,
    cartItems,
    itemCount,
    clearCart,
    checkout,
    handleCheckout,
    increase,
  } = useContext(CartContext);

  const [clientSecret, setClientSecret] = useState("");

  const { order, setOrder, clearOrder } = useContext(OrderContext)
  const { user, setUser } = useContext(UserContext);

  const steps = ["Verify Address", "Subtotal + Tip", "Details & Payment"];

  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState(null);

  const [paymentTotal, setPaymentTotal] = useState(0);

  const [tip, setTip] = useState(0.15);


  const [orderTotal, setOrderTotal] = useState(0);

  const cookies = new Cookies();
  const cookieAddress = cookies.get("Address");

  const [address, setAddress] = useState(cookieAddress);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setErrors(null);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleTip = (event, newTip) => {
    if (newTip !== null) {
      setTip(newTip);
    }
  };

  const handleChange = (e, input) => {
    if (input === "housenumber")
      setAddress({ ...address, housenumber: e.currentTarget.value });
    else if (input === "street")
      setAddress({ ...address, street: e.currentTarget.value });
    else if (input === "city")
      setAddress({ ...address, city: e.currentTarget.value });
    else if (input === "postcode")
      setAddress({ ...address, postcode: e.currentTarget.value });
    else if (input === "state_code")
      setAddress({ ...address, state_code: e.currentTarget.value });
    else if (input === "country_code")
      setAddress({ ...address, country_code: e.currentTarget.value });
  };

  useEffect( async ()  => {
    if (activeStep === 1) {
      getAutoComplete(`${address.housenumber} ${address.street}, 
    ${address.city}, ${address.state_code} ${address.postcode}, ${address.country_code} `).then(
        (response) => {
          if (response.results.length > 0) {
            cookies.set("Address", response.results[0]);
          } else {
            handleReset(0);
            setErrors("Address does not exist, please try again.");
          }
        }
      );
    }
    else if (activeStep === 2) {
      let cookies = new Cookies();
      const {lat, lon, formatted} = cookies.get("Address")
      const isPickup = cookies.get("isPickup")
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      today.toDateString();
      console.log("total", total)
      const driverFee = 5.0;
      const subtotal = parseFloat(total);
      const tax = subtotal * 0.13;
      const tipAmt = Math.round((total * tip + Number.EPSILON) * 100) / 100
      setOrderTotal(Math.round(((parseFloat(subtotal) + parseFloat(tax) + parseFloat(driverFee) + parseFloat(tipAmt)) + Number.EPSILON) * 100) / 100)
      let totalAmt = Math.round(((parseFloat(subtotal) + parseFloat(tax) + parseFloat(driverFee) + parseFloat(tipAmt)) + Number.EPSILON) * 100) / 100;
      console.log(total)
      console.log(driverFee)
      console.log(tax)
      console.log(tipAmt)
      console.log(orderTotal)
      const order = new Order(
          user.id,
          "",
          cartItems[0].restaurantId,
          "",
          { lat, lon, formatted },
          isPickup,
          "Pending",
          0,
          tax,
          driverFee,
          subtotal,
          totalAmt,
          tip,
          today,
          cartItems
      );
      setOrder(order);
      
      let testVar = Math.round((totalAmt + Number.EPSILON) * 100).toString()
      console.log("hello", testVar)

      setClientSecret( (await getStripeSecret(testVar)).data.secret)

      }
  }, [activeStep]);


  const appearance = {
    theme: "stripe",
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

        <Box sx={{ width: "100%" }}>
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
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />

                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>

              {activeStep === 0 && (
                <div
                  className="center-container"
                  style={{ textAlign: "center", flexDirection: "column" }}
                >
                  <h1>Confirm Delivery Address</h1>

                  {errors && <div className="alert alert-danger">{errors}</div>}

                  <form className="form-group">
                    <TextField
                      onChange={(e) => handleChange(e, "housenumber")}
                      autoFocus
                      required
                      style={{ marginBottom: "20px" }}
                      id="outlined-basic"
                      label="Suite/House Number"
                      variant="outlined"
                      value={address.housenumber}
                    />
                    <br />
                    <TextField
                      onChange={(e) => handleChange(e, "street")}
                      required
                      style={{ marginBottom: "20px" }}
                      id="outlined-basic"
                      label="Street"
                      variant="outlined"
                      value={address.street}
                    />
                    <br />
                    <TextField
                      onChange={(e) => handleChange(e, "city")}
                      required
                      style={{ marginBottom: "20px" }}
                      id="outlined-basic"
                      label="City"
                      variant="outlined"
                      value={address.city}
                    />
                    <br />
                    <TextField
                      onChange={(e) => handleChange(e, "postcode")}
                      required
                      style={{ marginBottom: "20px" }}
                      id="outlined-basic"
                      label="Postal Code"
                      variant="outlined"
                      value={address.postcode}
                    />
                    <br />
                    <TextField
                      onChange={(e) => handleChange(e, "state_code")}
                      required
                      style={{ marginBottom: "20px" }}
                      id="outlined-basic"
                      label="Province"
                      variant="outlined"
                      value={address.state_code}
                    />
                    <br />
                    <TextField
                      onChange={(e) => handleChange(e, "country_code")}
                      required
                      style={{ marginBottom: "20px" }}
                      id="outlined-basic"
                      label="Country"
                      variant="outlined"
                      value={address.country_code}
                    />
                    <br />
                  </form>
                </div>
              )}

              {activeStep === 1 && (
                <div className="row no-gutters justify-content-center">
                  <div
                    className="col-sm-6 p-3"
                    style={{ overflow: "scroll", height: "400px" }}
                  >
                    {cartItems.length > 0 ? (
                      cartItems.map((food) => (
                        <Card sx={{ maxWidth: 345 }}>
                          <List
                            sx={{
                              width: "100%",
                              maxWidth: 360,
                              bgcolor: "background.paper",
                            }}
                          >
                            <ListItem alignItems="flex-start">
                              <ListItemAvatar>
                                <Avatar
                                  alt={food.name}
                                  src={
                                    food.images.find(
                                      (img) => img.alt === "main"
                                    ).url
                                  }
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={food.name}
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      className="d-flex flex-column"
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      {food.selectedOptions.map(
                                        (opt, index) => (
                                          <span
                                            key={index}
                                            style={{ fontSize: "12px" }}
                                          >
                                            {opt.price > 0 ? (
                                              <span>
                                                Add {opt.name} (+$
                                                {opt.price.toFixed(2)})
                                              </span>
                                            ) : (
                                              <span>
                                                Remove {opt.name} (-$
                                                {Math.abs(opt.price).toFixed(2)}
                                                )
                                              </span>
                                            )}
                                          </span>
                                        )
                                      )}
                                    </Typography>
                                    <Typography
                                      sx={{ display: "block" }}
                                      component="span"
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {`$` + food.price.toFixed(2)}
                                    </Typography>
                                    <Typography
                                      sx={{ display: "block" }}
                                      component="span"
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {`Qty: ` + food.quantity}
                                    </Typography>
                                  </React.Fragment>
                                }
                              />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                          </List>
                        </Card>
                      ))
                    ) : (
                      <div className="p-3 text-center text-muted">
                        Your cart is empty!
                      </div>
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    <div
                      className="col-sm-4 col-lg-5 p-2"
                      style={{ minHeight: "400px", height: "100%" }}
                    >
                      <div
                        className="card card-body"
                        style={{ minHeight: "400px", height: "100%" }}
                      >
                        <p className="mb-1 w-100">
                          Total Items:
                          <div className=" m-0 float-right">{itemCount}</div>
                        </p>
                        <p className="mb-1">
                          Subtotal:{" "}
                          <div className="m-0 float-right">${total}</div>
                        </p>
                        <p className="mb-1">
                          Tax:{" "}
                          <div className="m-0 float-right">
                            $
                            {Math.round((total * 0.13 + Number.EPSILON) * 100) /
                              100}
                          </div>
                        </p>
                        <p className="mb-1">
                          Tip:{" "}
                          <div className="m-0 float-right">
                            $
                            {Math.round((total * tip + Number.EPSILON) * 100) /
                              100}
                          </div>
                        </p>
                        <hr className="my-4" />
                        <ToggleButtonGroup
                          value={tip}
                          exclusive
                          onChange={handleTip}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <ToggleButton value={0.15}>%15</ToggleButton>
                          <ToggleButton value={0.18}>%18</ToggleButton>
                          <ToggleButton value={0.2}>%20</ToggleButton>
                          <ToggleButton value={0.3}>%30</ToggleButton>
                        </ToggleButtonGroup>

                        <div className="text-center">
                          <hr className="my-4" />
                          <p></p>
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
              )}

              {activeStep === 2 && (
                <div className="row no-gutters justify-content-center">
                  <div
                    className="col-sm-6 p-3"
                    style={{ overflow: "scroll", height: "400px" }}
                  >
                    {cartItems.length > 0 ? (
                      cartItems.map((food) => (
                        <Card sx={{ maxWidth: 345 }}>
                          <List
                            sx={{
                              width: "100%",
                              maxWidth: 360,
                              bgcolor: "background.paper",
                            }}
                          >
                            <ListItem alignItems="flex-start">
                              <ListItemAvatar>
                                <Avatar
                                  alt={food.name}
                                  src={
                                    food.images.find(
                                      (img) => img.alt === "main"
                                    ).url
                                  }
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={food.name}
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      className="d-flex flex-column"
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      {food.selectedOptions.map(
                                        (opt, index) => (
                                          <span
                                            key={index}
                                            style={{ fontSize: "12px" }}
                                          >
                                            {opt.price > 0 ? (
                                              <span>
                                                Add {opt.name} (+$
                                                {opt.price.toFixed(2)})
                                              </span>
                                            ) : (
                                              <span>
                                                Remove {opt.name} (-$
                                                {Math.abs(opt.price).toFixed(2)}
                                                )
                                              </span>
                                            )}
                                          </span>
                                        )
                                      )}
                                    </Typography>
                                    <Typography
                                      sx={{ display: "block" }}
                                      component="span"
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {`$` + food.price.toFixed(2)}
                                    </Typography>
                                    <Typography
                                      sx={{ display: "block" }}
                                      component="span"
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {`Qty: ` + food.quantity}
                                    </Typography>
                                  </React.Fragment>
                                }
                              />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                          </List>
                        </Card>
                      ))
                    ) : (
                      <div className="p-3 text-center text-muted">
                        Your cart is empty!
                      </div>
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    <div
                      className="col-sm-4 col-lg-5 p-2"
                      style={{ minHeight: "400px", height: "100%" }}
                    >
                      <div
                        className="card card-body"
                        style={{ minHeight: "400px", height: "100%" }}
                      >
                        <div className="d-flex">
                          <LocationOnIcon
                            sx={{ marginRight: "5px" }}
                          ></LocationOnIcon>
                          <div className="m-0 float-right">
                            {address.housenumber} {address.street},{" "}
                            {address.city} {address.state_code}
                          </div>
                        </div>
                        <hr className="my-4" />
                        <p className="mb-1 w-100">
                          Total Items:
                          <div className=" m-0 float-right">{itemCount}</div>
                        </p>
                        <p className="mb-1">
                          Subtotal:{" "}
                          <div className="m-0 float-right">${total}</div>
                        </p>
                        <p className="mb-1">
                          Tax:{" "}
                          <div className="m-0 float-right">
                            $
                            {Math.round((total * 0.13 + Number.EPSILON) * 100) /
                              100}
                          </div>
                        </p>
                        <p className="mb-1">
                          Tip:{" "}
                          <div className="m-0 float-right">
                            $
                            {Math.round((total * tip + Number.EPSILON) * 100) /
                              100}
                          </div>
                        </p>
                        <p className="mb-1">
                          Delivery Fee:{" "}
                          <div className="m-0 float-right">
                            $
                            {5.00}
                          </div>
                        </p>
                        <p className="mb-1">
                          Total:{" "}
                          <div className="m-0 float-right">
                            $
                            {orderTotal}
                          </div>
                        </p>

                        <ToggleButtonGroup
                          value={tip}
                          exclusive
                          onChange={handleTip}
                          sx={{ display: "none" }}
                        >
                          <ToggleButton value={0.15}>%15</ToggleButton>
                          <ToggleButton value={0.18}>%18</ToggleButton>
                          <ToggleButton value={0.2}>%20</ToggleButton>
                          <ToggleButton value={0.3}>%30</ToggleButton>
                        </ToggleButtonGroup>
                        <div className="text-center">
                          <hr className="my-4" />
                          <p></p>
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
                        <CheckoutForm />
                      </Elements>
                    )}
                  </div>
                </div>
              )}
            </React.Fragment>
          )}
        </Box>
      </div>
    </div>
  );
};
export default Checkout;
