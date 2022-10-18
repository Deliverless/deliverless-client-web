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
import { requestRestaurants } from '../../../models/restaurant';

export default function DriverDashboard() {
  const { user, setUser } = useContext(UserContext);
  const [ orders, setOrders ] = useState([]);
	const { rests, setRests } = useContext(RestContext);
  const [tabValue, setValue] = React.useState('foodready');
  const [orderNum, setOrderNum] = useState(0);
  const [totalRev, setTotalRev] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(async ()=>{
    if(rests?.length == 0){
      setRests(await requestRestaurants());
    }
    console.log("rests", rests);
    getOrders();
  },[])

  

  const getOrders = async () => {
    
    let availOrders = (await findObjectsByMetadata("order", {driverId: user.driver.id}, 0)).data;
    console.log("ords", availOrders);

    setOrderNum((availOrders.filter(o=>o.status == "Delivered")).length);

    let rev = 0;
    for(let i = 0; i < availOrders.length; i++){
      if(availOrders[i].status == "Delivered") rev += (availOrders[i].tip * availOrders[i].subtotal) + availOrders[i].driverFee
      availOrders[i].restaurant = rests.find(r=> r.id == availOrders[i].restaurantId)
    }
    setTotalRev(Math.round(rev * 100) / 100);
    setOrders(availOrders);
  }

  return (
    <div className="main-content container">
      <h1 className="row m-0">Hi {user.firstName} </h1>
      <div className="row">
        <div
          className="col d-block"
          style={{
            overflowX: "scroll",
            overflowY: "auto",
            whiteSpace: "nowrap",
            height: "183px",
          }}
        >
          <span className="d-lg-none">
            <OnlineStatusToggle height={142} />
          </span>
          <DataCard
            title="TOTAL REVENUE"
            mainValue={`$${totalRev}`}
            CTA="See All Transactions"
          />
          <DataCard title="ORDERS" mainValue={orderNum} CTA="See All Orders" />
          {/* <DataCard title="AVG RATING" mainValue="4.43 &#9733;" CTA="See All Reviews" /> */}
        </div>
        <div className="col-lg-3 col-xl-4 d-none d-lg-inline-block">
          <OnlineStatusToggle />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div style={{ maxWidth: "500px" }}>
            <h4>Revenue (all time)</h4>
            <RevenueChart
              data={orders.map((o) => {
                return {
                  name: new Date(o.timestamp).toLocaleString("default", {
                    month: "long",
                  }),
                  Total: o.tip * o.subtotal + o.driverFee,
                };
              })}
              orders={orders.filter((o) => o.status == "Delivered")}
            />
          </div>
        </div>
        <div className="col"></div>
      </div>
      <div className="row">
        <Tabs
          variant="fullWidth"
          value={tabValue}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="primary customer account tabs"
        >
          <Tab
            sx={{ "&.Mui-selected": { outline: "none" } }}
            value="foodready"
            label="Ready to Deliver"
          />
          <Tab
            sx={{ "&.Mui-selected": { outline: "none" } }}
            value="delivered"
            label="Delivered Orders"
          />
          <Tab
            sx={{ "&.Mui-selected": { outline: "none" } }}
            value="cancelled"
            label="Cancelled Orders"
          />
        </Tabs>

        <Box className="center-container" sx={{ width: "100%" }}>
          {tabValue === "foodready" && (
            <OrderTable orders={orders} status="FoodReady" />
          )}
          {tabValue === "delivered" && (
            <OrderTable orders={orders} status="Delivered" />
          )}
          {tabValue === "cancelled" && (
            <OrderTable orders={orders} status="Cancelled" />
          )}
        </Box>
      </div>
    </div>
  );
}
