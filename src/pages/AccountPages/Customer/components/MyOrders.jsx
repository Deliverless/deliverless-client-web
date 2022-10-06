import React, { useContext, Component, useState, useEffect } from "react";
import Order from "./Order";
// import { getCustomerOrders } from '../../../models/order';
import { UserContext } from "../../../../lib/context/userContext";
import LinearProgress from "@mui/material/LinearProgress";
import { getOrder, getUserOrders } from "../../../../models/order";
import { getRestaurant } from '../../../../models/restaurant'
import { RestContext } from "../../../../lib/context/restContext";

const MyOrders = ({ id }) => {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    getOrders();
  }, []);

  // TODO: pull data from BigChain DB using smart contract
  const getOrders = async () => {
  
    user.customer.orderIds.forEach(async id => {
      const order = await getOrder(id);
      setOrders((current)=>[...current, order])
      setLoaded(true);
    })

    // getUserOrders(user.id).then((orders)=>{
    //   console.log("orders", orders)
    //   if(!Array.isArray(orders))
    //     setOrders([orders])
    //   else
    //     setOrders(orders)
    //   setLoaded(true);
    // })
    
  };

  if (!loaded) {
    return (
      <div
        className="main-content center-container"
        style={{ flexDirection: "column" }}
      >
        Loading Orders
        <LinearProgress style={{ width: 345, margin: "20px auto" }} />
      </div>
    );
  }

  if (orders == null) {
    return <div>You haven't placed any orders yet.</div>;
  }

  return (
    <div
      className="main-content container"
      style={{ textAlign: "center", marginTop: "50px" }}
    >
      {orders.map((order) => {
        console.log("ORDER", order);
        return (
          <div key={order.asset_id}>
            <Order
              key={order.id}
              id={order.id}
              foods={order.items}
              itemCount={order.items.length}
              restaurantId={order.restaurantId}
              total={order.total}
              tax={order.tax}
              status={order.status}
              timePlaced={order.timestamp}
            />
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default MyOrders;
