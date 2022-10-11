import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AccountInfo from '../AccountInfo';
import VehicleInfo from './components/VehicleInfo';


export default function DriverAccount({id, firstName, lastName, emailAddress, deliveryAddress, encoded}) {

  const [tabValue, setValue] = React.useState('info')

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: '100%'}}>
				<Tabs
					variant="fullWidth"
					value={tabValue}
					onChange={handleChange}
					textColor="primary"
					indicatorColor="primary"
					aria-label="primary customer account tabs">
					<Tab sx={{'&.Mui-selected': {outline: 'none',}}} 
								value="info"label="Account Info" />
					<Tab sx={{'&.Mui-selected': {outline: 'none',}}} 
								value="vehicle" label="Vehicle & City" />
				</Tabs>

				<Box className="center-container" sx={{ width: '100%'}}>
					{tabValue==='info' && <AccountInfo encoded={encoded} firstName={firstName} lastName={lastName} email={emailAddress} address={deliveryAddress}  />}
					{tabValue==='vehicle' && <VehicleInfo />}
				</Box>
    	</Box>

		</div>
  )
}
