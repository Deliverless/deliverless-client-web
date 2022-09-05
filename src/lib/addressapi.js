import axios from "axios";

var url = 'https://api.geoapify.com/v1/geocode/autocomplete'

export const getAutoComplete = async (search) => {
  // var url = new URL(config.url)
  // url.searchParams.append('text', search)
  // url.searchParams.append('filter', "countrycode:ca")
  // url.searchParams.append('apiKey', "28f19dd4b3c94686a6c11176896a683c")
  return (await axios.get(`${url}?text=${search}&lang=en&limit=10&filter=countrycode:ca&format=json&apiKey=28f19dd4b3c94686a6c11176896a683c`)
    .catch(function (error) {
      console.log(error);
    })
  ).data;
}