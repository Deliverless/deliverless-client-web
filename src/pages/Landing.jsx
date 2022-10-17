import { Button } from '@mui/material';
import React from 'react'
import LandingAddressSet from '../components/LandingAddressSet'
import { deleteObject, findObjectsByMetadata } from '../lib/web3-helper';
import { getDrivers, updateDriver } from '../models/driver';
import { updateOrder } from '../models/order';

const Landing = () => {
    return (
        <div className="main-content landing">
            <div className="m-5">   
                <h1>Order delivery now</h1>
                <LandingAddressSet/>
                {/* debug button */}
                {/* <Button onClick={async ()=>{
                    console.log(await getDrivers())
                    let allPendingOrders = (await findObjectsByMetadata("order", { status: 'Pending' }, 0)).data;
                    allPendingOrders.forEach((o)=>{
                        updateOrder(o.id, {status: "Cancelled"});
                    })
                }}>get drivers</Button> */}
            </div>
        </div>
    );
    
}
 
export default Landing;
