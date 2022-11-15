import './styles.scss';

import React, {
  useEffect,
  useState,
} from 'react';

import { useDispatch } from 'react-redux';

import { capitalize } from '@material-ui/core/utils';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import {
  Button,
  Skeleton,
} from '@mui/material';

import FoodCardModel from '../FoodCardModal';
import Item from './components/Item';

export default function ItemList({ 
  restaurant,
  edit = false,
  inheritWidth = false,
  isLoading = false,
  }) {
  const [item, setItem] = useState();
  const [showFoodCard, setShowFoodCard] = useState(false);
  const [isMenuOrderChanged, setIsMenuOrderChanged] = useState(false);
  const [tempRestaurant, setTempRestaurant] = useState({ ...restaurant });

  const dispatch = useDispatch();

  const DEFAULT_ITEM = {
    restaurantId: restaurant ? restaurant.id : "",
    category: "",
    description: "",
    discount: 0,
    images: [{ url: "https://via.placeholder.com/600", alt: "main" }],
    isAvailable: false,
    isPickupOnly: false,
    name: "",
    options: [],
    price: 0,
    quantity: 1,
    size: "",
  };

  const moveMenuCategory = (index, direction) => {
    const menu = { ...tempRestaurant.menu };
    const tempMenucategory = { ...menu[index] };
    const tempMenucategory2 = { ...menu[index + direction] };
    menu[index] = tempMenucategory2;
    menu[index + direction] = tempMenucategory;
    tempRestaurant.menu = menu;
    if (JSON.stringify(tempRestaurant.menu) !== JSON.stringify(restaurant.menu)) {
      setIsMenuOrderChanged(true);
    } else {
      setIsMenuOrderChanged(false);
    }
    setTempRestaurant({ ...tempRestaurant });
  };
  
  const addNewCategory = () => {
    return (
      <div className="col-md-11 offset-md-1">
        <div className="add-row-container pt-5 pb-5">
          <div 
            className="add-row col-md-4 mt-4" 
            onClick={() => {
              setItem(DEFAULT_ITEM);
              setShowFoodCard(true);
            }}
          >
            <AddCircleOutlineIcon className="add-row-icon" style={{ fontSize: "3rem" }} />
          </div>
        </div>
      </div>
    );
  };

  const getMenuItems = (restaurant) => {
    const menuCategories = Object.values(restaurant.menu).map((categoryObj, index) => {
      const categoryName =
        categoryObj.name.charAt(0).toUpperCase() + categoryObj.name.slice(1);
      const priortizedItems = restaurant.items.filter((item) =>
        Object.values(categoryObj.itemIds).find(
          (itemIdObj) => itemIdObj.id === item.id
        )
      );
      const nonPriortizedItems = restaurant.items.filter(
        (item) =>
          item.category.toLowerCase() === categoryObj.name.toLowerCase() &&
          !Object.values(categoryObj.itemIds).find(
            (itemIdObj) => itemIdObj.id === item.id
          )
      );
      const menuItems = [...priortizedItems, ...nonPriortizedItems];
      return (
        <div className='col-md-12 d-flex flex-row' key={index}>
          {edit && (
            <div className='move-cat col-md-1'>
              <ArrowCircleUpIcon 
                className={'move-cat-icon-up' + (index === 0 ? ' disabled' : '')}
                onClick={() => {
                  if (index > 0) {
                    moveMenuCategory(index, -1);
                  }
                }}
              />
              <ArrowCircleDownIcon 
                className={'move-cat-icon-down' + (index === Object.keys(restaurant.menu).length - 1 ? ' disabled' : '')}
                onClick={() => {
                  if (index < Object.keys(restaurant.menu).length - 1) {
                    moveMenuCategory(index, 1);
                  }
                }}
              />
            </div>
          )}
          <div className={edit ? 'col-md-11' : 'col-md-12'}>
            <div
              className="restaurant.menu-category mt-4 pt-3"
              style={{ minWidth: "400px" }}
            >
              <div className="restaurant.menu-category-title">
                <span style={{ fontSize: "1.15rem", fontWeight: "bold" }}>
                  {categoryName}
                </span>
              </div>
              <div className="col-md-12 d-flex flex-wrap">
                {menuItems.filter((item) => item.status === undefined || item.status !== "BURNED").map((item, index) => {
                  return <Item key={index} item={item} onClick={() => handleItemClick(item)} restaurantId={restaurant.id}/>;
                })}
                {restaurant.items && edit && (
                  <Item
                    item={{
                      id: "",
                      name: "",
                      price: "",
                      description: "",
                      images: [],
                      category: "",
                    }}
                    restaurantId={restaurant.id}
                    onClick={() => {
                      setItem({...DEFAULT_ITEM, category: capitalize(categoryObj.name)});
                      setShowFoodCard(true);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });
    return menuCategories;
  };

  const updateRestaurantMenu = () => {
    dispatch({
      type: "UPDATE_RESTAURANT",
      payload: {
        id: restaurant.id,
        data: {
          menu: tempRestaurant.menu,
        },
      },
    });
  };

  const handleItemClick = (item) => {
    setItem(item);
    setShowFoodCard(true);
  };

  useEffect(() => {
    setTempRestaurant({ ...restaurant });
  }, [restaurant]);
    
  return (
    <div className="col-12">
      {isMenuOrderChanged && (
        <div className="apply-changes-container">
          <Button
            className="cancel-changes-button"
            onClick={() => {
              setTempRestaurant({ ...restaurant });
              setIsMenuOrderChanged(false);
            }}
          >
            Cancel
          </Button>
          <Button
            className="apply-changes-button"
            onClick={() => {
              updateRestaurantMenu();
              setIsMenuOrderChanged(false);
            }}
          >
            Apply Changes
          </Button>
        </div>
      )}
      <div className={inheritWidth ? "col-12" : "col-10 offset-1"}>
          {!isLoading && tempRestaurant && tempRestaurant.items && tempRestaurant.items.length > 0 && tempRestaurant.menu ? (
          <div>
            {edit && addNewCategory()}
            <div className="row">
              <div className="col-md-12">
                {getMenuItems(tempRestaurant)}
              </div>
            </div>
            {edit && addNewCategory()}
          </div>
        ) : (
          <div>
            {edit && (<Skeleton variant="rectangular" width="100%" height="100px" className="mt-3" />)}
            <div className="row">
              <div className="col-md-12 pt-5">
                <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: "25%", marginBottom: "10px" }} />
                <div className="row">
                  <div className="col-md-4 pt-3">
                    <Skeleton variant="rectangular" width="100%" height="150px" />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%", marginTop: "5px" }} />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%", marginTop: "5px" }} />
                  </div>
                  <div className="col-md-4 pt-3">
                  <Skeleton variant="rectangular" width="100%" height="150px" />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%", marginTop: "5px" }} />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%", marginTop: "5px" }} />
                  </div>
                  <div className="col-md-4 pt-3">
                  <Skeleton variant="rectangular" width="100%" height="150px" />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%", marginTop: "5px" }} />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%", marginTop: "5px" }} />
                  </div>
                </div>
              </div>
              <div className="col-md-12 pt-5">
                <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: "25%", marginBottom: "10px" }} />
                <div className="row">
                  <div className="col-md-4 pt-3">
                    <Skeleton variant="rectangular" width="100%" height="150px" />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%", marginTop: "5px" }} />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%", marginTop: "5px" }} />
                  </div>
                  <div className="col-md-4 pt-3">
                  <Skeleton variant="rectangular" width="100%" height="150px" />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%", marginTop: "5px" }} />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%", marginTop: "5px" }} />
                  </div>
                  <div className="col-md-4 pt-3">
                  <Skeleton variant="rectangular" width="100%" height="150px" />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%", marginTop: "5px" }} />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%", marginTop: "5px" }} />
                  </div>
                </div>
              </div>
              <div className="col-md-12 pt-5">
                <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: "25%", marginBottom: "10px" }} />
                <div className="row">
                  <div className="col-md-4 pt-3">
                    <Skeleton variant="rectangular" width="100%" height="150px" />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%", marginTop: "5px" }} />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%", marginTop: "5px" }} />
                  </div>
                  <div className="col-md-4 pt-3">
                  <Skeleton variant="rectangular" width="100%" height="150px" />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%", marginTop: "5px" }} />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%", marginTop: "5px" }} />
                  </div>
                  <div className="col-md-4 pt-3">
                  <Skeleton variant="rectangular" width="100%" height="150px" />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%", marginTop: "5px" }} />
                    <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%", marginTop: "5px" }} />
                  </div>
                </div>
              </div>
            </div>
            {edit && (<Skeleton variant="rectangular" width="100%" height="100px" className="mt-5" />)}
          </div>
        )}
      </div>

      <FoodCardModel
        show={showFoodCard}
        onHide={() => setShowFoodCard(false)}
        food={item || DEFAULT_ITEM}
        restaurant={restaurant}
        edit={edit}
        isLoading={isLoading}
      />

    </div>
  );
};
