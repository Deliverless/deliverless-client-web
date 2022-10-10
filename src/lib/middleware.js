import React, { useContext } from 'react';

import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import {
  useAuthorized,
  UserContext,
} from './context/userContext';

export const HasAddressCookie = ({ children, redirectTo }) => {
    const cookies = new Cookies();
    return cookies.get('Address') ? children : <Navigate to={redirectTo} />;
}

export const RequiredAuth = ({ children, redirectTo }) => {
    const { logout } = useContext(UserContext)
    console.log(logout)
    return !logout ? children : <Navigate to={redirectTo} />;
}

export const Logout = ({ redirectTo }) => {
    const { logoutUser } = useContext(UserContext);
    logoutUser();
    return <Navigate to={redirectTo} />
}
/* Acts as a role guard wrapper tag around any Page component with a given privilege and redirectTo
 * Simultaneously acts as a RequiredAuth thereby eliminating the need to have <RequiredAuth><RequiredPrivilege><Page /></RequiredPrivilege></RequiredAuth>
 */
export const RequiredPrivilege = ({ children, redirectTo, privilege }) => {
    return useAuthorized(privilege) ? children : <Navigate to={redirectTo} />;
}

