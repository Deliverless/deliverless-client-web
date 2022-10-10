import { Navigate } from 'react-router-dom';

// import RestaurantHome from '../pages/Restaurants'
import ThankYou from '../components/ThankYou';
import Account from '../pages/Account';
import AdminSettings from '../pages/admin/AdminSettings';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import DriverSignUp from '../pages/DriverSignUp';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import RestaurantDashboard from '../pages/RestaurantDashboard';
import Restaurants from '../pages/Restaurants';
import SignUp from '../pages/SignUp';
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
    { path: "/signup", element: <SignUp /> },
    { path: "/restaurants/*", element: <Restaurants /> },
    { path: "/cart", element: <RequiredAuth redirectTo="/login"><Cart /></RequiredAuth> },
    { path: "/account", element: <RequiredAuth redirectTo="/login"><Account /></RequiredAuth> },
    { path: "/restaurant/dashboard", element: <RequiredPrivilege privilege="restaurant" redirectTo="/"><RestaurantDashboard /></RequiredPrivilege> },
    { path: "/settings", element: <RequiredPrivilege redirectTo="/login"><AdminSettings /></RequiredPrivilege> },
    { path: "*", element: <NotFound /> },
    { path: "/thankyou", element: <RequiredAuth redirectTo="/login"><ThankYou></ThankYou></RequiredAuth>},
    { path: "/checkout", element: <RequiredAuth redirectTo="/login"><Checkout></Checkout></RequiredAuth>},
    { path: "/driver/signup", element: <DriverSignUp/>}
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
    { title: 'Become a Driver', icon: 'car', url: "/driver/signup", isAuth: false },
    { title: 'Add your Restaurant', icon: 'cutlery', url: "/restaurant/signup", isAuth: false },
    { title: 'Settings', icon: 'cog', url: "/settings", role: 'admin', isAuth: true }
];

export { appBarLinks, routes };
