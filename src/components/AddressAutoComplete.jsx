import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import parse from 'autosuggest-highlight/parse';
import debounce from 'lodash.debounce';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Autocomplete } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { getAutoComplete } from '../lib/api/addressapi';

const AddressAutoComplete = ({init={formatted:""}, setAddress, params, label = "Enter Address"}) => {
    const [value, setValue] = useState(init);
    const [inputValue, setInputValue] = useState(init.formatted);
    const [options, setOptions] = useState([]);
    const inputRef = useRef();
    inputRef.current = inputValue;

    const fetchData = useCallback(debounce(() => {
        if (inputRef.current === '') return
        getAutoComplete(inputRef.current, params)
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
            setAddress(newValue)
            setValue(newValue);
          }}
        
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label={label} fullWidth />
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
  )
}

export default AddressAutoComplete;
