import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { RestContext } from '../../../lib/context/restContext';
import { UserContext } from '../../../lib/context/userContext';
import { findObjectsByMetadata } from '../../../lib/web3-helper';
import DataCard from './components/DataCard';
import OnlineStatusToggle from './components/OnlineStatusToggle';
import OrderTable from './components/OrderTable';
import RevenueChart from './components/RevenueChart';

export default function DriverDashboard() {
  const { user, setUser } = useContext(UserContext);
  const [ orders, setOrders ] = useState([]);
	const { rests } = useContext(RestContext);
  const [tabValue, setValue] = React.useState('pending');

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(async ()=>{
    getOrders();
  },[])

  console.log("rests", rests);

  const getOrders = async () => {
    
    let pendingOrders = findObjectsByMetadata("order", {status: 'Pending'}, 10);
    let deliveredOrders = findObjectsByMetadata("order", {status: 'Delivered'}, 10);
    await Promise.all([pendingOrders, deliveredOrders])
    console.log("pending", await pendingOrders);
    console.log("delivered", await deliveredOrders);

    let availOrders = [...(await pendingOrders).data, ...(await deliveredOrders).data]

    console.log("ords", availOrders);
    for(let i = 0; i < availOrders.length; i++){
      availOrders[i].restaurant = rests.find(r=> r.id == availOrders[i].restaurantId)
    }
    console.log("ords", availOrders);
    setOrders(availOrders);
  }

  return (
    <div className="main-content container">
      <h1 className="row m-0">Hi {user.firstName} </h1>
      <div className="row">
        <div className="col d-block" style={{overflowX: 'scroll', overflowY: 'auto', whiteSpace: 'nowrap', height: '183px'}}>
            <span className="d-lg-none"><OnlineStatusToggle height={142}/></span>
            <DataCard title="TOTAL REVENUE" mainValue="$17k" CTA="See All Transactions" />
            <DataCard title="ORDERS" mainValue="352" CTA="See All Orders" />
            <DataCard title="AVG RATING" mainValue="4.43 &#9733;" CTA="See All Reviews" />
        </div>
        <div className="col-lg-3 col-xl-4 d-none d-lg-inline-block">
          <OnlineStatusToggle />
        </div>
      </div>
      <div className="row">
        <div className="col">
            <div style={{maxWidth:'500px'}}>
              <h4>Revenue (all time)</h4>
              <RevenueChart/>
            </div>
        </div>
        <div className="col">
          
        </div>
      </div>
      <div className="row">
      <Tabs
					variant="fullWidth"
					value={tabValue}
					onChange={handleTabChange}
					textColor="primary"
					indicatorColor="primary"
					aria-label="primary customer account tabs">
					<Tab sx={{'&.Mui-selected': {outline: 'none',}}} 
								value="pending"label="Ready to Deliver" />
					<Tab sx={{'&.Mui-selected': {outline: 'none',}}} 
								value="delivered" label="Delivered Orders" />
				</Tabs>

        <Box className="center-container" sx={{ width: '100%'}}>
					{tabValue==='pending' && <OrderTable orders={orders} status="Pending"/>}
					{tabValue==='delivered' && <OrderTable orders={orders} status="Delivered"/>}
				</Box>

      </div>
    </div>
  )
}
