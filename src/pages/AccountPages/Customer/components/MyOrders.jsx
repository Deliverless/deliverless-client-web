import React, { useContext, Component, useState, useEffect } from "react";
import Order from "./Order";
// import { getCustomerOrders } from '../../../models/order';
import { UserContext } from "../../../../lib/context/userContext";
import LinearProgress from "@mui/material/LinearProgress";
import { getOrder, findOrdersByUserId } from "../../../../models/order";

const MyOrders = ({ id }) => {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    let userOrders = await findOrdersByUserId(user.id)
    setOrders(userOrders)
    setLoaded(true)
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
