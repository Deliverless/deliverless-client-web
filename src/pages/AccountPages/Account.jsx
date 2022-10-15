import React, { useContext } from 'react';

import { UserContext } from '../../lib/context/userContext';
import CustomerAccount from './Customer/CustomerAccount';
import DriverAccount from './Driver/DriverAccount';
import RestaurantAccount from './Restaurant/RestaurantAccount';

const Account = () => {
  const { user, setUser } = useContext(UserContext);

  //TODO: on render : update user for session

  const { role, firstName, lastName, email, address, id, encoded } = user;

  return (
    <div className="main-content">
      {role === "customer" && (
        <div>
          <CustomerAccount
            id={id}
            encoded={encoded}
            firstName={firstName}
            lastName={lastName}
            emailAddress={email}
            deliveryAddress={address}
          />
        </div>
      )}
      {role === "driver" && (
        <div>
          <DriverAccount
            id={id}
            encoded={encoded}
            firstName={firstName}
            lastName={lastName}
            emailAddress={email}
            deliveryAddress={address}
          />
        </div>
      )}
      {role === "restaurant" && <div>
				<RestaurantAccount 
					id={id}
					encoded={encoded}
					firstName={firstName}
					lastName={lastName}
					emailAddress={email}
					deliveryAddress={address}
				/>
			</div>}
    </div>
  );
};

export default Account;
