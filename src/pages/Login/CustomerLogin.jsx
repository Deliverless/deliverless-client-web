import React, { useContext, useState } from "react";
import { Button, TextField, Card } from "@mui/material";
import { UserContext, useAuthorized } from "../../lib/context/userContext";
import User, { login } from "../../models/user";
import { Link, useNavigate } from "react-router-dom";
import { findCustomerByUserId } from "../../models/customer";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Backdrop, CircularProgress } from "@mui/material";

const CustomerLoginPage = () => {
  const [email, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState(null);
  const { logoutUser, setUser } = useContext(UserContext);
  const { enqueueSnackbar: loadSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    if (errors) return;
    else completeLogin();
  };

  const loadingUpdate = (update, variant) => {
    loadSnackbar(update, { variant });
  };

  const completeLogin = async () => {
    setLoading(true);
    loadingUpdate("Authenticating user", "info");
    login(email, password).then(async (user) => {
        loadingUpdate("Authentication complete!", "success");
        setUser(user);
        loadingUpdate("Fetching user metadata", "info");
        user.customer = await findCustomerByUserId(user.id);
        loadingUpdate("Login Successful", "success");
        setUser(user);
        setErrors(null);
        navigate("/");
      })
      .catch((error) => {
        setErrors(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const validate = () => {
    if (email === "" || password === "") {
      setErrors("Please fill out all fields");
    } else {
      setErrors(null);
    }
  };

  const handleChange = (e, input) => {
    if (input === "email") setUsername(e.currentTarget.value);
    else if (input === "password") setPassword(e.currentTarget.value);
  };

  // TODO: submission: pw encryption -> send to BigChain DB - need smart contract*

	return (
    <div className="custBackground main-content center-container" style={{textAlign: 'center', flexDirection: 'column'}}>
      <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
      <Card style={{padding: "60px", borderRadius: "20px", minWidth: '400px'}}>
        <h1>Log In</h1>
        <p>New to deliverless? <Link to="/signup" >Sign Up</Link></p>
        <form className="form-group">
          <TextField onChange={(e) => handleChange(e, "email")} autoFocus required style={{marginBottom: '20px'}} id="outlined-basic" label="Email" variant="outlined" value={email} /><br/>	
          <TextField onChange={(e) => handleChange(e, "password")} required style={{marginBottom: '20px'}} id="outlined-basic" label="Password" type="password" variant="outlined" value={password} /><br/>
          {errors && <div className="alert alert-danger">{errors}</div>}
          <Button onClick={handleSubmit} variant="contained" sx={{height:'56px', backgroundColor:'#2196f3'}}>Sign In</Button>
        </form>
        </Card>
    </div>
);
};

export default function CustomerLogin() {
  return (
    <SnackbarProvider maxSnack={3}>
      <CustomerLoginPage />
    </SnackbarProvider>
  );
}
