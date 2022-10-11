import React, { useEffect, useState, useContext } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { getDirections } from "../lib/api/mapboxapi";
import { getOrder, updateOrder } from "../models/order";
import { RestContext } from "../lib/context/restContext";
import { useSearchParams } from "react-router-dom";
import { Backdrop, Button, CircularProgress } from "@mui/material";

export default function TrackOrder() {
  const [order, setOrder] = useState();
  const { rests } = useContext(RestContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState('...loading');
  const [loading, setLoading] = useState(false);
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_APIKEY;
  let map;
  async function getRoute(source, destination) {
    const json = await getDirections(source, destination);
    console.log("json", json);
    const data = json.routes[0];
    const route = data.geometry.coordinates;
    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };
    // if the route already exists on the map, we'll reset it using setData
    if (map.getSource("route")) {
      map.getSource("route").setData(geojson);
    }
    // otherwise, we'll make a new request
    else {
      console.log("ADDING NEW ROUTE");
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }
    // add turn instructions here at the end
  }

  useEffect(async () => {
    let trackOrder = await getOrder(searchParams.get("orderId")).then(
      (_order) => {
        setOrder(_order);
        setStatus(_order.status)
        return _order;
      }
    );

    trackOrder.restaurant = rests.find((r) => r.id == trackOrder.restaurantId);
    map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [trackOrder.address.lon, trackOrder.address.lat], // starting position [lng, lat]
      zoom: 15, // starting zoom
      projection: "globe", // display the map as a 3D globe
    });
    map.on("style.load", () => {
      console.log("source", trackOrder.address);
      console.log("destination", trackOrder.restaurant.address);
      getRoute(trackOrder.restaurant.address, trackOrder.address);
      map.setFog({}); // Set the default atmosphere style
    });
  }, []);

  const setStatusHandler = (_status) => {
    setLoading(true);
    updateOrder(order.id, { status: _status }).then((o) => {
      setStatus(_status);
      setLoading(false);
      console.log("order updated status", o);
    });
  };

  return (
    <>
      <div style={{ height: "60px" }}>
        <p>Status: {status}</p>
        { status == "Pending" && <Button onClick={()=> setStatusHandler("OnRoute")} variant="contained">OnRoute</Button> } 
        { status == "OnRoute" && <Button onClick={()=> setStatusHandler("Delivered")} variant="contained">Delivered</Button> } 
        { status == "Delivered" && <p>Order Completed</p>}
      </div>
      <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
      </Backdrop>
      <div
        style={{ marginTop: "20px", height: "calc(100vh - 140px)" }}
        id="map"
      ></div>
    </>
  );
}
