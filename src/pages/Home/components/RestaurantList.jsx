import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  Button,
  Skeleton,
} from '@mui/material';

import RestaurantCards from '../../../components/RestaurantCards';
import RestaurantExplorer from '../../../components/RestaurantExplorer';
import Toggle from '../../../components/Toggle';
import { RestContext } from '../../../lib/context/restContext';
import { useRestaurantsContext } from './RestaurantsDataContext';

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

export default function RestaurantList({ history }) {
  const [originalRestaurantList, setOriginalRestaurantList] = useState([]);
  const [filteredRestaurantList, setFilteredRestaurantList] = useState([]);
  const [listView, setListView] = useState(true);
  const [cusinieList, setCusinieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { rests, setRests} = useContext(RestContext);
 
  const restaurantContext = useRestaurantsContext();

  const filterRestaurants = (cuisine) => {
    if (cuisine === 'All') {
      setFilteredRestaurantList(originalRestaurantList);
    } else {
      const filteredList = originalRestaurantList.filter((restaurant) => restaurant.cuisine === cuisine);
      setFilteredRestaurantList(filteredList);
    }
  };

  useEffect(() => {
    if (originalRestaurantList.length === 0) {
      restaurantContext.restaurantsUIEvents.setRefetch(true);
    } else if (originalRestaurantList.length > 0 && cusinieList.length === 0) {
      const cusinieList = DEFAULT_CUISINES.map((cuisine) => {
        const disabled = cuisine === 'All' ? false : originalRestaurantList.filter((restaurant) => restaurant.cuisine === cuisine).length === 0;
        return {
          label: cuisine,
          value: cuisine,
          disabled,
        };
      });
      setCusinieList(cusinieList);
      setIsLoading(false);
    }

  }, [originalRestaurantList]);

  useEffect(() => {
    if (restaurantContext.useStates.originalRestaurantList) {
      setOriginalRestaurantList(restaurantContext.useStates.originalRestaurantList);
    }
  }, [restaurantContext.useStates.originalRestaurantList]);

  useEffect(() => {
    console.log('cusinieList', cusinieList);
  }, [cusinieList]);

  useEffect(() => {
    originalRestaurantList && setRests(originalRestaurantList);
    setFilteredRestaurantList(restaurantContext.useStates.originalRestaurantList);
  }, [originalRestaurantList]);

  return (
    <div className="main-content">
      <div className="cusinie-list masked-overflow col-12">
        {cusinieList.length > 0 ? (
          cusinieList.map((cusinie) => (
          <Button
            key={cusinie}
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
          <RestaurantCards restaurants={filteredRestaurantList} isLoading={isLoading} />
        ) : (
          <RestaurantExplorer restaurants={filteredRestaurantList} />
        )}

      </div>

    </div>
  );
};

