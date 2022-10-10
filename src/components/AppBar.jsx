import React, { useContext } from 'react';

import {
  Link,
  useLocation,
} from 'react-router-dom';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  styled,
  useTheme,
} from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { CartContext } from '../lib/context/cartContext';
import { UserContext } from '../lib/context/userContext';
import { appBarLinks } from '../lib/routes';
import AddressPickupSelector from './AddressPickupSelector';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const ResponsiveAppBar = () => {
  const { user } = useContext(UserContext);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { itemCount } = useContext(CartContext);
  const location = useLocation();
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const filteredPages = appBarLinks.filter((l)=>{
    if(Object.keys(user).length === 0) return !l.isAuth //unauthenticated
    return (l.role === undefined && l.isAuth) || (l.role === user?.role || l.role === 'admin')  //load authenticated pages, add pages that match user role, if admin add admin privilege pages, 
  })

  return (
    <Box sx={{ display: 'flex', marginBottom: '70px' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar disableGutters style={{ backgroundColor: '#333333' }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleDrawerOpen}
            edge="start"
            color="inherit"
            sx={{
              margin: '10px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{marginLeft:'30px'}}
          >
            Deliver Less
          </Typography>
          {location.pathname != "/landing" && <AddressPickupSelector/> }
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{}}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {filteredPages.map((page, index) => (
            <div key={index}>
              {page.title==="Settings" &&  <Divider />}
              <ListItemButton component={Link} to={page.url}
                key={page.title}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                {page.title=="Cart" && <Badge badgeContent={itemCount} color="primary" sx={{position: 'absolute',left: '43px', top:'10px'}}></Badge>}
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <i style={{fontSize:"22px"}} className={"fa fa-" + page.icon}></i>
                  </ListItemIcon>
                
                <ListItemText primary={page.title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </div>
          ))}
        </List>
        { !filteredPages.find((p)=>p.title==="Settings") &&<Divider />}
      </Drawer>
     
    </Box>
  );
};
export default ResponsiveAppBar;
