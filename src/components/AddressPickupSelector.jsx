import * as React from 'react';

import Cookies from 'universal-cookie';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Popper from '@mui/material/Popper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import AddressAutoComplete from './AddressAutoComplete';

export default function AddressPickupSelector() {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    let cookies = new Cookies(); 
    let isPickupCookie = cookies.get('isPickup');
    let addressCookie = cookies.get('Address');

    // console.log("pickup", isPickupCookie)
    const [isPickup, setPickup] = React.useState(isPickupCookie)

    // console.log("address", addressCookie)
    const [address, setAddress] = React.useState();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };
    const handlePickupChange = (event) => {
        // console.log("new pickup", event.target.value)
        if(event.target.value == null) return;
        setPickup(event.target.value);
        cookies.set('isPickup', event.target.value)
    };
    const handleAddressChange = (newVal) =>{
        if(newVal == null) return;
        setAddress(newVal);
        cookies.set('Address', newVal)
    }
    
    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;
  return (
    <>
    { isPickup != null && <>
      <div aria-describedby={id} type="button" onClick={handleClick}  style={{cursor: 'pointer' ,color: 'black', margin: '10px 20px', padding: '10px', borderRadius: '25px', border: '1px solid whitesmoke', background: 'white'}}>
        
       <LocationOnIcon style={{color: 'rgb(51, 51, 51)', marginBottom: '-5px'}}/> <span className="d-none d-md-inline-block"> {`${addressCookie?.housenumber} ${addressCookie?.street}`} | {isPickup == 'true' ? "Pickup" : "Delivery"} </span>
      </div>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box sx={{  borderRadius: '0px 0px 25px 25px', boxShadow: '0px 0px 5px grey', p: 2, bgcolor: "background.paper", marginTop: '10px' }}>
                <AddressAutoComplete init={addressCookie} setAddress={handleAddressChange}/>
                <ToggleButtonGroup
                    color="primary"
                    value={isPickup}
                    exclusive
                    onChange={handlePickupChange}
                    aria-label="Platform"
                    style={{width: '100%'}}
                    >
                    <ToggleButton style={{width: '100%'}} value={'true'}>Pickup</ToggleButton>
                    <ToggleButton style={{width: '100%'}} value={'false'}>Delivery</ToggleButton>
                </ToggleButtonGroup>
            </Box>
          </Fade>
        )}
      </Popper>
    </>
    }
    </>
  );
}
