import React from 'react'
import { TextField, Button } from '@mui/material';


const UpdatePayment = () => {

	const [updateMade, setUpdateMade] = React.useState(false)
	const [cardNum, setCardNum] = React.useState(" ")
	const [expDate, setExpDate] = React.useState(" ")
	const [securityCode, setSecurityCode] = React.useState(" ")
	const [country, setCountry] = React.useState(" ")
	const [postalCode, setPostalCode] = React.useState(" ")


	const handleChange = (e, input) =>{
		if(input==="cardNum") setCardNum(e.currentTarget.value)
		else if(input==="expDate") setExpDate(e.currentTarget.value)
		else if(input==="securityCode") setSecurityCode(e.currentTarget.value)
		else if(input==="country") setCountry(e.currentTarget.value)
		else if(input==="postalCode") setPostalCode(e.currentTarget.value)

		setUpdateMade(true)
	}

	// TODO: get/show payment details based on cust id.
	// TODO: update payment info based on changed inputs (need smart contract)

	return ( 
		<div className="main-content" style={{textAlign: 'center', marginTop:'50px'}}>
			<h1>Update Payment Method</h1>

			<form className="form-group" >
				<TextField className="wide-view" onChange={(e) => handleChange(e, "cardNum")} style={{marginBottom: '20px'}} id="outlined-basic" label="Card Number" variant="outlined" value={cardNum} /><br/>	
				<TextField className="wide-view" onInput={(e) => handleChange(e, "expDate")} style={{marginBottom: '20px'}} id="outlined-basic" label="Expiry Date" variant="outlined" value={expDate} /><br/>	
				<TextField className="wide-view" onInput={(e) => handleChange(e, "securityCode")} style={{marginBottom: '20px'}} id="outlined-basic" label="Security Code" variant="outlined" value={securityCode} /><br/>	
				<TextField className="wide-view" onInput={(e) => handleChange(e, "country")} style={{marginBottom: '20px'}} id="outlined-basic" label="Country" variant="outlined" value={country} /><br/>	
				<TextField className="wide-view" onInput={(e) => handleChange(e, "postalCode")} style={{marginBottom: '20px'}} id="outlined-basic" label="Postal Code" variant="outlined" value={postalCode} /><br/>	
				<Button disabled={!updateMade} variant="contained" sx={{height:'56px', backgroundColor:'#2196f3'}}>Add Card</Button>
			</form>
		</div>
	 );
}
 
export default UpdatePayment;