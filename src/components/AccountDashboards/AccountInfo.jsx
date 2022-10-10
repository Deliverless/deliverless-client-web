import React, {
  useContext,
  useEffect,
} from 'react';

import {
  Button,
  TextField,
} from '@mui/material';

import { UserContext } from '../../lib/context/userContext';
import { updateUser } from '../../models/user';

const AccountInfo = ({firstName, lastName, email, address, encoded}) => {

	const [updateMade, setUpdateMade] = React.useState(false)
	const [defaultValues, setDefaultValues] = React.useState({firstname:firstName, lastname:lastName, email:email, address:address})
	const [changeFlags, setChangeFlags] = React.useState({firstName:false, lastName:false, email:false, address:false});

	const [fields, setFields] = React.useState({firstName:firstName, lastName:lastName, email:email, address:address});
	const [fName, setFName] = React.useState(firstName)
	const [lName, setLName] = React.useState(lastName)
	const [emailAddress, setEmailAddress] = React.useState(email)
	const [deliveryAddress, setDeliveryAddress] = React.useState(address)
	const [msg, setMsg] = React.useState("")
	const { setUser,user } = useContext(UserContext);

	const handleChange = (e, input) =>{
		if(input==="firstname"){
			e.currentTarget.defaultValue = defaultValues[input]
			setFields({...fields,firstName:e.currentTarget.value})
			if(e.currentTarget.value != e.currentTarget.defaultValue)
				setChangeFlags({...changeFlags, firstName: true})
			else
				setChangeFlags({...changeFlags, firstName: false})
			
		}
		else if(input==="lastname"){
			e.currentTarget.defaultValue = defaultValues[input]
			setFields({...fields,lastName:e.currentTarget.value})
			if(e.currentTarget.value != e.currentTarget.defaultValue)
				setChangeFlags({...changeFlags, lastName: true})
			else
				setChangeFlags({...changeFlags, lastName: false})
		}
		else if(input==="email"){
			e.currentTarget.defaultValue = defaultValues[input]
			setFields({...fields,email:e.currentTarget.value})
			if(e.currentTarget.value != e.currentTarget.defaultValue)
				setChangeFlags({...changeFlags, email: true})
			else
				setChangeFlags({...changeFlags, email: false})
		}
		else if(input==="address"){
			e.currentTarget.defaultValue = defaultValues[input]
			setFields({...fields,address:e.currentTarget.value})
			if(e.currentTarget.value != e.currentTarget.defaultValue)
				setChangeFlags({...changeFlags, address: true})
			else
				setChangeFlags({...changeFlags, address: false})
		}
	}

	useEffect(async() =>{
		if(Object.values(changeFlags).every(f=>f==false)){
			console.log(changeFlags)
			setUpdateMade(false)
		}else{
			console.log(changeFlags)
			setUpdateMade(true)
		}
		
	}, [changeFlags])

	const saveUserChanges = ()=>{
		let newData = {}
		for(let flag in changeFlags){
			if(!changeFlags[flag]) continue
			newData[flag] = fields[flag]
		}
		console.table(newData)
		console.log("encoded",encoded)
		if(Object.keys(newData).length > 0){
			updateUser(user.id, {...newData}).then((updatedAsset)=>{
				setMsg('Success')
				setUser(updatedAsset)
				setDefaultValues({firstname:updatedAsset.firstName, lastname:updatedAsset.lastName, email:updatedAsset.email, address:updatedAsset.address})
				setChangeFlags({firstName:false, lastName:false, email:false, address:false})
			});
		}
		
			
	}

	// TODO: save new account info in BigChain DB - referencing id (need smart contract)

	return ( 
		<div className="main-content" style={{textAlign: 'center', marginTop:'50px'}}>
			<h1>Account Info</h1>
			<form className="form-group" >
				{msg && <div className="alert alert-success">{msg}</div>}
				<TextField className="wide-view" onChange={(e) => handleChange(e, "firstname")} style={{marginBottom: '20px'}} label="First Name" id="outlined-basic" variant="outlined" value={fields["firstName"]}/><br/>	
				<TextField className="wide-view" onChange={(e) => handleChange(e, "lastname")} style={{marginBottom: '20px'}} label="Last Name" id="outlined-basic" variant="outlined" value={fields["lastName"]}/><br/>	
				<TextField className="wide-view" onChange={(e) => handleChange(e, "email")} style={{marginBottom: '20px'}} label="Email" id="outlined-basic" variant="outlined" value={fields["email"]}/><br/>	
				{/* /* TODO: field needs address api validation */}
				<TextField className="wide-view" multiline onChange={(e) => handleChange(e, "address")} style={{marginBottom: '20px'}} label="Address"  id="outlined-basic" variant="outlined" value={fields["address"]}/><br/>	
				<Button onClick={saveUserChanges} disabled={!updateMade} variant="contained" sx={{height:'56px', backgroundColor:'#2196f3'}}>Save</Button>
			</form>
		</div>
	 );
}
 
export default AccountInfo;