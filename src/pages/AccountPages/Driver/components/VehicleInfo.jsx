import React, { useContext, useEffect} from 'react'
import { TextField, Button, Avatar } from '@mui/material';
import { getVehicle, updateVehicle } from '../../../../models/vehicle'
import { updateDriver } from '../../../../models/driver'
import { UserContext } from '../../../../lib/context/userContext'
import LinearProgress from "@mui/material/LinearProgress";
import AddressAutoComplete from '../../../../components/AddressAutoComplete';

const VehicleInfo = () => {

  const [loaded, setLoaded] = React.useState(false);
	const [updateMade, setUpdateMade] = React.useState(false)
	const [defaultValues, setDefaultValues] = React.useState({make:"", model:"", licensePlate:"", year:"", 
  color:"", numberOfPassengers:"", image:"", description:""})
	
  const [changeFlags, setChangeFlags] = React.useState({make:false, model:false, licensePlate:false, year:false, 
    color:false, numberOfPassengers:false, image:false, description:false});
	const [fields, setFields] = React.useState({make:"", model:"", licensePlate:"", year:"", color:"", numberOfPassengers:"", image:"", description:""});
	const [msg, setMsg] = React.useState("")
	const { setUser,user } = useContext(UserContext);
	const [city, setCity] = React.useState(user.driver.city)

  useEffect(() => {
    getVehicleObj();
  }, []);

	useEffect(() => {
    console.log("handle city changed called")
		if (user.driver.city != city)
			setUpdateMade(true);
		else
			setUpdateMade(false);
		
  }, [city]);


    // TODO: pull data from BigChain DB using smart contract
    const getVehicleObj = async () => {

      const fetchedVehicle = await getVehicle(user.driver.vehicleId);
      setDefaultValues(fetchedVehicle)
      setFields(fetchedVehicle)
      setLoaded(true);
    }

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

	const saveVehicleChanges = ()=>{

		if(user.driver.city != city){
			updateDriver(user.driver.id, {city}).then( (res) => {
				console.log(res)
			})
			let updatedUser = {...user}
			updatedUser.driver.city = city
			setUser(updatedUser)
		}

		let newData = {}
		for(let flag in changeFlags){
			if(!changeFlags[flag]) continue
			newData[flag] = fields[flag]
		}
		console.table(newData)
		if(Object.keys(newData).length > 0){
			updateVehicle(user.driver.vehicleId, {...newData}).then((updatedAsset)=>{
				setMsg('Success')
				//setUser(updatedAsset)
				setDefaultValues({make:updatedAsset.make, model:updatedAsset.model, licensePlate:updatedAsset.licensePlate, year:updatedAsset.year,
           color:updatedAsset.color, numberOfPassengers:updatedAsset.numberOfPassengers, image:updatedAsset.image, description:updatedAsset.description})
				setChangeFlags({make:false, model:false, licensePlate:false, year:false, color:false, numberOfPassengers:false, image:false, description:false});
				setUpdateMade(false)
			});
		}
	}

	// TODO: save new account info in BigChain DB - referencing id (need smart contract)

  if (!loaded) {
    return (
      <div
        className="main-content center-container"
        style={{ flexDirection: "column" }}
      >
        Loading Vehicle
        <LinearProgress style={{ width: 345, margin: "20px auto" }} />
      </div>
    );
  }

	return ( 
		<div className="center-container" style={{textAlign: 'center', marginTop:'50px', flexDirection: "column"}}>
			<h1>Vehicle Info</h1>
			<form className="form-group" >
				{msg && <div className="alert alert-success">{msg}</div>}
        <Avatar alt="Remy Sharp" src={defaultValues.image} sx={{height: 100, width: 100, margin: "15px auto",
    boxShadow: "0px 0px 10px lightgrey" }} />
				<TextField className="wide-view" onChange={(e) => handleChange(e, "make")} style={{marginBottom: '20px'}} label="Make" id="outlined-basic" variant="outlined" value={fields["make"]}/><br/>	
				<TextField className="wide-view" onChange={(e) => handleChange(e, "model")} style={{marginBottom: '20px'}} label="Model" id="outlined-basic" variant="outlined" value={fields["model"]}/><br/>	
				<TextField className="wide-view" onChange={(e) => handleChange(e, "licensePlate")} style={{marginBottom: '20px'}} label="License Plate" id="outlined-basic" variant="outlined" value={fields["licensePlate"]}/><br/>
        <TextField className="wide-view" onChange={(e) => handleChange(e, "year")} style={{marginBottom: '20px'}} label="Year" id="outlined-basic" variant="outlined" value={fields["year"]}/><br/>	
				<TextField className="wide-view" onChange={(e) => handleChange(e, "color")} style={{marginBottom: '20px'}} label="Color" id="outlined-basic" variant="outlined" value={fields["color"]}/><br/>	
        <TextField className="wide-view" onChange={(e) => handleChange(e, "image")} style={{marginBottom: '20px'}} label="Image URL" id="outlined-basic" variant="outlined" value={fields["image"]}/><br/>	
				{/* <TextField className="wide-view" onChange={(e) => handleChange(e, "description")} style={{marginBottom: '20px'}} label="Description" id="outlined-basic" variant="outlined" value={fields["description"]}/><br/> */}
				<AddressAutoComplete init={{formatted:user.driver.city}} label="Enter City" params={"&type=city"} setAddress={(address)=>setCity(address?.formatted)}/>
				<Button onClick={saveVehicleChanges} disabled={!updateMade} variant="contained" sx={{height:'56px', marginTop:'20px', backgroundColor:'#2196f3'}}>Save</Button>
			</form>
		</div>
	 );

}
 
export default VehicleInfo;