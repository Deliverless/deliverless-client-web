import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { Autocomplete } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import { requestRestaurants } from '../models/restaurant';

export default function RestaurantAutoComplete() {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const inputRef = useRef();
  inputRef.current = inputValue;

    useEffect(async ()=>{
        await requestRestaurants().then(async (rests) => {
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
