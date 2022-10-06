import Home from '../pages/Home'
import Landing from '../pages/Landing'
import CustomerSignUp from '../pages/Signup/CustomerSignUp'
import NotFound from '../pages/NotFound'
import Login from '../pages/Login/CustomerLogin'
import Cart from '../pages/Cart'
import Account from '../pages/AccountPages/Account'
import RestaurantDashboard from '../pages/Dashboards/Restaurant/RestaurantDashboard'
import AdminSettings from '../pages/AdminSettings'
import { HasAddressCookie, RequiredPrivilege, RequiredAuth, Logout } from './middleware'
import RestaurantHome from '../pages/restaurant/RestaurantHome'
import ThankYou from '../pages/ThankYou'
import Checkout from '../pages/Checkout'
import DriverSignUp from '../pages/Signup/DriverSignUp'
import RestaurantSignUp from '../pages/Signup/RestaurantSignUp'
import DriverDashboard from '../pages/Dashboards/Driver/DriverDashboard'
import DriverProfile from '../pages/DriverProfile'
import DriverLogin from '../pages/Login/DriverLogin'

const routes = [
    { path: "/", element: <HasAddressCookie redirectTo='/landing'><Home /></HasAddressCookie> },
    { path: "/landing", element: <Landing /> },
    { path: "/login", element: <Login /> },
    { path: "/logout", element: <Logout redirectTo="/login"></Logout> },
    { path: "/signup", element: <CustomerSignUp /> },
    { path: "/cart", element: <RequiredAuth redirectTo="/login"><Cart /></RequiredAuth> },
    { path: "/account", element: <RequiredAuth redirectTo="/login"><Account /></RequiredAuth> },
    { path: "/settings", element: <RequiredPrivilege privilege="admin" redirectTo="/login"><AdminSettings /></RequiredPrivilege> },
    { path: "/restaurant/home", element: <RestaurantHome /> },
    { path: "/restaurant/dashboard", element: <RequiredPrivilege privilege="restaurant" redirectTo="/"><RestaurantDashboard /></RequiredPrivilege> },
    { path: "/restaurant/signup", element: <RestaurantSignUp /> },
    { path: "/driver/profile", element: <DriverProfile /> },
    { path: "/driver/dashboard", element: <RequiredPrivilege privilege="driver" redirectTo="/"><DriverDashboard /></RequiredPrivilege> },
    { path: "/driver/signup", element: <DriverSignUp /> },
    { path: "/driver/login", element: <DriverLogin /> },
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
    { title: 'Add your Restaurant', icon: 'cutlery', url: "/restaurant/signup", isAuth: false },
    { title: 'Settings', icon: 'cog', url: "/settings", role: 'admin', isAuth: true }
];

export { routes, appBarLinks };

