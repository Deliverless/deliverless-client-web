import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import { useDispatch } from 'react-redux';

import {
  Button,
  Skeleton,
} from '@mui/material';

import RestaurantCards from '../../../components/RestaurantCards';
import RestaurantExplorer from '../../../components/RestaurantExplorer';
import Toggle from '../../../components/Toggle';
import { RestContext } from '../../../lib/context/restContext';
import SyncScreen from '../../../lib/layout/SyncScreen';

const DEFAULT_CUISINES = [
  'All',
  'American',
  'Asian',
  'Barbecue',
  'Burgers',
  'Chinese',
  'Dessert',
  'Fast Food',
  'French',
  'Greek',
  'Indian',
  'Italian',
  'Japanese',
  'Korean',
  'Mediterranean',
  'Mexican',
  'Pizza',
  'Seafood',
  'Thai',
  'Vietnamese',
];

export default function RestaurantList({ history, restaurantList, isSyncing }) {
  const [filteredRestaurantList, setFilteredRestaurantList] = useState([]);
  const [listView, setListView] = useState(true);
  const [cusinieList, setCusinieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { rests, setRests} = useContext(RestContext);

  const dispatch = useDispatch();

  const filterRestaurants = (cuisine) => {
    if (cuisine === 'All') {
      setFilteredRestaurantList(restaurantList);
    } else {
      const filteredList = restaurantList.filter((restaurant) => restaurant.cuisine === cuisine);
      setFilteredRestaurantList(filteredList);
    }
  };

  // const initializeRestaurantList = async () => {
  //   if (restaurantList.length === 0) {
  //     dispatch({ type: 'GET_RESTAURANTS' });
  //   }
  // };

  const initializeCusinieList = () => {
    const cusinieList = DEFAULT_CUISINES.map((cuisine) => {
      const disabled = cuisine === 'All' ? false : restaurantList.filter((restaurant) => restaurant.cuisine === cuisine).length === 0;
      return {
        label: cuisine,
        value: cuisine,
        disabled,
      };
    });
    setCusinieList(cusinieList);
  };

  useEffect(() => {
    dispatch({ type: 'GET_RESTAURANTS' });
  }, [cusinieList]);

  useEffect(() => {
    // restaurantList.length === 0 && initializeRestaurantList();
    if (restaurantList.length > 0) {
      initializeCusinieList();
      setRests(restaurantList);
      setFilteredRestaurantList(restaurantList);
    }
  }, [restaurantList]);

  return (
    <div className="main-content">
      <SyncScreen isSyncing={isSyncing} />
      <div className="cusinie-list masked-overflow col-12">
        {cusinieList.length > 0 ? (
          cusinieList.map((cusinie) => (
          <Button
            key={cusinie.value}
            // style={{ backgroundColor: cusinie.disabled ? 'grey' : 'white', color: cusinie.disabled ? 'white' : 'black', opacity: cusinie.disabled ? 0.15 : 1 }}
            className="cusinie-button col-1"
            disabled={cusinie.disabled}
            onClick={() => {
              filterRestaurants(cusinie.value);
            }}
          >
            {cusinie.label}
          </Button>
        ))
        ) : (
          <>
          {Array.from(Array(20).keys()).map((index) => (
            <div key={'cusinie' + index}>
              <Skeleton variant="rounded" width={100} height={30} style={{ margin: '0 5px 10px 5px', minWidth: '100px', borderRadius: '20px' }} />
            </div>
          ))}
          </>
        )}
      </div>
          
      {/* <RestaurantAutoComplete /> */}
      <div className="col-12">
          <div className="col-11 d-flex justify-content-end">
            <Toggle checked={listView} onChange={setListView}/>
          </div>
      </div>

      <div className="col-12">
        
        <div className="col-3">
          <div style={{ backgroundColor: 'grey', height: '100%', minWidth: '100%' }} />
        </div>

        {listView ? (
          <RestaurantCards restaurants={filteredRestaurantList} />
        ) : (
          <RestaurantExplorer restaurants={filteredRestaurantList} />
        )}

      </div>

    </div>
  );
};

