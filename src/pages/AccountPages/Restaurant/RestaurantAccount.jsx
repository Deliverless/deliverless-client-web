import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Home from '../../restaurant/RestaurantHome';
import Feedback from '../../restaurant/Feedback';
import Payment from '../../components/AccountDashboards/Customer/UpdatePayment'
import Menu from '../../restaurant/Menu';
import Hours from '../../restaurant/Hours';
import MyOrders from '../../components/AccountDashboards/Customer/MyOrders';

export default function RestaurantAccount() {
	const [tabValue, setTabValue] = React.useState('home');
	const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
		<Box sx={{ width: '100%'}} className="main-content">
			<Tabs
				variant="scrollable"
				value={tabValue} 
				selectionFollowsFocus 
				onChange={handleChange}
				textColor="primary"
				scrollButtons={true}
				allowScrollButtonsMobile
				indicatorColor="primary"
				aria-label="primary customer account tabs" >

					{/* account info/updates */}
				<Tab sx={{'&.Mui-selected': {outline: 'none'}, width: '175px'}}
							value="home"label="Home" />
					{/* reviews from customers/drivers */}
				<Tab sx={{'&.Mui-selected': {outline: 'none'}, width: '175px'}} 
							value="feedback" label="Feedback" />
					{/* payment options/updates */}
				<Tab sx={{'&.Mui-selected': {outline: 'none'}, width: '175px'}}
							value="payments" label="Payments" />
					{/* restaurants orders */}
				<Tab sx={{'&.Mui-selected': {outline: 'none'}, width: '175px'}}
							value="orders" label="Orders" />
					{/* restau menu/updates */}
				<Tab sx={{'&.Mui-selected': {outline: 'none'}, width: '175px'}}
							value="menu" label="Menu" />
					{/* restau weekly hours & annual holiday hours */}
				<Tab sx={{'&.Mui-selected': {outline: 'none'}, width: '175px'}}
							value="hours" label="Holiday Hours" />
			</Tabs>

			<Box>
				{tabValue === 'home' && <Home />}
				{tabValue === 'feedback' && <Feedback />}
				{tabValue === 'payments' && <Payment />}
				{tabValue === 'orders' && <MyOrders />}
				{tabValue === 'menu' && <Menu />}
				{tabValue === 'hours' && <Hours />}

			</Box>
		</Box>
		
  )
}
