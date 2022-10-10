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

import { CartContext } from '../lib/context/cartContext';

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

const FoodCardModal = ({ show, hide, onHide, restaurantId, food }) => {
  const [cartItem, setCartItem] = useState(food);
  const [totalPrice, setTotalPrice] = useState(parseFloat(food.price));
  const { addProduct } = useContext(CartContext);
  

  const incrementQty = () => {
    let newQty = cartItem.quantity + 1;
    setCartItem({ ...cartItem, quantity: newQty });
  };

  const decrementQty = () => {
    let newQty = cartItem.quantity > 1 ? cartItem.quantity - 1 : 1;
    setCartItem({ ...cartItem, quantity: newQty });
  };

  const handleChange = (e, option) => {
    let newPrice = totalPrice;
    let newSelectedOptions = cartItem.selectedOptions;
    if (e.target.checked) {
      newPrice += parseFloat(option.price);
    } else {
      newPrice -= parseFloat(option.price);
    }
    if (newSelectedOptions.includes(option)) {
      newSelectedOptions = newSelectedOptions.filter((opt) => opt !== option);
    } else {
      newSelectedOptions.push(option);
    }
    setTotalPrice(newPrice);
    setCartItem({ ...cartItem, selectedOptions: newSelectedOptions });
  };

  const handleAddToCart = () => {
    if (cartItem.id) {
      addProduct(cartItem);
    }
    onHide();
  };

  useEffect(() => {
    food.restaurantId = restaurantId;
    food.selectedOptions = [];
    food.quantity = 1;
    setTotalPrice(parseFloat(food.price));
    setCartItem({ ...food, restaurantId, selectedOptions: [], quantity: 1 });
  }, [food, restaurantId]);

  useEffect(() => {
    console.log('cartItem', cartItem);
  }, [cartItem]);

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
                                            disabled={
                                              cartItem.selectedOptions ? (
                                                cartItem.selectedOptions.find(
                                                (opt) =>
                                                  opt.name === option.name && (opt.price > 0 && option.price < 0 || opt.price < 0 && option.price > 0)
                                              )
                                            ) : (
                                              false
                                            )} 
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
                  <span style={{ padding: "10px" }}>{cartItem.quantity ? cartItem.quantity : 1}</span>
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
                    {`$${(totalPrice * cartItem.quantity).toFixed(2)}`}
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
