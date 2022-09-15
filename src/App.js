import './App.scss';
import { useRoutes } from 'react-router-dom';
import { routes } from './lib/routes';
import ResponsiveAppBar from './components/AppBar';
import { UserContext } from './lib/userContext';
import CartContextProvider from './lib/cartContext';
import UserContextProvider from './lib/userContext';
const App = () => {
  return useRoutes(routes);
};

const AppWrapper = () => {
  return (
    <div style={{ marginLeft: '4rem' }}>
      {/* If you pass null rather than a user obj, the UserContext.user will be null and therefore unauthenticated so pages account and cart cannot be accessed*/}
      <UserContextProvider>
        {/* <UserContext.Provider value={null}> */}
        <CartContextProvider>
          <ResponsiveAppBar />
          <App />
        </CartContextProvider>
      </UserContextProvider>
    </div>
  );
};

export default AppWrapper;