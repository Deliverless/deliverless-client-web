import React, {
  useEffect,
  useState,
} from 'react';

import RestaurantCards from '../../../components/RestaurantCards';
import RestaurantExplorer from '../../../components/RestaurantExplorer';
import Toggle from '../../../components/Toggle';
import { useRestaurantsContext } from './RestaurantsDataContext';

export default function RestaurantList({ history }) {
  const [restaurantList, setRestaurantList] = useState([]);
  const [listView, setListView] = useState(true);
 
  const restaurantContext = useRestaurantsContext();

  useEffect(() => {
    if (restaurantList.length === 0) {
      restaurantContext.restaurantsUIEvents.setRefetch(true);
    }
  }, [restaurantList]);

  useEffect(() => {
    if (restaurantContext.useStates.restaurants) {
      setRestaurantList(restaurantContext.useStates.restaurants);
    }
  }, [restaurantContext.useStates.restaurants]);

  return (
    <div className="main-content">
      <h1 className="center-container">Explore Restaurants</h1>
      <h4 className="center-container">In the Blockchain near you</h4>
      {/* <RestaurantAutoComplete /> */}
      <Toggle checked={listView} onChange={setListView}/>

      {listView ? (
        <RestaurantCards restaurants={restaurantList} />
      ) : (
        <RestaurantExplorer restaurants={restaurantList} />
      )}

    </div>
  );
};

