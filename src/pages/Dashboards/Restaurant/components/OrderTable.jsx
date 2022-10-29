import * as React from 'react';

import { Link } from 'react-router-dom';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Backdrop, Button, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { delegateOrder, getOrder, updateOrder } from '../../../../models/order';

function Row(props) {
  const { row, status, setOrders, toast } = props;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function makeOrderReady(order) {

    setLoading(true)

    if (( !order.driverId || order.driverId == "" ) && order.isPickup == false)
    {
      toast("Finding a driver for order...", "info")
      const {status, driverId} = await delegateOrder(row)
      order.driverId = driverId
      console.log('status: ', status)
      if (!status){
        toast("No drivers are online", "error")
        return setLoading(false)
      }else{
        toast("Found a driver!", "success")
      }
    } 
    toast("Setting order to ORDER READY", "info")
    console.log(order.id)
    await updateOrder(order.id, 
      {
      status: "FoodReady"
      }
       
    )
    toast("Order is Ready!", "success")
    console.log('jk: ', setOrders)  

    setOrders((_orders) => 
    {
      _orders.find((o) => o.id == order.id).status = "FoodReady";
      return _orders
    } )
    setLoading(false)
  }

  return (
    <>
    { row.status == status && 
    <React.Fragment>
      <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
      </Backdrop>
    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      <TableCell>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      <TableCell component="th" scope="row">{row.restaurant?.name ?? "Name not found"}</TableCell>
      <TableCell align="right">{row.items.length}</TableCell>
      {/* <TableCell align="right">{Math.round(row.driverFee * 100) / 100}</TableCell> */}
      <TableCell align="right">{Math.round((row.tax + row.subtotal + Number.EPSILON) * 100) / 100}</TableCell>
      <TableCell align="right">{new Date(row.timestamp).toDateString()} @{new Date(row.timestamp).toLocaleTimeString()}</TableCell>
      {status == "Pending" && <TableCell align="right"><Button onClick={() => makeOrderReady(row)}  variant="contained">Order Ready</Button></TableCell>}
    </TableRow>
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              Order Details
            </Typography>
            <Typography variant="h8" gutterBottom component="div">
            <LocationOnIcon style={{color: 'rgb(51, 51, 51)', marginBottom: '-5px'}}/> <span className="d-none d-md-inline-block">{row.address.formatted}</span> 
            </Typography>
           
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell align="right">Item Amount ($)</TableCell>
                  <TableCell align="right">Total Price ($)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell align="right">{item.price}</TableCell>
                    <TableCell align="right">
                      {Math.round(item.quantity * item.price * 100) / 100}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                    <TableCell colSpan={2} />
                    <TableCell component="th" scope="row">
                     Subtotal
                    </TableCell>
                    <TableCell align="right">{row.subtotal}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} />
                    <TableCell component="th" scope="row">
                     tax
                    </TableCell>
                    <TableCell align="right">{row.tax}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} />
                    <TableCell component="th" scope="row">
                     Total
                    </TableCell>
                    <TableCell align="right">{row.tax + row.subtotal}</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  </React.Fragment>
    }
    </>
    
  );
}

export default function OrderTable({orders: rows, status, setOrders, toast}) {
  console.log("rows", rows)
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Restaurant</TableCell>
            <TableCell align="right"># Of Items</TableCell>
            <TableCell align="right">Total ($)</TableCell>
            <TableCell align="center">Time Placed</TableCell>
            {status=="Pending" && <TableCell align="center">Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <Row key={row.id} row={row} status={status} setOrders={setOrders} toast={toast} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
