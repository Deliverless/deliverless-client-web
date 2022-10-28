import './styles.scss';

import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  FormikProvider,
  useFormik,
} from 'formik';
import {
  Button,
  Modal,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import {
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

import { CartContext } from '../../lib/context/cartContext';
import OptionControls from './components/OptionControls';

const FoodCardModal = ({ 
  show, 
  onHide, 
  restaurantId, 
  food, 
  edit, 
  isLoading,
}) => {
  const [cartItem, setCartItem] = useState(food);
  const [totalPrice, setTotalPrice] = useState(parseFloat(food.price));
  const { addProduct } = useContext(CartContext);
  const [isUpdated, setIsUpdated] = useState(false);

  const dispatch = useDispatch();

  const editSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    price: Yup.number().required('Required'),
    discount: Yup.number().notRequired(),
    isAvailable: Yup.boolean().required('Required'),
    isPickupOnly: Yup.boolean().required('Required'),
    size: Yup.string().notRequired(),
    images: Yup.array().of(
      Yup.object().shape({
        url: Yup.string().required('Required'),
        alt: Yup.string().required('Required'),
      })
    ).notRequired(),
    options: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Required'),
        options: Yup.array().of(
          Yup.object().shape({
            name: Yup.string().required('Required'),
            limit: Yup.number().required('Required'),
            isOptional: Yup.boolean().required('Required'),
            options: Yup.array().of(
              Yup.object().shape({
                name: Yup.string().required('Required'),
                price: Yup.number().required('Required'),
              })
            ),
          })
        ),
      })
    ),
  });

  const editFormik = useFormik({
    initialValues: {
      id: food.id,
      name: food.name,
      description: food.description,
      price: food.price,
      discount: food.discount,
      isAvailable: food.isAvailable,
      isPickupOnly: food.isPickupOnly,
      options: food.options,
      size: food.size,
    },
    validationSchema: editSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("values", values);
      // let itemChanges = getDifference(food, values);
      // console.log("itemChanges", itemChanges);
      // itemChanges = Object.keys(itemChanges).reduce((acc, key) => {
      //   if (Array.isArray(itemChanges[key])) {
      //     acc[key] = editFormik.values[key];
      //   } else if (itemChanges[key] !== undefined) {
      //     acc[key] = itemChanges[key];
      //   }
      //   return acc;
      // }, {});
      // console.log("itemChanges v2", itemChanges);
      // setIsUpdated(true);
      // dispatch({ type: 'SET_RESTAURANT_ITEM', payload: { restaurantId, id: food.id, data: itemChanges } });
    },
  });

  const incrementQty = () => {
    let newQty = cartItem.quantity + 1;
    setCartItem({ ...cartItem, quantity: newQty });
  };

  const decrementQty = () => {
    let newQty = cartItem.quantity > 1 ? cartItem.quantity - 1 : 1;
    setCartItem({ ...cartItem, quantity: newQty });
  };

  const getDifference =(o1, o2) => {
    var diff = {};
    var tmp = null;
    if (JSON.stringify(o1) === JSON.stringify(o2)) return;
  
    for (var k in o1) {
      if (Array.isArray(o1[k]) && Array.isArray(o2[k])) {
        tmp = o1[k].reduce(function(p, c, i) {
          var _t = getDifference(c, o2[k][i]);
          if (_t)
            p.push(_t);
          return p;
        }, []);
        if (Object.keys(tmp).length > 0)
          diff[k] = tmp;
      } else if (typeof(o1[k]) === "object" && typeof(o2[k]) === "object") {
        tmp = getDifference(o1[k], o2[k]);
        if (tmp && Object.keys(tmp) > 0)
          diff[k] = tmp;
      } else if (o1[k] !== o2[k]) {
        diff[k] = o2[k]
      }
    }
    return diff;
  }

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
    console.log("food", food);
    editFormik.setValues({
      id: food.id,
      name: food.name,
      description: food.description,
      price: food.price,
      discount: food.discount,
      isAvailable: food.isAvailable,
      isPickupOnly: food.isPickupOnly,
      options: food.options,
      size: food.size,
      images: food.images && food.images.length > 0 ? food.images : [{ url: "https://via.placeholder.com/600", alt: "main" }],
    });
  }, [food, restaurantId]);

  useEffect(() => {
    console.log("isLoading", isLoading);
    console.log("isUpdated", isUpdated);
    isLoading === false && isUpdated && onHide();
  }, [isLoading]);

  useEffect(() => {
    console.log("editFormik", editFormik.values);
  }, [editFormik.values]);

  useEffect(() => {
    show && edit && editFormik.setValues({
      name: food.name,
      description: food.description,
      price: food.price,
      discount: food.discount,
      isAvailable: food.isAvailable,
      isPickupOnly: food.isPickupOnly,
      options: food.options,
      size: food.size,
      images: food.images && food.images.length > 0 ? food.images : [{ url: "https://via.placeholder.com/600", alt: "main" }],
    });
  }, [show]);

  return (
    show &&
    (edit ? (
      <FormikProvider value={editFormik}>
        <Modal
          show={show}
          onHide={isLoading ? null : onHide}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <fieldset disabled={isLoading}>
            <Modal.Header closeButton onHide={onHide}>
              <Modal.Title className="col-9 d-flex flex-row offset-1">
                <TextField
                  id="outlined-required"
                  className="col-8"
                  name="name"
                  label="Name"
                  value={editFormik.values.name}
                  variant="outlined"
                  size="small"
                  onChange={editFormik.handleChange}
                  onBlur={editFormik.handleBlur}
                  error={editFormik.touched.name && Boolean(editFormik.errors.name)}
                />
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    fontSize: "0.4rem",
                    marginLeft: "0.5rem",
                    marginRight: "0.5rem",
                  }}
                >
                  {" \u2B24 "}
                </div>
                <FormControl className="col-4">
                  <InputLabel 
                    htmlFor="outlined-adornment-amount" 
                    style={{ 
                      color: 
                        editFormik.touched.options &&
                        Boolean(editFormik.errors.options) ? "#dc3545" : "#767676",
                    }}
                  >
                    Price
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    className={(isLoading ? " textarea-disabled" : "")}
                    value={editFormik.values.price}
                    onChange={editFormik.handleChange}
                    onBlur={editFormik.handleBlur}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Price"
                    size="small"
                    type="number"
                    inputProps={{ min: 0, step: 0.25 }}
                    name="price"
                    error={editFormik.touched.price && Boolean(editFormik.errors.price)}
                  />
                </FormControl>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: "calc(100vh - 350px)", overflowY: "auto" }}>
              <div className="row">
                <div className="col-12">
                  <div className="image-container col-md-10 offset-md-1 d-flex flex-column justify-content-end mb-3">
                    <img
                      className={"image" + (isLoading ? " image-disabled" : "")}
                      src={
                        editFormik.values &&
                        editFormik.values.images &&
                        editFormik.values.images.length > 0
                          ? editFormik.values.images.find((i) => i.alt === "main")["url"]
                          : "https://via.placeholder.com/150"
                      }
                      alt="food"
                    />
                    <EditIcon className="image-edit-icon" />
                  </div>
                  <div className="col-10 offset-1 mb-3">
                    <TextField
                      id="outlined-required"
                      className="col-12"
                      label="Image URL"
                      value={editFormik.values.images && editFormik.values.images.length > 0 && editFormik.values.images.find((i) => i.alt === "main")["url"]}
                      variant="outlined"
                      size="small"
                      onChange={editFormik.handleChange}
                      onBlur={editFormik.handleBlur}
                      name={`images[${editFormik.values.images.findIndex((i) => i.alt === "main")}].url`}
                      error={editFormik.touched.images && Boolean(editFormik.errors.images)}
                    />
                  </div>
                  <div className="col-10 offset-1 d-flex flex-column justify-content-end">
                    <TextField 
                      id="outlined-required"
                      className={"col-12" + (isLoading ? " textarea-disabled" : "")}
                      label="Description"
                      value={editFormik.values.description}
                      variant="outlined"
                      size="small"
                      multiline
                      onChange={editFormik.handleChange}
                      onBlur={editFormik.handleBlur}
                      name="description"
                      error={editFormik.touched.description && Boolean(editFormik.errors.description)}
                    />
                    {editFormik.values.options.length > 0 ? (
                      <div className="col-12 mt-3">
                        {editFormik.values.options.map((optionMain, indexMain) => {
                          return (
                            <div key={indexMain} 
                              className="col-12 option-group"
                              style={{
                                borderColor: "#767676",
                              }}
                            >
                              <OptionControls
                                addLabel={"New Group Option"}
                                removeLabel={"Remove Group Option"}
                                useFormik={editFormik}
                                indexMain={indexMain}
                                setFieldValue={editFormik.setFieldValue}
                              />
                              <TextField
                                id="outlined-required"
                                className="col-12"
                                label="Option Title"
                                value={optionMain.name}
                                variant="outlined"
                                size="small"
                                onChange={editFormik.handleChange}
                                onBlur={editFormik.handleBlur}
                                name={`options[${indexMain}].name`}
                                error={
                                  editFormik.touched.options && 
                                  editFormik.touched.options[indexMain] && 
                                  editFormik.touched.options[indexMain].name && 
                                  Boolean(
                                    editFormik.errors.options && 
                                    editFormik.errors.options[indexMain] &&
                                    editFormik.errors.options[indexMain].name
                                  )
                                }
                              />
                              {optionMain.options.map((optionSub, indexSub) => (
                                <div
                                  key={indexMain + "-" + indexSub}
                                  className="col-12 option-group"
                                  style={{
                                    borderColor: "#9c9c9c",
                                  }}
                                >
                                  <OptionControls 
                                    depth={1}
                                    addLabel={"New Sub Option"}
                                    removeLabel={"Remove Sub Option"}
                                    useFormik={editFormik}
                                    indexSub={indexSub}
                                    indexMain={indexMain}
                                    setFieldValue={editFormik.setFieldValue}
                                  />
                                  <TextField
                                    id="outlined-required"
                                    className="col-11"
                                    style={{ marginLeft: "8.333333%" }}
                                    label="Option Subtitle"
                                    value={optionSub.name}
                                    variant="outlined"
                                    size="small"
                                    onChange={editFormik.handleChange}
                                    onBlur={editFormik.handleBlur}
                                    name={`options[${indexMain}].options[${indexSub}].name`}
                                    error={
                                      editFormik.touched.options &&
                                      editFormik.touched.options[indexMain] &&
                                      editFormik.touched.options[indexMain].options &&
                                      editFormik.touched.options[indexMain].options[indexSub] &&
                                      editFormik.touched.options[indexMain].options[indexSub].name &&
                                      Boolean(
                                        editFormik.errors.options && 
                                        editFormik.errors.options[indexMain] &&
                                        editFormik.errors.options[indexMain].options &&
                                        editFormik.errors.options[indexMain].options[indexSub] &&
                                        editFormik.errors.options[indexMain].options[indexSub].name
                                      )
                                    }
                                  />
                                  {optionSub.options.map((option, index) => (
                                    <div key={indexMain + "-" + indexSub + "-" + index} className="col-12 option">
                                      <OptionControls 
                                        depth={2} 
                                        className="col-10 offset-2" 
                                        useFormik={editFormik}
                                        indexOption={index}
                                        indexSub={indexSub}
                                        indexMain={indexMain}
                                        />
                                      <div
                                        className="col-12 d-flex flex-row"
                                      >
                                        <TextField
                                          id="outlined-required"
                                          className="col-6"
                                          style={{ marginLeft: "16.666667%" }}
                                          label="Option Name"
                                          value={option.name}
                                          variant="outlined"
                                          size="small"
                                          onChange={editFormik.handleChange}
                                          onBlur={editFormik.handleBlur}
                                          name={`options[${indexMain}].options[${indexSub}].options[${index}].name`}
                                          error={
                                            editFormik.touched.options &&
                                            editFormik.touched.options[indexMain] &&
                                            editFormik.touched.options[indexMain].options &&
                                            editFormik.touched.options[indexMain].options[indexSub] &&
                                            editFormik.touched.options[indexMain].options[indexSub].options &&
                                            editFormik.touched.options[indexMain].options[indexSub].options[index] &&
                                            editFormik.touched.options[indexMain].options[indexSub].options[index].name &&
                                            Boolean(
                                              editFormik.errors.options &&
                                              editFormik.errors.options[indexMain] &&
                                              editFormik.errors.options[indexMain].options &&
                                              editFormik.errors.options[indexMain].options[indexSub] &&
                                              editFormik.errors.options[indexMain].options[indexSub].options &&
                                              editFormik.errors.options[indexMain].options[indexSub].options[index] &&
                                              editFormik.errors.options[indexMain].options[indexSub].options[index].name
                                            )
                                          }
                                        />
                                        <FormControl 
                                          className="col-4"
                                          style={{ paddingLeft: "10px" }}
                                        >
                                          <InputLabel 
                                            htmlFor="outlined-adornment-amount" 
                                            style={{ 
                                              marginLeft: "10px",
                                              color: editFormik.touched.options &&
                                              editFormik.touched.options[indexMain] &&
                                              editFormik.touched.options[indexMain].options &&
                                              editFormik.touched.options[indexMain].options[indexSub] &&
                                              editFormik.touched.options[indexMain].options[indexSub].options &&
                                              editFormik.touched.options[indexMain].options[indexSub].options[index] &&
                                              editFormik.touched.options[indexMain].options[indexSub].options[index].price &&
                                              Boolean(
                                                editFormik.errors.options &&
                                                editFormik.errors.options[indexMain] &&
                                                editFormik.errors.options[indexMain].options &&
                                                editFormik.errors.options[indexMain].options[indexSub] &&
                                                editFormik.errors.options[indexMain].options[indexSub].options &&
                                                editFormik.errors.options[indexMain].options[indexSub].options[index] &&
                                                editFormik.errors.options[indexMain].options[indexSub].options[index].price
                                              ) ? "#dc3545" : "#767676",
                                            }}
                                          >
                                            Price
                                          </InputLabel>
                                          <OutlinedInput
                                            id="outlined-adornment-amount"
                                            className={(isLoading ? " textarea-disabled" : "")}
                                            value={option.price}
                                            onChange={editFormik.handleChange}
                                            onBlur={editFormik.handleBlur}
                                            startAdornment={
                                              <InputAdornment position="start">
                                                $
                                              </InputAdornment>
                                            }
                                            label="Price"
                                            size="small"
                                            type="number"
                                            inputProps={{ min: 0, step: 0.25 }}
                                            name={`options[${indexMain}].options[${indexSub}].options[${index}].price`}
                                            error={
                                              editFormik.touched.options &&
                                              editFormik.touched.options[indexMain] &&
                                              editFormik.touched.options[indexMain].options &&
                                              editFormik.touched.options[indexMain].options[indexSub] &&
                                              editFormik.touched.options[indexMain].options[indexSub].options &&
                                              editFormik.touched.options[indexMain].options[indexSub].options[index] &&
                                              editFormik.touched.options[indexMain].options[indexSub].options[index].price &&
                                              Boolean(
                                                editFormik.errors.options && 
                                                editFormik.errors.options[indexMain] &&
                                                editFormik.errors.options[indexMain].options &&
                                                editFormik.errors.options[indexMain].options[indexSub] &&
                                                editFormik.errors.options[indexMain].options[indexSub].options &&
                                                editFormik.errors.options[indexMain].options[indexSub].options[index] &&
                                                editFormik.errors.options[indexMain].options[indexSub].options[index].price
                                              )
                                            }
                                          />
                                        </FormControl>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="col-12 mt-3"
                        style={{
                          display: "inline-block",
                          position: "relative",
                        }}
                      >
                        <Divider 
                          className="mt-3 mb-3"
                          style={{
                            backgroundColor: "#767676",
                            opacity: 0.5,
                            height: "2px",
                          }}
                        />
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-disabled">
                              New Group Option
                            </Tooltip>
                          }
                        >
                          <AddCircleOutlineIcon 
                            className="add-icon"
                            style={{
                                position: "absolute",
                                left: "45%",
                                top: "5px",
                                cursor: "pointer",
                                color: "#767676",
                                backgroundColor: "#fff",
                            }}
                            onClick={() => {
                              console.log("add");
                              editFormik.setFieldValue(`options`, [
                                {
                                  name: "",
                                  options: [
                                    {
                                      isOptional: false,
                                      limit: 1,
                                      name: "",
                                      options: [
                                        {
                                          name: "",
                                          price: 0,
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ]);
                            }}
                          />
                        </OverlayTrigger>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="col-12">
                <div className="row">
                  <div className={"col-12 d-flex " + (editFormik.values.id ? "justify-content-between" : "justify-content-end")}>
                    
                    {editFormik.values.id && (
                      <Button
                        variant="danger"
                        onClick={() => {
                          onHide();
                        }}
                        style={{ marginLeft: "10px", width: "100px" }}
                      >
                        Delete
                      </Button>
                    )}
                    <Button
                      variant="primary"
                      onClick={() => {
                        console.log("editFormik", editFormik);
                        editFormik.handleSubmit();
                      }}
                      style={{ marginRight: "10px", width: "100px" }}
                    >
                      {editFormik.values.id ? "Save" : "Add"}
                    </Button>
                      
                  </div>
                </div>
              </div>
            </Modal.Footer>
          </fieldset>
        </Modal>
      </FormikProvider>
    ) : (
      <div>
        <Modal
          show={show}
          onHide={onHide}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="modal"
        >
          <Modal.Header closeButton onHide={onHide}>
            <Modal.Title className="d-flex flex-row">
              <div>{food.name}</div>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  fontSize: "0.4rem",
                  marginLeft: "0.5rem",
                  marginRight: "0.5rem",
                }}
              >
                {" \u2B24 "}
              </div>
              <div>{`$${totalPrice.toFixed(2)}`}</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12">
                <div className="image-container col-md-10 offset-md-1 d-flex flex-column justify-content-end mb-3">
                  <img
                    className="image"
                    src={
                      food.images.length !== 0
                        ? food.images.find((i) => i.alt === "main")["url"]
                        : "https://via.placeholder.com/150"
                    }
                    alt="food"
                  />
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
                            </Typography>
                            {optionMain.options.map((optionSub, indexSub) => (
                              <div key={indexMain + "-" + indexSub}>
                                <Typography
                                  className="option-subtitle"
                                  key={indexMain + "-" + indexSub}
                                  variant="body2"
                                >
                                  {optionSub.name}
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
                                            cartItem.selectedOptions
                                              ? cartItem.selectedOptions.find(
                                                  (opt) =>
                                                    opt.name === option.name &&
                                                    ((opt.price > 0 &&
                                                      option.price < 0) ||
                                                      (opt.price < 0 &&
                                                        option.price > 0))
                                                )
                                              : false
                                          }
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
                                        {option.price > 0 ? "+" : "-"}$
                                        {Math.abs(option.price).toFixed(2)}
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
                  <span style={{ padding: "10px" }}>
                    {cartItem.quantity ? cartItem.quantity : 1}
                  </span>
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
    ))
  );
};

export default FoodCardModal;
