import '../styles.scss';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import { Skeleton } from '@mui/material';

import FoodCardModal from '../../../components/FoodCardModal';
import Restaurant from '../../../models/restaurant';
import { useRestaurantsContext } from './RestaurantsDataContext';
import { StoreHoursModal } from './StoreHoursModal';

export default function RestaurantDetail({ history }) {
  const [isLoading, setIsLoading] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [showStoreHours, setShowStoreHours] = useState(false);
  const [restaurant, setRestaurant] = useState(new Restaurant());
  const { restaurantName: restaurantName } = useParams();
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const [showFoodCardModal, setShowFoodCardModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const restaurantContext = useRestaurantsContext();

  const initRestaurant = async () => {
    setIsLoading(true);
    console.log("initRestaurant");
    let res_restaurant = restaurantContext.useStates.restaurants.find(r => r.name === restaurantName);
    if (!res_restaurant) {
      res_restaurant = await restaurantContext.functions.fetchRestaurantByTitle(restaurantName);
    }
    console.log("res_restaurant", res_restaurant);
    const new_restaurant = new Restaurant();
    new_restaurant.initJson(res_restaurant);
    setRestaurant(new_restaurant);
    setIsLoading(false);
  };

  const fetchRestaurantItems = async () => {
    let updatedRestaurant = restaurant;
    const res_items = await restaurant.fetchItems();
    updatedRestaurant.items = res_items;
    updatedRestaurant.itemIds = res_items.map(i => i.id); 
    setRestaurant(updatedRestaurant);
    setIsLoading(false);
    setItemsLoaded(true);
  };

  const getPriceIndexSymbol = (priceIndex) => {
    switch (priceIndex) {
      case 0:
        return "$";
      case 1:
        return "$$";
      case 2:
        return "$$$";
      case 3:
        return "$$$$";
      default:
        return "$";
    }
  };

  const getHoursFormattedString = () => {
    const currentDay = new Date().getDay();
    const restaurantHours = restaurant.getRestaurantHours();

    return restaurantHours[currentDay].isOpen ? 
      (
        `Open ${restaurantHours[currentDay].openingTime} - ${restaurantHours[currentDay].closingTime}`
      ) : (
        `Closed - Opens at ${restaurantHours[currentDay === 6 ? 0 : currentDay].openingTime} until ${restaurantHours[currentDay === 6 ? 0 : currentDay].closingTime}`
      );
  };

  const getMenuItems = () => {
    const menuCategories = Object.values(restaurant.menu).map((categoryObj, index) => {
      const categoryName = categoryObj.name.charAt(0).toUpperCase() + categoryObj.name.slice(1);
      const priortizedItems = Object.values(restaurant.items).filter(item => Object.values(categoryObj.itemIds).find(itemIdObj => itemIdObj.id === item.id));
      const nonPriortizedItems = Object.values(restaurant.items).filter(item => item.category.toLowerCase() === categoryObj.name.toLowerCase() && !Object.values(categoryObj.itemIds).find(itemIdObj => itemIdObj.id === item.id));
      const items = [...priortizedItems, ...nonPriortizedItems];
      return (
        <div key={index} className="menu-category mt-4" style={{ minWidth: "400px" }}>
          <div className="menu-category-title">
            <span style={{ fontSize: "1.15rem", fontWeight: "bold" }}>{categoryName}</span>
          </div>
          <div 
            className="menu-items col-md-12 d-flex flex-wrap"
            
          >
            {items.map((item, index) => {
              const itemImageObj = item.images.length > 0 ? item.images[0] : "https://via.placeholder.com/150"
              return (
                <a 
                  key={index} 
                  className="menu-item col-sm-6 col-md-4 col-lg-3 m-4"
                  style={{ maxWidth: "200px", textDecoration: "none", color: "black", maxWidth: "200px", maxHeight: "150px" }} 
                  href="#"
                  onClick={() => {
                    setSelectedItem(Object.assign({}, item));
                    setShowFoodCardModal(true);
                  }}
                >
                  <img src={itemImageObj.url} alt={itemImageObj.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div className="menu-item-title row">
                    <span style={{ fontSize: "0.8rem" }}>{item.name}</span>
                    <span 
                      style={{ fontSize: "0.7rem", color: "grey" }}
                      >
                      {`$${item.price}`}
                    </span>
                  </div>
                  <p>{item.description}</p>
                </a>
              );
            })}
          </div>
        </div>
      );
    });
    return menuCategories;
  };

  useEffect(() => {
    !restaurant.id && initRestaurant();
    restaurant.id && restaurant.items.length === 0 && fetchRestaurantItems();
  }, [restaurant]);
  
  // while is loading, show lazy loading

  return (
    <div className="main-content">
      <div>
        {restaurant.images.find(i => i.alt === "banner") != undefined ? (
          <img
            src={restaurant.images.find(i => i.alt === "banner")['url']}
            style={{ maxHeight: "150px", width: "100%", minWidth: "500px", objectFit: "cover" }} 
            alt="banner"
          />
        ) : (
          <Skeleton variant="rectangular" width="100%" height="150px" />
        )}
         
      </div>

      <div className="col-md-12">
        <div 
          className="col-sm-10 col-md-10 offset-sm-1 offset-md-1 pt-3"
          style={{ minWidth: "500px" }}
        >
          {restaurant.name ? (
            <div className="col-md-12 m-0 row">
              <h3 className="col-md-10 p-0" style={{ fontWeight: "bold" }}>{restaurant.name}</h3>
              <div className="col-md-2 p-0 d-flex justify-content-end">
                {favorite ? (
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Remove from favorites
                      </Tooltip>
                    }
                  >
                    <Button
                      style={{ borderColor: "black", backgroundColor: "white", color: "black", borderRadius: "50%", paddingLeft: "10px", paddingRight: "10px" }}
                      onClick={() => setFavorite(false)}
                    >
                      <FavoriteIcon style={{ fontSize: "20px" }} />
                    </Button>
                  </OverlayTrigger>
                ) : (
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Add to favorites
                      </Tooltip>
                    }
                  >
                    <Button
                      style={{ borderColor: "black", backgroundColor: "white", color: "black", borderRadius: "50%", paddingLeft: "10px", paddingRight: "10px" }}
                      onClick={() => setFavorite(true)}
                    >
                      <FavoriteBorderIcon style={{ fontSize: "20px" }} />
                    </Button>
                  </OverlayTrigger>
                )}
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="tooltip-top">
                      Show Store Hours
                    </Tooltip>
                  }
                >
                  <Button
                    style={{ borderColor: "black", backgroundColor: "white", color: "black", borderRadius: "50%", paddingLeft: "10px", paddingRight: "10px", paddingTop: "3px", marginLeft: "5px" }}
                    onClick={() => setShowStoreHours(true)}
                  >
                    <AccessTimeIcon style={{ fontSize: "20px" }} />
                  </Button>
                </OverlayTrigger>
              </div>
            </div>
          ) : (
            <div className="col-md-12 m-0 row">
              <div className="col-md-10 p-0">
                <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: "25%" }} />
              </div>
              <div className="col-md-2 p-0 d-flex justify-content-end">
                <Skeleton variant="circular" width="40px" height="40px" />
                <Skeleton variant="circular" width="40px" height="40px" style={{ marginLeft: "5px" }} />
              </div>
            </div>
          )}
          
          {restaurant.id ? (
            <div className="subtitle" col>
              <StarIcon className="star-icon" style={{ fontSize: "1.5rem", marginRight: "5px" }} />
              {restaurant.rating ? `${restaurant.rating} (${restaurant.reviews.length} ratings)` : "No ratings"}
              <div className="bullet p-2" > {' \u2B24 '} </div>
              {restaurant.cuisine ? restaurant.cuisine : "No cuisine"}
              <div className="bullet p-2" > {' \u2B24 '} </div>
              {restaurant.getPriceIndex() ? (
                <span>
                  {getPriceIndexSymbol(restaurant.getPriceIndex())}
                </span>
              ) : (
                "No price index"
              )}
            </div>
          ) : (
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "50%", marginTop: "10px" }} />
          )}

          {restaurant.id ? (
            
                <div 
                  col className="subtitle" 
                  style={{ fontSize: "0.75rem", color: "#666666", marginTop: "10px" }}
                >
                  {restaurant.address ? (
                    restaurant.address.street + ", " + restaurant.address.local + ", " + restaurant.address.region + " " + restaurant.address.postal
                  ) : (
                    "No address"
                  )}
                
              
            </div>
          ) : (
            <Skeleton variant="text" sx={{ fontSize: "0.75rem", width: "40%", marginTop: "10px" }} />
          )}
          
          {restaurant.id ? (
            <div className="col-md-12 m-0 row">
              <div className="col-md-8 p-0">
                <div
                  col className="subtitle text-"
                  style={{ fontSize: "0.75rem", color: "#666666", marginTop: "10px" }}
                >
                  {restaurant.hours != "" ? (
                    <a style={{ textDecoration: "none", color: "#666666" }} onClick={() => setShowStoreHours(true)}>
                      {getHoursFormattedString()}
                    </a>
                  ) : (
                    "No hours"
                  )}
                </div>
              </div>
              <div className="col-md-4 p-0 d-flex justify-content-end">
                  <span className="subtitle" style={{ fontSize: "0.75rem", color: "#666666", marginTop: "10px" }}>
                    Delivery Est. {restaurant.deliveryEstimate ? restaurant.deliveryEstimate : "(No estimate)"}
                  </span>
                </div>
            </div>
          ) : (
            <div className="col-md-12 m-0 row">
              <div className="col-md-8 p-0">
                <Skeleton variant="text" sx={{ fontSize: "0.75rem", width: "15%", marginTop: "10px" }} />
              </div>
              <div className="col-md-4 p-0 d-flex justify-content-end">
                <Skeleton variant="text" sx={{ fontSize: "0.75rem", width: "50%", marginTop: "10px" }} />
              </div>
            </div>
          )}
          {/* restaurant && restaurant.items.length > 0 ? ( */}
          <div>
            {restaurant && itemsLoaded > 0 ? (
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    {getMenuItems()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-12 pt-5">
                  <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: "25%", marginBottom: "10px" }} />
                  <div className="row">
                    <div className="col-md-4">
                      <Skeleton variant="rectangular" width="100%" height="150px" />
                      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%", marginTop: "5px" }} />
                      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%", marginTop: "5px" }} />
                    </div>
                    <div className="col-md-4">
                    <Skeleton variant="rectangular" width="100%" height="150px" />
                      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%", marginTop: "5px" }} />
                      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%", marginTop: "5px" }} />
                    </div>
                    <div className="col-md-4">
                    <Skeleton variant="rectangular" width="100%" height="150px" />
                      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%", marginTop: "5px" }} />
                      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%", marginTop: "5px" }} />
                    </div>
                  </div>
                </div>
                <div className="col-md-12 pt-5">
                  <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: "25%", marginBottom: "10px" }} />
                  <div className="row">
                    <div className="col-md-4">
                      <Skeleton variant="rectangular" width="100%" height="150px" />
                      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%", marginTop: "5px" }} />
                      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%", marginTop: "5px" }} />
                    </div>
                    <div className="col-md-4">
                    <Skeleton variant="rectangular" width="100%" height="150px" />
                      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%", marginTop: "5px" }} />
                      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%", marginTop: "5px" }} />
                    </div>
                    <div className="col-md-4">
                    <Skeleton variant="rectangular" width="100%" height="150px" />
                      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%", marginTop: "5px" }} />
                      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%", marginTop: "5px" }} />
                    </div>
                  </div>
                </div>
                <div className="col-md-12 pt-5">
                  <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: "25%", marginBottom: "10px" }} />
                  <div className="row">
                    <div className="col-md-4">
                      <Skeleton variant="rectangular" width="100%" height="150px" />
                      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%", marginTop: "5px" }} />
                      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%", marginTop: "5px" }} />
                    </div>
                    <div className="col-md-4">
                    <Skeleton variant="rectangular" width="100%" height="150px" />
                      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%", marginTop: "5px" }} />
                      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%", marginTop: "5px" }} />
                    </div>
                    <div className="col-md-4">
                    <Skeleton variant="rectangular" width="100%" height="150px" />
                      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%", marginTop: "5px" }} />
                      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%", marginTop: "5px" }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <StoreHoursModal
            show={showStoreHours}
            onHide={() => setShowStoreHours(false)}
            storeHours={restaurant.getRestaurantHours()}
          />

          <FoodCardModal
            show={showFoodCardModal}
            onHide={() => setShowFoodCardModal(false)}
            restaurantId={restaurant.id}
            food={Object.assign({}, selectedItem)}
          />
          
          {/* <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://picsum.photos/800/400?random=1"
                alt="First slide"
              />
              <Carousel.Caption>
                <h5>First slide label</h5>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://picsum.photos/800/400?random=2"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h5>Second slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://picsum.photos/800/400?random=3"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h5>Third slide label</h5>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel> */}
        </div>
      </div>
      
      {/* <Routes>
        <Route path={`/restaurants/${restaurantName}/hours`}>
          {({ history, match }) => (
            <StoreHoursModal
              show={match !== null}
              onHide={() => history.push({ pathname: `/restaurants/${restaurantName}` })}
              storeHours={getDailyOpenCloseTime()}
            />
          )}
        </Route>
      </Routes> */}



    </div>
  );
}
