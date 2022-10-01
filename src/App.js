import './App.scss';
import { useRoutes } from 'react-router-dom';
import { routes } from './lib/routes';
import ResponsiveAppBar from './components/AppBar';
import CartContextProvider from './lib/context/cartContext';
import UserContextProvider from './lib/context/userContext';
import OrderContextProvider from './lib/context/orderContext';
import RestContextProvider from './lib/context/restContext';

const App = () => {
  return useRoutes(routes);
};

const AppWrapper = () => {
  return (
    <div style={{ marginLeft: '4rem' }}>
      {/* If you pass null rather than a user obj, the UserContext.user will be null and therefore unauthenticated so pages account and cart cannot be accessed*/}
      <UserContextProvider>
        {/* <UserContext.Provider value={null}> */}
        <OrderContextProvider>
          <CartContextProvider>
            <RestContextProvider>
              <ResponsiveAppBar />
              <App />
            </RestContextProvider>
          </CartContextProvider>
        </OrderContextProvider>
      </UserContextProvider>
    </div>
  );
};

export default AppWrapper;
