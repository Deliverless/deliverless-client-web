import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  getRestaurantById,
  getRestaurantByName,
  getRestaurants,
} from '../../../models/restaurant';

const RestaurantsContext = createContext();

export function useRestaurantsContext() {
  return useContext(RestaurantsContext);
}

export const RestaurantsConsumer = RestaurantsContext.Provider;

export function RestaurantsContextProvider({restaurantsUIEvents, children}) {
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    console.log("fetching restaurants");
    const res_restaurants = await getRestaurants();
    setRestaurants(res_restaurants);
  };

  const fetchRestaurantById = async (id) => {
    console.log("fetching restaurant by id");
    if (restaurants.length === 0 || !restaurants.find(r => r.id === id)) {
      const res_restaurant = await getRestaurantById(id);
      setRestaurants([...restaurants, res_restaurant]);
      return res_restaurant;
    }
    return restaurants.find(r => r.id === id);
  };

  const fetchRestaurantByTitle = async (title) => {
    console.log("fetching restaurant by title");
    if (restaurants.length === 0 || !restaurants.find(r => r.name === title)) {
      const res_restaurant = await getRestaurantByName(title);
      setRestaurants([...restaurants, res_restaurant]);
      return res_restaurant;
    }
    return restaurants.find(r => r.name === title);
  };

  useEffect(() => {
    restaurantsUIEvents.refetch && fetchRestaurants();
    restaurantsUIEvents.setRefetch(false);
  }, [restaurantsUIEvents]);

  const restaurantsContext = {
    restaurantsUIEvents,
    useStates: {
      restaurants,
      setRestaurants,
    },
    functions: {
      fetchRestaurants,
      fetchRestaurantById,
      fetchRestaurantByTitle,
    },
  }

  return (
    <RestaurantsContext.Provider value={restaurantsContext}>
      {children}
    </RestaurantsContext.Provider>
  );
}
