import React, { useState } from 'react';

import {
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import { Skeleton } from '@mui/material';

import {
  StoreHoursModal,
} from '../../../pages/Home/components/StoreHoursModal';
import FoodCardModal from '../../FoodCardModal';
import ItemList from '../../ItemList';

export default function RestaurantDetail({ restaurant }) {
  const [favorite, setFavorite] = useState(false);
  const [showStoreHours, setShowStoreHours] = useState(false);
  const [showFoodCardModal, setShowFoodCardModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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

  return (
    <div className="main-content">
      <div>
        {restaurant && restaurant.images.find(i => i.alt === "banner") != undefined ? (
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
          {restaurant && restaurant.name ? (
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
          
          {restaurant && restaurant.id ? (
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

          {restaurant && restaurant.id ? (
            
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
          
          {restaurant && restaurant.id ? (
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
            {restaurant && restaurant.items.length > 0 ? (
              <ItemList restaurant={restaurant} inheritWidth={true} />
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
            storeHours={restaurant ? restaurant.getRestaurantHours() : null}
          />
          
          {restaurant ? (
            <FoodCardModal
              show={showFoodCardModal}
              onHide={() => setShowFoodCardModal(false)}
              restaurantId={restaurant.id}
              food={Object.assign({}, selectedItem)}
            />
          ) : null}
          
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
