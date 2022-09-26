import axios from "axios";
import { getAutoComplete } from "./addressapi";

var url = 'https://api.mapbox.com/directions/v5/mapbox/driving-traffic'

/**
 * 
 * @param {*} Source - an object containing lat and lon coordinate values from source location
 * @param {*} Destination - an object containing lat and lon coordinate values to destination
 * @returns - directions object
 */
export const getDirections = async ({ lat: lat1, lon: lon1 }, { lat: lat2, lon: lon2 }) => {

    return (await axios.get(`${url}/${lon1},${lat1};${lon2},${lat2}/?geometries=geojson&access_token=pk.eyJ1IjoiZ2l0Z2Vlc2UiLCJhIjoiY2w4N2pidjdvMHUxODNwbHQzOWRrNG0yeSJ9.mv0b8GIhqCSaY1GrkUCE9Q`)
        .catch(function (error) {
            console.log(error);
        })
    )?.data;
}