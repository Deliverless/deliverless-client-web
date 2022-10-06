import React, { useContext, useEffect} from 'react'
import { TextField, Button } from '@mui/material';
import { updateUser } from '../../../../models/user'
import { UserContext, useAuthorized } from '../../../../lib/context/userContext'

const AccountInfo = ({firstName, lastName, email, address, encoded}) => {

	const [updateMade, setUpdateMade] = React.useState(false)
	const [defaultValues, setDefaultValues] = React.useState({firstName, lastName, email, address})
	const [changeFlags, setChangeFlags] = React.useState({firstName:false, lastName:false, email:false, address:false});
	const [fields, setFields] = React.useState({firstName, lastName, email, address});
	const [msg, setMsg] = React.useState("")
	const { setUser,user } = useContext(UserContext);

	//detect field change comparing default with current value, setting change flag to true if different
	const handleChange = (e, input) =>{
		e.currentTarget.defaultValue = defaultValues[input]
		let _fields = {...fields}
		_fields[input] = e.currentTarget.value
		setFields(_fields)
		let flags = {...changeFlags}
		if(e.currentTarget.value != e.currentTarget.defaultValue){
			flags[input] = true
			setChangeFlags(flags)
		}else{
			flags[input] = false
			setChangeFlags(flags)
		}
	}
	//responsible for enabling/disabling save button
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
				setDefaultValues({firstName:updatedAsset.firstName, lastName:updatedAsset.lastName, email:updatedAsset.email, address:updatedAsset.address})
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
				<TextField className="wide-view" onChange={(e) => handleChange(e, "firstName")} style={{marginBottom: '20px'}} label="First Name" id="outlined-basic" variant="outlined" value={fields["firstName"]}/><br/>	
				<TextField className="wide-view" onChange={(e) => handleChange(e, "lastName")} style={{marginBottom: '20px'}} label="Last Name" id="outlined-basic" variant="outlined" value={fields["lastName"]}/><br/>	
				<TextField className="wide-view" onChange={(e) => handleChange(e, "email")} style={{marginBottom: '20px'}} label="Email" id="outlined-basic" variant="outlined" value={fields["email"]}/><br/>	
				{/* /* TODO: field needs address api validation */}
				<TextField className="wide-view" multiline onChange={(e) => handleChange(e, "address")} style={{marginBottom: '20px'}} label="Address"  id="outlined-basic" variant="outlined" value={fields["address"]}/><br/>	
				<Button onClick={saveUserChanges} disabled={!updateMade} variant="contained" sx={{height:'56px', backgroundColor:'#2196f3'}}>Save</Button>
			</form>
		</div>
	 );
}
 
export default AccountInfo;