import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import parse from 'autosuggest-highlight/parse';
import debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Autocomplete,
  Button,
} from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { getAutoComplete } from '../lib/api/addressapi';

const LandingAddressSet = () => {

  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [isPickup, setIsPickup] = useState(false);
  const inputRef = useRef();
  inputRef.current = inputValue;

  const navigate = useNavigate()

  function useCookieFunc(){
    let cookies = new Cookies(); 
    cookies.set("Address", value)
    console.log("setting pickup", isPickup)
    cookies.set("isPickup", isPickup)
    if(value) navigate('/');
  }

  const fetchData = useCallback(debounce(() => {
        if (inputRef.current === '') return
        getAutoComplete(inputRef.current)
        .then( (results) => {
          setOptions(results.results)
        })
      }, 300), []);

  useEffect( () => {

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }
    fetchData()
  }, [inputValue, fetchData, value])

    return (
      
      <div style={{display: 'inline-block', width:'100%' }}>


        <FormControl className='form-inline' sx={{ maxWidth:'100%' }}>
          <Box  className="form-group mr-4 d-flex" sx={{ alignItems: 'flex-end' }}>
            <Autocomplete
              id="google-map-demo"
              sx={{ width: 300 }}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.formatted
              }
              filterOptions={(x) => x.reverse()}
              options={options}
              autoComplete
              includeInputInList
              isOptionEqualToValue={(option, value) => option.id === value.id}
              value={value}
              onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
              }}
            
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Enter Address" fullWidth />
              )}
              renderOption={(props, option) => {
                const matches = options;
                const parts = parse(
                  option.formatted,
                  matches.map((match) => [match.offset, match.offset + match.length]),
                );

                return (
                  <li {...props}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Box
                          component={LocationOnIcon}
                          sx={{ color: 'text.secondary', mr: 2 }}
                        />
                      </Grid>
                      <Grid item xs>
                        {parts.map((part, index) => (
                          <span
                            key={index}
                            style={{
                              fontWeight: part.highlight ? 700 : 400,
                            }}
                          >
                            {part.text}
                          </span>
                        ))}

                        <Typography variant="body2" color="text.secondary">
                          {option.formatted}
                        </Typography>
                      </Grid>
                    </Grid>
                  </li>
                );
              }}
            />
            <InputLabel></InputLabel>
            <Select
              sx={{ backgroundColor:'white', width: 160 }}
              className="form-group mr-2"
              onChange={(value) => setIsPickup(value.target.value)}
              defaultValue={false}
            >
              <MenuItem selected value={false} >Delivery</MenuItem>
              <MenuItem value={true} >Pickup</MenuItem>
            </Select>
            <Button variant="contained" onClick={useCookieFunc} sx={{height:'56px', backgroundColor:'#2196f3'}}>Find Food</Button>
          </Box>
        </FormControl>
      </div>
    )
}
 
export default LandingAddressSet;