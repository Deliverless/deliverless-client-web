import React, { useContext } from 'react';

import CustomerDashboard
  from '../components/AccountDashboards/CustomerDashboard/CustomerDashboard';
import { UserContext } from '../lib/context/userContext';

const Account = () => {
   
    const {user, setUser} = useContext(UserContext)

		//TODO: on render : update user for session
		
		const { role, firstName, lastName, email, address, id, encoded } = user

		return (
			<div className="main-content">
				{role==="customer" && <div>
						<CustomerDashboard id={id} encoded={encoded} firstName={firstName} lastName={lastName} emailAddress={email} deliveryAddress={address} />
				</div>}
				{role==="driver" && <div>
					<h1>This is Driver account</h1>
				</div>}
				{role==="restaurant" && <div>
						<h1>This is Restaurant account</h1>
				</div>}
			</div>
		);
}
 
export default Account;