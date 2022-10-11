import axios from "axios";
// import * as dotenv from 'dotenv'
// dotenv.config()

var url = 'https://api.geoapify.com/v1/geocode/autocomplete'

export const getAutoComplete = async (search, params = "") => {

  return (await axios.get(`${url}?text=${search}&lang=en&limit=10&filter=countrycode:ca&format=json${params}&apiKey=${process.env.REACT_APP_GEOCODE_APIKEY}`)
    .catch(function (error) {
      console.log(error);
    })
  ).data;
}