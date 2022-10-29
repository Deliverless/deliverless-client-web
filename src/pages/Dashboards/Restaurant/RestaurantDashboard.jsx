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
import { Backdrop, Button, CircularProgress } from '@mui/material';
import { findObjectsByMetadata } from '../../../lib/web3-helper';
import DataCard from '../Driver/components/DataCard';
// import OnlineStatusToggle from './components/OnlineStatusToggle';
import OrderTable from './components/OrderTable';
import RevenueChart from '../Driver/components/RevenueChart';
import { requestRestaurants } from '../../../models/restaurant';
import { SnackbarProvider, useSnackbar } from 'notistack';

function RestaurantDashboardPage() {
  const { user, setUser } = useContext(UserContext);
  const [ orders, setOrders ] = useState([]);
	const { rests, setRests } = useContext(RestContext);
  const [tabValue, setValue] = React.useState('pending');
  const [orderNum, setOrderNum] = useState(0);
  const [totalRev, setTotalRev] = useState(0);
  const { enqueueSnackbar: loadSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const loadingUpdate = (update, variant)=>{
    loadSnackbar(update, {variant})
  }

  useEffect(async ()=>{
    let rests2;
    if(rests?.length == 0){
      rests2 = await requestRestaurants()
      setRests(rests2);
      return getOrders(rests2);
    }
    getOrders(rests);
    console.log("rests", rests);
   
  },[])

  const getOrders = async (_rests) => {
    loadingUpdate("Fetching orders from the blockchain...", "info")
    setLoading(true)
    let availOrders = (await findObjectsByMetadata("order", {restaurantId: user.restaurant.id}, 21)).data;
    console.log("ords", availOrders);
    let temp = (availOrders.filter(o=> (o.status != "Pending" && o.status != "Cancelled"))).length
    setOrderNum(temp);
    console.log("ordernum", temp)
    let rev = 0;
    for(let i = 0; i < availOrders.length; i++){
      if(availOrders[i].status !== "Pending" && availOrders[i].status !== "Cancelled") rev += (availOrders[i].tax + availOrders[i].subtotal)
      availOrders[i].restaurant = _rests.find(r=> r.id == availOrders[i].restaurantId)
    }
    setTotalRev(Math.round(rev * 100) / 100);
    setOrders(availOrders);
    setLoading(false)
  }

  const parseGraphData = () => {
    let sortedOrders = [...orders].sort(function(x, y){
      return new Date(x.timestamp).getTime() -  new Date(y.timestamp).getTime()
    })
    const groupByCategory = sortedOrders.reduce((group, order) => {
      const { timestamp } = order;
      const category =
        new Date(timestamp).toLocaleString("default", {
          month: "long",
        }) +
        " " +
        new Date(timestamp).getDate();

      group[category] = group[category] ?? [];
      group[category].push(order);
      return group;
    }, {});

    return Object.values(groupByCategory).map((g) => {
      var total = 0;
      for (let i = 0; i < g.length; i++) {
        let o = g[i];
        total += o.tip * o.subtotal + o.driverFee;
      }
      return {
        name:
          new Date(g[0].timestamp).toLocaleString("default", {
            month: "long",
          }) +
          " " +
          new Date(g[0].timestamp).getDate(),
        Total: total,
      };
    });
  };

  return (
    <div className="main-content container">
      <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
      </Backdrop>
      <h1 className="row m-0">Hi {user.restaurant.name + ' (' + user.restaurant.address.street + ')'} </h1>
      <div className="row">
        <div className="col d-block" style={{overflowX: 'scroll', overflowY: 'auto', whiteSpace: 'nowrap', height: '183px'}}>
            {/* <span className="d-lg-none"><OnlineStatusToggle height={142}/></span> */}
            <DataCard title="TOTAL REVENUE" mainValue={`$${totalRev}`} CTA="See All Transactions" />
            <DataCard title="ORDERS" mainValue={orderNum} CTA="See All Orders" />
            {/* <DataCard title="AVG RATING" mainValue="4.43 &#9733;" CTA="See All Reviews" /> */}
        </div>
        <div className="col-lg-3 col-xl-4 d-none d-lg-inline-block">
          {/* <OnlineStatusToggle /> */}
        </div>
      </div>
      <div className="row">
        <div className="col">
            <div style={{maxWidth:'500px'}}>
              <h4>Revenue (all time)</h4>
              <RevenueChart 
                data={parseGraphData()} 
                orders={orders.filter((o) => o.status == "Delivered")}/>
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
								value="pending"label="Pending" />
					<Tab sx={{'&.Mui-selected': {outline: 'none',}}} 
								value="foodready" label="Order Ready" />
          <Tab sx={{'&.Mui-selected': {outline: 'none',}}} 
                value="delivered" label="Delivered Orders" />
          <Tab sx={{'&.Mui-selected': {outline: 'none',}}} 
                value="cancelled" label="Cancelled Orders" />
				</Tabs>

        <Box className="center-container" sx={{ width: '100%'}}>
					{tabValue==='pending' && <OrderTable orders={orders} setOrders={setOrders} toast={loadingUpdate} status="Pending"/>}
					{tabValue==='foodready' && <OrderTable orders={orders} setOrders={setOrders} toast={loadingUpdate} status="FoodReady"/>}
          {tabValue==='delivered' && <OrderTable orders={orders} setOrders={setOrders} toast={loadingUpdate} status="Delivered"/>}
          {tabValue==='cancelled' && <OrderTable orders={orders} setOrders={setOrders} toast={loadingUpdate} status="Cancelled"/>}
				</Box>

      </div>
    </div>
  )
}

export default function RestaurantDashboard() {
  return (
    <SnackbarProvider maxSnack={3}>
      <RestaurantDashboardPage />
    </SnackbarProvider>
  );
}