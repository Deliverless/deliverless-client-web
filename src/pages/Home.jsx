import React, { useState, useEffect, useContext } from "react";
import RestaurantCards from "../components/RestaurantCards";
import Toggle from '../components/Toggle'
import { retrieveAllRestaurants } from "../smartcontracts/entities/restaurant";
import RestaurantExplorer from "../components/RestaurantExplorer";
import RestaurantAutoComplete from "../components/RestaurantAutoComplete";

const Home = () => {
  const [listView, setListView] = useState(true);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(async () => {
    retrieveAllRestaurants().then(async (rests) => {
      let parsedRests = rests.map((rest) => {
        rest.data.asset_id = rest.id;
        return rest.data;
      });
      console.log(parsedRests)
      setRestaurants(parsedRests);

    });
  }, []);

  return (
    <div className="main-content">
      <h1 className="center-container">Explore Restaurants</h1>
      <h4 className="center-container">In the Blockchain near you</h4>
      <RestaurantAutoComplete />
      <Toggle checked={listView} onChange={setListView}/>

      {(listView && restaurants.length > 0) && (
        <RestaurantCards restaurants={restaurants} />
      )}

      {!listView && (
        <RestaurantExplorer restaurants={restaurants}/>
      )}

    </div>
  );
};

export default Home;
