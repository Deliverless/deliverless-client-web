import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AccountInfo from './components/AccountInfo';
import UpdatePayment from './components/UpdatePayment'
import MyOrders from './components/MyOrders'

export default function CustomerAccount({id, firstName, lastName, emailAddress, deliveryAddress, encoded}) {
	const [tabValue, setValue] = React.useState('info');

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
								value="orders" label="My Orders" />
					<Tab sx={{'&.Mui-selected': {outline: 'none',}}}
								value="payment" label="Update Payment" />
				</Tabs>

				<Box className="center-container" sx={{ width: '100%'}}>
					{tabValue==='info' && <AccountInfo encoded={encoded} firstName={firstName} lastName={lastName} email={emailAddress} address={deliveryAddress}  />}
					{tabValue==='orders' && <MyOrders id={id} />}
					{tabValue==='payment' && <UpdatePayment />}
				</Box>
    	</Box>

		</div>
	 );
	}





	