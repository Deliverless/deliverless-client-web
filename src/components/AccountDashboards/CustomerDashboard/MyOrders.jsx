import React, { useContext, Component, useState, useEffect } from 'react';
import Order from './Order';
import DBRequest from '../../../lib/api';
import { retrieve } from '../../../smartcontracts/entities/order'
import { UserContext } from '../../../lib/userContext';
import LinearProgress from '@mui/material/LinearProgress';

const MyOrders = ({id}) => {
	const [orders, setOrders] = useState([])
	const [loaded, setLoaded] = useState(false);
	const { user, setUser } = useContext(UserContext);

	useEffect(() =>{
		getOrders();
	}, [])


	// TODO: pull data from BigChain DB using smart contract
	const getOrders = async ()=> {
		
		// get orders with USRID from bigchain db 
		console.log(user.orderIds)
		let orderData = [];
		for(let i=0; i < user.orderIds?.length; i++){
			let order = await retrieve(user.orderIds[i])
			order[0].data.asset_id = user.orderIds[i]
			orderData.push(order[0].data)
			
		}
		setOrders(orderData.flat());
		setLoaded(true);
	}

	if(!loaded){
		return(
			<div className="main-content center-container" style={{flexDirection: 'column'}}>
				Loading Orders
				<LinearProgress  style={{width: 345, margin:'20px auto'}}/>
			</div>)
	}

	if(orders == null){
		return <div>You haven't placed any orders yet.</div>
	}

	return (
		<div className="main-content container" style={{textAlign: 'center', marginTop:'50px'}}>
			{orders.map(order => {
				console.log("ORDER", order)
			return (<div key={order.asset_id}>
					<Order 
						id={order.asset_id}
						foods={order.foods}
						itemCount={order.foods.length}
						restaurantID={order.restaurantID}
						total={order.total}
						tax={order.total}
						status={order.status}
						timePlaced={order.timePlaced}
						/>
						<hr />
			</div>)
	})}
		</div>
		);

}
 
export default MyOrders;