import './styles.scss';

import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  Button,
  Modal,
} from 'react-bootstrap';

import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

import { CartContext } from '../../lib/context/cartContext';

const FoodCardModal = ({ 
  show, 
  onHide, 
  restaurantId, 
  food,
  edit,
}) => {
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
    cartItem.restaurantId = restaurantId;
    cartItem.selectedOptions = [];
    cartItem.quantity = 1;
    setTotalPrice(parseFloat(food.price));
    setCartItem({ ...food, restaurantId, selectedOptions: [], quantity: 1 });
  }, [food, restaurantId]);

  return (
    show && (
      <div>
        <Modal
          show={show}
          onHide={onHide}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className='modal'
        >
          <Modal.Header closeButton onHide={onHide}>
            <Modal.Title className='d-flex flex-row'>
              <div>
                {food.name} 
              </div>
              <div className='d-flex justify-content-center align-items-center' style={{ fontSize: '0.4rem', marginLeft: '0.5rem', marginRight: '0.5rem' }}>
                {' \u2B24 '} 
              </div>
              <div>
                {`$${totalPrice.toFixed(2)}`}
              </div>
              {edit && (
                <EditIcon
                  className="title-edit-icon"
                />
              )}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12">
                <div className="image-container col-md-10 offset-md-1 d-flex flex-column justify-content-end mb-3">
                  <img
                    className="image"
                    src={food.images.length !== 0 ? food.images.find((i) => i.alt === "main")["url"] : "https://via.placeholder.com/150"}
                    alt="food"
                  />
                  {edit && <EditIcon className="image-edit-icon" />}
                </div>
                <div className="col-md-10 offset-md-1 d-flex flex-column justify-content-end mb-3">
                  <p className="description">{food.description}</p>
                  {food.options.length > 0 ? (
                    <div>
                      {food.options.map((optionMain, indexMain) => {
                        return (
                          <div key={indexMain}>
                            <Typography
                              className="option-title"
                              variant="h6"
                              component="div"
                            >
                              {optionMain.name}
                              {edit && (
                                <EditIcon
                                  className="option-title-edit-icon"
                                />
                              )}
                            </Typography>
                            {optionMain.options.map((optionSub, indexSub) => (
                              <div key={indexMain + "-" + indexSub}>
                                <Typography
                                  className="option-subtitle"
                                  key={indexMain + "-" + indexSub}
                                  variant="body2"
                                >
                                  {optionSub.name}
                                  {edit && (
                                    <EditIcon
                                      className="option-subtitle-edit-icon"
                                    />
                                  )}
                                </Typography>
                                {optionSub.options.map((option, index) => (
                                  <div
                                    key={
                                      indexMain + "-" + indexSub + "-" + index
                                    }
                                    className="d-flex align-items-center justify-content-between"
                                  >
                                    <FormControlLabel
                                      className="option-checkbox"
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
                                    {option.price && (
                                      <Typography
                                        className="option-price"
                                        variant="body2"
                                      >
                                        {option.price > 0 ? "+" : "-"}${Math.abs(option.price).toFixed(2)}
                                      </Typography>
                                    )}
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
