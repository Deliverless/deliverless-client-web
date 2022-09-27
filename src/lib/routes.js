import Home from '../pages/Home'
import Landing from '../pages/Landing'
import SignUp from '../pages/SignUp'
import NotFound from '../pages/NotFound'
import Login from '../pages/Login'
import Cart from '../pages/Cart'
import Account from '../pages/Account'
import RestaurantDashboard from '../pages/restaurant/RestaurantDashboard'
import AdminSettings from '../pages/admin/AdminSettings'
import { HasAddressCookie, RequiredPrivilege, RequiredAuth, Logout } from './middleware'
import RestaurantHome from '../pages/restaurant/RestaurantHome'
import ThankYou from '../components/ThankYou'
import Checkout from '../pages/Checkout'

const routes = [
    { path: "/", element: <HasAddressCookie redirectTo='/landing'><Home /></HasAddressCookie> },
    { path: "/landing", element: <Landing /> },
    { path: "/login", element: <Login /> },
    { path: "/logout", element: <Logout redirectTo="/login"></Logout> },
    { path: "/signup", element: <SignUp /> },
    { path: "/restaurant/home", element: <RestaurantHome /> },
    { path: "/cart", element: <RequiredAuth redirectTo="/login"><Cart /></RequiredAuth> },
    { path: "/account", element: <RequiredAuth redirectTo="/login"><Account /></RequiredAuth> },
    { path: "/restaurant/dashboard", element: <RequiredPrivilege privilege="restaurant" redirectTo="/"><RestaurantDashboard /></RequiredPrivilege> },
    { path: "/settings", element: <RequiredPrivilege redirectTo="/login"><AdminSettings /></RequiredPrivilege> },
    { path: "*", element: <NotFound /> },
    { path: "/thankyou", element: <RequiredAuth redirectTo="/login"><ThankYou></ThankYou></RequiredAuth>},
    { path: "/checkout", element: <RequiredAuth redirectTo="/login"><Checkout></Checkout></RequiredAuth>}
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

export { routes, appBarLinks };

