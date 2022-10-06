import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  Button,
  Modal,
} from 'react-bootstrap';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

import { CartContext } from '../lib/cartContext';

const FoodCardModal = ({ show, hide, onHide, restaurantId, food }) => {
  const [cartItem, setCartItem] = React.useState(food);
  const { addProduct } = useContext(CartContext);
  const [adjustedPrice, setAdjustedPrice] = useState(parseFloat(food.price));
  food.restaurantId = restaurantId;
  food.selOptions = [];

  const handleChange = (event, option) => {
    console.log("changed");
    console.log(event);
    console.log(event.target.checked);
    let selOptions = [];
    if (event.target.checked === true) {
      selOptions = [...cartItem.selOptions, option.name];
      handleFoodPrice(option.price, true);
      console.log(selOptions);
    } else {
      selOptions = [...cartItem.selOptions];
      handleFoodPrice(option.price, false);
      let tmpOpt = selOptions.findIndex((opt) => opt === option.name);
      selOptions.splice(tmpOpt, 1);
      console.log(selOptions);
    }
    setCartItem({ ...cartItem, selOptions });
    console.log("cartItem", cartItem);
  };

  const handleFoodPrice = (price, add) => {
    let tmpPrice = adjustedPrice;
    if (add) {
      tmpPrice += parseFloat(price);
    } else {
      tmpPrice -= parseFloat(price);
    }
    setAdjustedPrice(tmpPrice);
  };

  food.quantity = 1;
  const style = {
    position: "relative",
    overflow: "scroll",
    top: "50%",
    height: "600px",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const imgStyle = {
    width: "100%",
    height: "auto",
    borderRadius: "2em",
    margin: "20px",
  };

  const incrementQty = () => {
    let qty = cartItem.quantity + 1;
    setCartItem({ ...cartItem, quantity: qty });
  };

  const decrementQty = () => {
    let qty = cartItem.quantity > 1 ? cartItem.quantity - 1 : cartItem.quantity;
    setCartItem({ ...cartItem, quantity: qty });
  };

  const handleAddToCart = () => {
    addProduct(cartItem);
    setCartItem({ ...cartItem, quantity: 1 });
    onHide();
  };

  useEffect(() => {
    console.log("food", food);
    setAdjustedPrice(parseFloat(food.price));
  }, [food]);

  return (
    show && (
      <div>
        <Modal
          show={show}
          onHide={onHide}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton onHide={onHide}>
            <Modal.Title>{food.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src={food.images.find((i) => i.alt === "main")["url"]}
                      style={imgStyle}
                      alt="food"
                    />
                  </div>
                  <div className="col-md-7 offset-md-1 d-flex flex-column justify-content-end mb-3">
                    <p>{food.description}</p>
                    {food.options.length > 0 ? (
                      <div>
                        {food.options.map((optionMain, indexMain) => {
                          return (
                            <div key={indexMain}>
                              <Typography
                                variant="h6"
                                component="div"
                                style={{
                                  backgroundColor: "#eee",
                                  padding: "10px",
                                  borderRadius: "10px",
                                }}
                              >
                                {optionMain.name}
                              </Typography>
                              {optionMain.options.map((optionSub, indexSub) => (
                                <div key={indexMain + "-" + indexSub}>
                                  <Typography
                                    key={indexMain + "-" + indexSub}
                                    variant="body2"
                                    className="m-1"
                                  >
                                    {optionSub.name}
                                  </Typography>
                                  {optionSub.options.map((option, index) => (
                                    <div
                                      key={
                                        indexMain + "-" + indexSub + "-" + index
                                      }
                                      className="m-1"
                                    >
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            onChange={(e) => {
                                              handleChange(e, option);
                                            }}
                                          />
                                        }
                                        label={option.name}
                                      />
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {food.description}
          </Typography>
          {food.options.map((optionMain) => {
            return (
              <FormControl key={optionMain.name}>
                <FormLabel id="option-title">{optionMain.name}</FormLabel>
                {optionMain.options.map((optionSub) => (
                  <FormLabel key={optionSub.name}>
                    {optionSub.options.map((option) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={option.name}
                            onChange={handleChange}
                          />
                        }
                        label={option.name}
                      />
                    ))}
                  </FormLabel>
                ))}
              </FormControl>
            );
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
          </div> */}
          </Modal.Body>
          <Modal.Footer>
            <div className="col-12">
              <div className="row">
                <div className="col-6 d-flex flex-row justify-content-center">
                  <Button
                    variant="primary"
                    onClick={decrementQty}
                    style={{
                      marginRight: "10px",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      fontSize: "35px",
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    -
                  </Button>
                  <span style={{ padding: "10px" }}>{cartItem.quantity}</span>
                  <Button
                    variant="primary"
                    onClick={incrementQty}
                    style={{
                      marginLeft: "10px",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      fontSize: "35px",
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    +
                  </Button>
                </div>
                <div className="col-6 d-flex justify-content-end">
                  <Button
                    variant="primary"
                    onClick={handleAddToCart}
                    className="d-flex justify-content-center align-items-center"
                  >
                    Add {cartItem.quantity} to Cart
                    <div className="bullet p-2"> {" \u2B24 "} </div>
                    {`$${(adjustedPrice * cartItem.quantity).toFixed(2)}`}
                  </Button>
                </div>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    )
  );
};

export default FoodCardModal;
