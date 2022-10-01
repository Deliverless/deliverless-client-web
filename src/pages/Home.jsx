import React, { useState, useEffect, useContext } from "react";
import RestaurantCards from "../components/RestaurantCards";
import Toggle from '../components/Toggle'
import RestaurantExplorer from "../components/RestaurantExplorer";
import RestaurantAutoComplete from "../components/RestaurantAutoComplete";
import { getRestaurants } from "../models/restaurant";
import { RestContext } from "../lib/context/restContext";

const Home = () => {
  const [listView, setListView] = useState(true);
  const { rests, setRests} = useContext(RestContext);
  let restaurants = rests;
  console.log("Rests", rests)
  
  useEffect(async () => {
    getRestaurants()
      .then(async (rests) => {
        console.log(rests)
        setRests(rests);
      }).catch((err)=>{
        console.log(err)
      });
  }, []);

  return (
    <div className="main-content">
      <h1 className="center-container">Explore Restaurants</h1>
      <h4 className="center-container">In the Blockchain near you</h4>
      <RestaurantAutoComplete />
      <Toggle checked={listView} onChange={setListView}/>

      {(listView && restaurants.length > 0) && (
        <RestaurantCards restaurants={rests} />
      )}

      {!listView && (
        <RestaurantExplorer restaurants={rests}/>
      )}

    </div>
  );
};

export default Home;
