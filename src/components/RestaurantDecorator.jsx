

import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom'

//this code is a mess, idk how to use react but it works so I don't care anymore.
export const RestaurantDecorator = (props, label)=> {
  console.log("node", props.nodeobj)
    return (
        <>
          <div 
          className="fade-in"
          style={{
            width:'250px', 
            height: '90px', 
            boxShadow: '1px 1px 5px grey',
            position: 'absolute',
            top:'-10px',
            left: '-30px',
            pointerEvents: 'none',
            transition: 'all .3s',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                boxShadow: '0 0 0 80px white',
                position: 'absolute',
                top: '9px',
                left: '4px',
                pointerEvents: 'none',

              }} />
          </div>

          <Link
            to={`/restaurants/${props.nodeobj.savedLabel}`}
            >
            <div 
              className="fade-in"
              style={{
                height: '90px',
                width: '192px',
                position: 'absolute',
                borderRadius: '10px',
                top: '-10px',
                left: '28px',
                backgroundColor:"white",
                transition: 'all .3s',
                paddingLeft: '20px',
                cursor:'pointer',
                color: 'black'
              }}>
                <h4>{label}</h4>
          
                {`${props.nodeobj.address.street}` }
                <Typography variant="body2" color="text.secondary">
                  {Math.round(props.nodeobj.delivery_eta)} - {Math.round(((props.nodeobj.delivery_eta * 60) + (15 * 60)) / 60)} min • {props.nodeobj.distance} km
                </Typography>
            </div>
          </Link>
        </>
    );
  }