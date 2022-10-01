import React, { useEffect, useCallback, useRef, useState } from "react";
import { getRestaurants } from '../models/restaurant'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Autocomplete } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import Cookies from "universal-cookie";
import debounce from "lodash.debounce";

export default function RestaurantAutoComplete() {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const inputRef = useRef();
  inputRef.current = inputValue;

    useEffect(async ()=>{
        await getRestaurants().then(async (rests) => {
          setOptions(rests.map((rest) => (
            {
              label: rest.name, 
              id: rest.id
            })));
        });
    }, [])

  return (
    <div style={{ display: "inline-block", width: "100%" }}>
      <FormControl className="form-inline" sx={{ maxWidth: "100%" }}>
        <Box className="form-group mr-4" sx={{ alignItems: "flex-end" }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Where do you want to eat?" />}
          />
        </Box>
      </FormControl>
    </div>
  );
}
