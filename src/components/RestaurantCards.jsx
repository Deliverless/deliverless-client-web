import React, { useEffect } from 'react';

import { Skeleton } from '@mui/material';

import RestaurantCard from './RestaurantCard';

export default function RestaurantCards({ restaurants, isLoading }) {
  // if (isLoading) {
  // 	return (
  // 		<LinearProgress />
  // 	);
  // }
  
  useEffect(() => {
    console.log("restaurants", restaurants);
  }, [restaurants]);

  return (
    <div className="col-12">
      <div className="restaurant-cards col-10 offset-1">
        {isLoading
          ? Array.from(new Array(20).keys()).map((index) => (
						<div style={{ margin: "0 50px 50px 0", minWidth: "300px", minHeight: "160px", borderRadius: "20px" }} key={'card' + index}>
							<Skeleton
								width={300}
								height={160}
								variant="rectangular"
							/>
							<div className="col-12" style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
								<Skeleton
									variant="text"
									width={100}
								/>
								<Skeleton
									variant="circular"
									width={30}
									height={25}
								/>
							</div>
							<Skeleton
								variant="text"
								width={300}
							/>
						</div>
            ))
          : restaurants.map((restaurant) => (
              <RestaurantCard
                // temporary to make keys unique because I added 2 transactions with the same restau id.
                key={restaurant.id + restaurant.name}
                restauId={restaurant.id}
                name={restaurant.name}
                // description={restau.description}
                address={restaurant.address}
                image={
                  restaurant.images.find((image) => image.alt === "main").url
                }
              />
            ))}
      </div>
    </div>

        
    
  );
}
