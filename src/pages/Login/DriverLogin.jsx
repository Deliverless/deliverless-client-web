import React, { useContext } from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import {
  Button,
  TextField,
} from '@mui/material';

import { UserContext } from '../../lib/context/userContext';
import { findDriverByUserId } from '../../models/driver';
import { login } from '../../models/user';

const Login = () => {

	const [email, setUsername] = React.useState("")
	const [password, setPassword] = React.useState("")
	const [errors, setErrors] = React.useState(null)
	const { logoutUser, setUser } = useContext(UserContext);
	const navigate = useNavigate()

	const handleSubmit = e => {
		e.preventDefault();
		validate();
		if (errors) return
		else completeLogin()
	}

	const completeLogin = async () => {

		login(email, password).then(async user => {
			setUser(user)
			navigate('/');
			user.driver = await findDriverByUserId(user.id)
			setUser(user)
			setErrors(null)
		}).catch(error => {
			setErrors(error.message)
		})
	}

	const validate = () =>{
		if(email === "" || password === ""){
			setErrors("Please fill out all fields")

		} else {
			setErrors(null)
		}
	}


	const handleChange = (e, input) =>{
		if (input === "email")	setUsername(e.currentTarget.value)
		else if (input === "password") setPassword(e.currentTarget.value)
	}

	// TODO: submission: pw encryption -> send to BigChain DB - need smart contract*
	
	return (
			<div className="main-content center-container" style={{textAlign: 'center', flexDirection: 'column'}}>
					<h1>Driver Log In</h1>
					<p>Want to become a driver? <Link to="/driver/signup" >Sign Up</Link></p>
					<form className="form-group">
						<TextField onChange={(e) => handleChange(e, "email")} autoFocus required style={{marginBottom: '20px'}} id="outlined-basic" label="Email" variant="outlined" value={email} /><br/>	
						<TextField onChange={(e) => handleChange(e, "password")} required style={{marginBottom: '20px'}} id="outlined-basic" label="Password" variant="outlined" value={password} /><br/>
						{errors && <div className="alert alert-danger">{errors}</div>}
						<Button onClick={handleSubmit} variant="contained" sx={{height:'56px', backgroundColor:'#2196f3'}}>Sign In</Button>
					</form>
			</div>
	);
}
 
export default Login;