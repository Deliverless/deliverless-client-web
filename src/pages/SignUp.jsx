import React from 'react'
import {Button, TextField}  from '@mui/material';
import http from '../lib/api';
// import { create } from '../smartcontracts/entities/user'

const SignUp = () => {


	const [fName, setFName] = React.useState("")
	const [lName, setLName] = React.useState("")
	const [phone, setPhone] = React.useState("")
	const [email, setEmail] = React.useState("")
	const [password, setPassword] = React.useState("")
	const [errors, setErrors] = React.useState(null)
	const [msg, setMsg] = React.useState("")

	const handleSubmit = e => {
		e.preventDefault();
		validate();
		if (errors) return
		else completeSignup()
	}

	const completeSignup = async () => {

		let signUpObj = {
			firstName: fName,
			lastName: lName,
			phone: phone,
			email: email,
			password: password
		}
		// create(signUpObj).then((newUser)=>{
		// 	setFName("");
		// 	setLName("");
		// 	setPhone("");
		// 	setEmail("");
		// 	setPassword("");
		// 	setMsg('Success');
		// });

	}

	const handleChange = (e, input) =>{
		if (input === "email")	setEmail(e.currentTarget.value)
		else if (input === "password") setPassword(e.currentTarget.value)
		else if (input === "fName") setFName(e.currentTarget.value)
		else if (input === "lName") setLName(e.currentTarget.value)
		else if (input === "phone") setPhone(e.currentTarget.value)
	}

	const validate = () =>{
		if(fName === "" || lName === "" || phone === "", email === "" || password === ""){
			setErrors("Please fill out all fields")

		} else {
			setErrors(null)
		}
	}

	// TODO: submission: pw encryption -> send to BigChain DB - need smart contract*
	
	return ( 
		<div className="main-content center-container" style={{textAlign: 'center', flexDirection: 'column'}}>
			<h1>Sign Up for Deliverless</h1>
			{msg && <div className="alert alert-success">{msg}</div>}
			<form className="form-group">
		
				<TextField onChange={(e) => handleChange(e, "fName")} autoFocus required style={{marginBottom: '20px'}} id="outlined-basic" label="First Name" variant="outlined" value={fName} /><br/>	

				<TextField onChange={(e) => handleChange(e, "lName")} required style={{marginBottom: '20px'}} id="outlined-basic" label="Last Name" variant="outlined" value={lName} /><br/>	
				
				<TextField onChange={(e) => handleChange(e, "phone")} required style={{marginBottom: '20px'}} id="outlined-basic" label="Phone Number" variant="outlined" value={phone} /><br/>	

				<TextField onChange={(e) => handleChange(e, "email")} required style={{marginBottom: '20px'}} id="outlined-basic" label="Email" variant="outlined" value={email} /><br/>	
				<TextField onChange={(e) => handleChange(e, "password")} required style={{marginBottom: '20px'}} id="outlined-basic" label="Password" variant="outlined" value={password} /><br/>

				{errors && <div className="alert alert-danger">{errors}</div>}

				<Button onClick={handleSubmit} variant="contained" sx={{height:'56px', backgroundColor:'#2196f3'}}>Sign Up</Button>

			</form>
		</div>
	 );
}
 
export default SignUp;