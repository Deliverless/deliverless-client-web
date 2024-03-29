import React, {
  useContext,
  useState,
} from 'react';

import {
  Backdrop,
  CircularProgress,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

import { UserContext } from '../../../../lib/context/userContext';
import { updateDriver } from '../../../../models/driver';

export const MuiSwitchLarge = styled(Switch)(({ theme }) => ({
  width: 105,
  height: 54,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(50px)",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 52,
    height: 52,
  },
  "& .MuiSwitch-track": {
    backgroundColor: "darkred",
    borderRadius: 40 / 2,
  },
}));

export default function OnlineStatusToggle({height = 100}) {
  const { user, setUser } = useContext(UserContext);
  // console.log("driver online", user.driver.online)
  const [online, setOnline] = useState(user.driver ? user.driver.online : false);
  const [loading, setLoading] = useState(false);

  const onChangeHandler = () => {
    setLoading(true);
    updateDriver(user.driver.id, { online: !online }).then((d) => {
      setOnline(!online);
      setLoading(false);
      console.log("driver updated online status", d);
      let updatedUser = {...user}
      updatedUser.driver.online = !online
      setUser(updatedUser)
    });
  };

  return (
    <>
      <Card
        sx={{
          width: 203,
          margin: 1,
          maxHeight: height,
          display: "inline-block",
        }}
      >
        <CardContent style={{height: height}}>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            Set Online Status
          </Typography>
          <div className="row">
            <div className="col">
              <MuiSwitchLarge
                checked={online}
                onChange={onChangeHandler}
                disabled={loading == true}
              />
            </div>
            <div className="col p-0 m-0 pr-3">
              <Typography sx={{ fontSize: 16 }}>
                {(online && "Online") || "Offline"}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
