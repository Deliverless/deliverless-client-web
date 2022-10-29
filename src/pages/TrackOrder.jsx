import "mapbox-gl/dist/mapbox-gl.css";

import React, { useContext, useEffect, useState } from "react";

import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { Link, useSearchParams } from "react-router-dom";

import { Backdrop, Button, Card, CircularProgress } from "@mui/material";

import { getDirections } from "../lib/api/mapboxapi";
import { RestContext } from "../lib/context/restContext";
import { getOrder, updateOrder } from "../models/order";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Typography } from "@material-ui/core";

function TrackOrderPage() {
  const [order, setOrder] = useState();
  const { rests } = useContext(RestContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState("...loading");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar: loadSnackbar } = useSnackbar();

  const loadingUpdate = (update, variant) => {
    loadSnackbar(update, { variant });
  };

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_APIKEY;
  let map;
  async function getRoute(source, destination) {
    const json = await getDirections(source, destination);
    loadingUpdate("Route calculated", "success");
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
    setLoading(true);
    loadingUpdate("Fetching Order", "info");
    loadingUpdate("Calculating Route", "info");
    let trackOrder = await getOrder(searchParams.get("orderId")).then(
      (_order) => {
        loadingUpdate("Fetched order successfully", "success");
        setOrder(_order);
        setStatus(_order.status);
        console.log()
        return _order;
      }
    );

    trackOrder.restaurant = rests.find((r) => r.id == trackOrder.restaurantId);
    map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [
        trackOrder.restaurant.address.lon,
        trackOrder.restaurant.address.lat,
      ], // starting position [lng, lat]
      zoom: 15, // starting zoom
      projection: "globe", // display the map as a 3D globe
    });
    const marker1 = new mapboxgl.Marker()
      .setLngLat([
        trackOrder.restaurant.address.lon,
        trackOrder.restaurant.address.lat,
      ])
      .addTo(map);

    // Create a default Marker, colored black, rotated 45 degrees.
    const marker2 = new mapboxgl.Marker({ color: "black" })
      .setLngLat([trackOrder.address.lon, trackOrder.address.lat])
      .addTo(map);

    const nav = new mapboxgl.NavigationControl({
      visualizePitch: true,
    });
    map.addControl(nav, "bottom-right");
    map.on("style.load", () => {
      console.log("source", trackOrder.address);
      console.log("destination", trackOrder.restaurant.address);
      getRoute(trackOrder.restaurant.address, trackOrder.address);
      map.setFog({}); // Set the default atmosphere style
    });
    setLoading(false);
  }, []);

  const setStatusHandler = (_status) => {
    setLoading(true);
    loadingUpdate("Setting status to " + _status, "info");
    updateOrder(order.id, { status: _status }).then((o) => {
      loadingUpdate("Status set successfully", "success");
      setStatus(_status);
      setLoading(false);
      console.log("order updated status", o);
    });
  };

  return (
    <>
      <div class="d-flex" style={{flexWrap: "wrap"}}>
        <Card style={{padding:"10px", margin: "10px"}}>
          <Typography>  Status: {status}</Typography>
         
          {(status == "FoodReady" || status == "Pending") && (
            <Button
              onClick={() => setStatusHandler("OnRoute")}
              variant="contained"
            >
              OnRoute
            </Button>
          )}
          {status == "OnRoute" && (
            <Button
              onClick={() => setStatusHandler("Delivered")}
              variant="contained"
            >
              Delivered
            </Button>
          )}
          {status == "Delivered" && <p>Order Completed</p>}
          </Card>
   
        <Card style={{padding:"10px", margin: "10px"}}>
          <Typography> Calculated Delivery Route:</Typography>
          <Button
          target="_blank"
          href={`https://www.google.com/maps/dir/Current+Location/${order?.restaurant?.address.street +" "+ order?.restaurant?.address.local +" "+ order?.restaurant?.address.region +" "+ order?.restaurant?.address.country}/${order?.address.formatted}`}
        >
          Open on Google Maps
        </Button>
        </Card>
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

export default function TrackOrder() {
  return (
    <SnackbarProvider maxSnack={3}>
      <TrackOrderPage />
    </SnackbarProvider>
  );
}
