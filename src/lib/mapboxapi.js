import axios from "axios";
import { getAutoComplete } from "./addressapi";

var url = 'https://api.mapbox.com/directions/v5/mapbox/driving-traffic'

export const getDirections = async (Source, Destination) => {

    let { lat: lat1, lon: long1 } = (await getAutoComplete(Source))?.results[0]
    let { lat: lat2, lon: long2 } = (await getAutoComplete(Destination))?.results[0]

    return (await axios.get(`${url}/${long1},${lat1};${long2},${lat2}/?geometries=geojson&access_token=pk.eyJ1IjoiZ2l0Z2Vlc2UiLCJhIjoiY2w4N2pidjdvMHUxODNwbHQzOWRrNG0yeSJ9.mv0b8GIhqCSaY1GrkUCE9Q`)
        .catch(function (error) {
            console.log(error);
        })
    ).data;
}