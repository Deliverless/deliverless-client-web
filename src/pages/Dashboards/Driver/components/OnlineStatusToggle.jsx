import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

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

export default function OnlineStatusToggle() {
  const [online, setOnline] = useState(false);
  const onChangeHandler = (e) => {
    console.log("toggled", e.target.checked);
    setOnline(e.target.checked);
  };
  return (
    <>
      <Card
        sx={{
          width: 201,
          margin: 1,
          maxHeight: 100,
          display: "inline-block",
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            Set Online Status
          </Typography>
          <div className="row">
            <div className="col">
              <MuiSwitchLarge onChange={onChangeHandler} />
            </div>
            <div className="col p-0 m-0 pr-3">
              <Typography sx={{ fontSize: 16 }}>
                {(online && "Online" || "Offline")}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
