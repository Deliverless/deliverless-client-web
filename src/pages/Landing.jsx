import React from 'react'
import LandingAddressSet from '../components/LandingAddressSet'

const Landing = () => {
    return (
        <div className="main-content landing">
            <div className="m-5">   
                <h1>Order delivery now</h1>
                <LandingAddressSet/>
            </div>
        </div>
    );
    
}
 
export default Landing;
