import React from 'react';

import { Navigate } from 'react-router-dom';

import Account from '../pages/AccountPages/Account';
import AdminSettings from '../pages/AdminSettings';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import DriverDashboard from '../pages/Dashboards/Driver/DriverDashboard';
import RestaurantDashboard
  from '../pages/Dashboards/Restaurant/RestaurantDashboard';
import DriverProfile from '../pages/DriverProfile';
import Home from '../pages/Home';
import Landing from '../pages/Landing';
import Login from '../pages/Login/CustomerLogin';
import DriverLogin from '../pages/Login/DriverLogin';
import RestaurantLogin from '../pages/Login/RestaurantLogin';
import NotFound from '../pages/NotFound';
// import RestaurantHome from '../pages/restaurant/RestaurantHome';
import CustomerSignUp from '../pages/Signup/CustomerSignUp';
import DriverSignUp from '../pages/Signup/DriverSignUp';
import RestaurantSignUp from '../pages/Signup/RestaurantSignUp';
import ThankYou from '../pages/ThankYou';
import TrackOrder from '../pages/TrackOrder';
import {
  HasAddressCookie,
  Logout,
  RequiredAuth,
  RequiredPrivilege,
} from './middleware';

const routes = [
  { path: "/", element: <HasAddressCookie redirectTo='/landing'><Navigate to='/restaurants' /></HasAddressCookie> },
  { path: "/landing", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <Logout redirectTo="/login"></Logout> },
  { path: "/signup", element: <CustomerSignUp /> },
  { path: "/cart", element: <RequiredAuth redirectTo="/login"><Cart /></RequiredAuth> },
  { path: "/account", element: <RequiredAuth redirectTo="/login"><Account /></RequiredAuth> },
  { path: "/settings", element: <RequiredPrivilege privilege="admin" redirectTo="/login"><AdminSettings /></RequiredPrivilege> },
  { path: "/restaurants/*", element: <Home /> },
  // { path: "/restaurant/home", element: <RestaurantHome /> },
  { path: "/restaurant/dashboard", element: <RequiredPrivilege privilege="restaurant" redirectTo="/"><RestaurantDashboard /></RequiredPrivilege> },
  { path: "/restaurant/signup", element: <RestaurantSignUp /> },
  { path: "/restaurant/login", element: <RestaurantLogin /> },
  { path: "/driver/profile", element: <DriverProfile /> },
  { path: "/driver/dashboard", element: <RequiredPrivilege privilege="driver" redirectTo="/"><DriverDashboard /></RequiredPrivilege> },
  { path: "/driver/signup", element: <DriverSignUp /> },
  { path: "/driver/login", element: <DriverLogin /> },
  { path: "/driver/trackorder", element: <TrackOrder /> },
  { path: "/thankyou", element: <RequiredAuth redirectTo="/login"><ThankYou /></RequiredAuth> },
  { path: "/checkout", element: <RequiredAuth redirectTo="/login"><Checkout /></RequiredAuth> },
  { path: "*", element: <NotFound /> },
];

const appBarLinks = [

  { title: 'Home', icon: 'home', url: "/", role: 'customer', isAuth: false },
  { title: 'Restaurant Dashboard', icon: 'home', url: "/restaurant/dashboard", role: 'restaurant', isAuth: true },
  { title: 'Driver Dashboard', icon: 'home', url: "/driver/dashboard", role: 'driver', isAuth: true },
  { title: 'Cart', icon: 'shopping-cart', url: "/cart", role: 'customer', isAuth: true },
  { title: 'Account', icon: 'user-circle', url: "/account", isAuth: true },
  { title: 'Logout', icon: 'sign-out', url: "/logout", isAuth: true },
  { title: 'Login', icon: 'sign-in', url: "/login", isAuth: false },
  { title: 'Sign Up', icon: 'user-plus', url: "/signup", isAuth: false },
  { title: 'Login Driver', icon: 'car', url: "/driver/login", isAuth: false },
  { title: 'Login Restaurant', icon: 'cutlery', url: "/restaurant/login", isAuth: false },
  { title: 'Settings', icon: 'cog', url: "/settings", role: 'admin', isAuth: true }
];

export { appBarLinks, routes };
