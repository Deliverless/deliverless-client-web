import './styles.scss';

import React from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { Skeleton } from '@mui/material';

import FoodCardModel from '../FoodCardModal';
import Item from './components/Item';

export default function ItemList({ 
  history,
  restaurant,
  edit = false,
  inheritWidth = false,
  isLoading = false,
  }) {
  const [item, setItem] = React.useState();
  const [showFoodCard, setShowFoodCard] = React.useState(false);

  const DEFAULT_ITEM = {
    id: "",
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

  const getMenuItems = () => {
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
              <ArrowCircleUpIcon className='move-cat-icon-up' />
              <ArrowCircleDownIcon className='move-cat-icon-down' />
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
              <div className="restaurant.menu-restaurant.items col-md-12 d-flex flex-wrap">
                {menuItems.map((item, index) => {
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
                      setItem(DEFAULT_ITEM);
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

  const handleItemClick = (item) => {
    setItem(item);
    setShowFoodCard(true);
  };

  return (
    <div className="col-12">
      <div className={inheritWidth ? "col-12" : "col-10 offset-1"}>
        {edit && (
          addNewCategory()
        )}
        {restaurant && restaurant.items && restaurant.menu ? (
          <div className="row">
            <div className="col-md-12">
              {getMenuItems()}
            </div>
          </div>
        ) : (
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
        )}
        {edit && (
          addNewCategory()
        )}
      </div>

      <FoodCardModel
        show={showFoodCard}
        onHide={() => setShowFoodCard(false)}
        food={item || DEFAULT_ITEM}
        restaurantId={restaurant ? restaurant.id : ""}
        edit={edit}
        isLoading={isLoading}
      />

    </div>
  );
};
