import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  getRestaurantById,
  getRestaurantByName,
  getRestaurants,
} from '../../../models/restaurant';
import { setRestaurants } from '../_redux/restaurantsRedux';

const RestaurantsContext = createContext();

export function useRestaurantsContext() {
  return useContext(RestaurantsContext);
}

export const RestaurantsConsumer = RestaurantsContext.Provider;

export function RestaurantsContextProvider({restaurantsUIEvents, children}) {
  const [originalRestaurantList, setOriginalRestaurantList] = useState([]);

  const { stateRestaurantList } = useSelector((state) => {
    return {
      stateRestaurantList: state.restaurants.list,
    };
  });
  const dispatch = useDispatch();

  const fetchRestaurants = async () => {
    const res_restaurants = await getRestaurants();
    dispatch(setRestaurants(res_restaurants));
    // setOriginalRestaurantList(res_restaurants);
  };

  const fetchRestaurantById = async (id) => {
    console.log("fetching restaurant by id");
    if (originalRestaurantList.length === 0 || !originalRestaurantList.find(r => r.id === id)) {
      const res_restaurant = await getRestaurantById(id);
      setOriginalRestaurantList([...originalRestaurantList, res_restaurant]);
      return res_restaurant;
    }
    return originalRestaurantList.find(r => r.id === id);
  };

  const fetchRestaurantByTitle = async (title) => {
    console.log("fetching restaurant by title");
    if (originalRestaurantList.length === 0 || !originalRestaurantList.find(r => r.name === title)) {
      const res_restaurant = await getRestaurantByName(title);
      setOriginalRestaurantList([...originalRestaurantList, res_restaurant]);
      return res_restaurant;
    }
    return originalRestaurantList.find(r => r.name === title);
  };

  const syncRestaurants = async () => {
    const res_restaurants = await getRestaurants();
    dispatch(setRestaurants(res_restaurants));
    restaurantsUIEvents.setRefetch(false);
  };

  useEffect(() => {
    restaurantsUIEvents.refetch && syncRestaurants();
  }, [restaurantsUIEvents]);

  useEffect(() => {
    stateRestaurantList && setOriginalRestaurantList(stateRestaurantList);
  }, [stateRestaurantList]);

  const restaurantsContext = {
    restaurantsUIEvents,
    useStates: {
      originalRestaurantList,
      setOriginalRestaurantList,
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
