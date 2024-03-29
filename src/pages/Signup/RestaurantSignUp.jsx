import React from "react";
import { StepLabel } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import { Card, CardActions, CardContent } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import sha256 from "sha256";
import User, { createUser } from "../../models/user";
import Restaurant, { signUpRestaurant } from "../../models/restaurant";
import AddressAutoComplete from "../../components/AddressAutoComplete";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Streetview } from "@material-ui/icons";

export default function RestaurantSignUp() {
  const steps = ["User Details", "Restaurant Details", "Hours of Operation", "Policy Agreement"];

  const [activeStep, setActiveStep] = useState(0);

  const [errors, setErrors] = useState(null);

  const [fName, setFName] = React.useState("");
  const [lName, setLName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [hours, setHours] = React.useState({monday:"", tuesday:"", wednesday:"", thursday:"", friday:"", saturday:"", sunday:""});
  const [monHrs, setMonHrs] = React.useState("");
  const [tuesHrs, setTuesHrs] = React.useState("");
  const [wedHrs, setWedHrs] = React.useState("");
  const [thursHrs, setThursHrs] = React.useState("");
  const [friHrs, setFriHrs] = React.useState("");
  const [satHrs, setSatHrs] = React.useState("");
  const [sunHrs, setSunHrs] = React.useState("");
  const [cuisine, setCuisine] = React.useState("");
  const [imageMain, setImageMain] = React.useState("");
  const [imageCover, setImageCover] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [valid, setValid] = React.useState(false);

  // const [valid, setValid] = useState([{name:"mon", pass: false}, {name:"tues", pass: false}, {name:"wed", pass: false}, 
  //   {name:"thurs", pass: false}, {name:"fri", pass: false}, {name:"sat", pass: false}, {name:"sun", pass: false}]);
  

  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setErrors(null);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleChange = (e, input) => {
    if (input === "email") setUsername(e.currentTarget.value);
    else if (input === "password") setPassword(e.currentTarget.value);
    else if (input === "fName") setFName(e.currentTarget.value);
    else if (input === "lName") setLName(e.currentTarget.value);
    else if (input === "phone") setPhone(e.currentTarget.value);
  };

  const handleRestChange = (e, input) => {
    if (input === "name") setName(e.currentTarget.value);
    else if (input === "address") setAddress(e.currentTarget.value);
    //else if (input === "hours") setHours(e.currentTarget.value);
    else if (input === "cuisine") setCuisine(e.currentTarget.value);
    else if (input === "imageMain") setImageMain(e.currentTarget.value);
    else if (input === "imageCover") setImageCover(e.currentTarget.value);
    else if (input === "monHrs") {
      const reg = new RegExp("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$");    
      setMonHrs(e.target.value)
      setValid(reg.test(e.target.value));

      // setValid(valid.map((day) =>
      // day.name === "mon"
      //     ? { ...day, pass: reg.test(e.target.value) }
      //     : { ...day }))

      //     console.log(monHrs)
      //     console.log(valid[0])
    }
    else if (input === "tuesHrs") {
      setTuesHrs(e.target.value);
      const reg = new RegExp("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$");
      setValid(reg.test(e.target.value));
      
    }
    else if (input === "wedHrs") {
      setWedHrs(e.target.value);
      const reg = new RegExp("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$");
      setValid(reg.test(e.target.value));
    }
    else if (input === "thursHrs") {
      setThursHrs(e.target.value);
      const reg = new RegExp("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$");
      setValid(reg.test(e.target.value));
    }
    else if (input === "friHrs") {
      setFriHrs(e.target.value);
      const reg = new RegExp("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$");
      setValid(reg.test(e.target.value));
    }
    else if (input === "satHrs") {
      setSatHrs(e.target.value);
      const reg = new RegExp("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$");
      setValid(reg.test(e.target.value));
    }
    else if (input === "sunHrs") {
      setSunHrs(e.target.value);
      const reg = new RegExp("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$");
      setValid(reg.test(e.target.value));
    }
  };

  const handleCuisineChange = (event) => {
    setCuisine(event.target.value);
  };





  let newUser = new User(
    "restaurant",
    fName,
    lName,
    "",
    email,
    [],
    phone,
    sha256.x2(email + password),
    []
  );
  //setHours(monHrs, tuesHrs, wedHrs, thursHrs, friHrs, satHrs, sunHrs)
  let newRest = { name, address, hours: {monday: monHrs, tuesday: tuesHrs, wednesday: wedHrs, thursday: thursHrs, friday: friHrs, saturday: satHrs, sunday: sunHrs}, cuisine, images:[{alt:"main", url:imageMain}, {alt:"banner", url:imageCover}] };

  const completeRestSignup = async () => {
    const user = await createUser(newUser)
    console.log(user)
    newRest.userId = user.id
    const rest = await signUpRestaurant(newRest)
    console.log(rest)
  }

  useEffect(() => {
    if (activeStep === steps.length) {
      completeRestSignup()
    }
  }, [activeStep]);

  return (
    <div
      className="container"
      style={{ maxWidth: "800px", marginTop: "100px" }}
    >
      <div>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <div
              className="center-container"
              style={{ textAlign: "center", flexDirection: "column" }}
            >
              <h2 style={{ marginTop: 50 }}>Restaurant has been created!</h2>
              <img loading="lazy" src="/img/cookinganim.gif"></img>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              {activeStep === steps.length - 1 ? (
                <Button
                  onClick={handleNext}
                  disabled={checked === true ? false : true}
                >
                  Finish
                </Button>
              ) : (
                <Button onClick={handleNext}>Next</Button>
              )}

              {/* </Button> */}
            </Box>
          </React.Fragment>
        )}

        {activeStep === 0 && (
          <div
            className="center-container"
            style={{ textAlign: "center", flexDirection: "column" }}
          >
            <h2 style={{ marginBottom: "40px" }}>User Details</h2>

            {errors && <div className="alert alert-danger">{errors}</div>}

            <form className="form-group">
              <TextField
                onChange={(e) => handleChange(e, "fName")}
                autoFocus
                required
                style={{ marginBottom: "20px" }}
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                value={fName}
              />
              <br />

              <TextField
                onChange={(e) => handleChange(e, "lName")}
                required
                style={{ marginBottom: "20px" }}
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                value={lName}
              />
              <br />

              <TextField
                onChange={(e) => handleChange(e, "phone")}
                required
                style={{ marginBottom: "20px" }}
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                value={phone}
              />
              <br />

              <TextField
                onChange={(e) => handleChange(e, "email")}
                required
                style={{ marginBottom: "20px" }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
              />
              <br />
              <TextField
                onChange={(e) => handleChange(e, "password")}
                required
                style={{ marginBottom: "20px" }}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                value={password}
              />
              <br />
              {errors && <div className="alert alert-danger">{errors}</div>}
            </form>
          </div>
        )}

        {activeStep === 1 && (
          <div
            className="center-container"
            style={{ textAlign: "center", flexDirection: "column" }}
          >
            <h2 style={{ marginBottom: "40px" }}>Restaurant Details</h2>

            {errors && <div className="alert alert-danger">{errors}</div>}

            <form className="form-group">
              <TextField
                onChange={(e) => handleRestChange(e, "name")}
                autoFocus
                required
                style={{ marginBottom: "20px" }}
                id="outlined-basic"
                label="Restaurant Name"
                variant="outlined"
                value={name}
              />

              <br />
              <AddressAutoComplete
                setAddress={(address) => {
                  let testObj = {
                    currentTarget: {
                      value: {
                        country: address.country,
                        lat: address.lat,
                        local: address.city,
                        lon: address.lon,
                        postal: address.postcode,
                        region: address.state_code,
                        street: address.housenumber + " " + address.street,
                        type: address.category,
                        unit: "",
                      },
                    },
                  };

                  handleRestChange(testObj, "address");
                }}
              />

              <br />

              <br />
              <InputLabel id="demo-simple-select-label">Cuisine</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={cuisine}
                displayEmpty
                label="Cuisine"
                onChange={handleCuisineChange}
                sx={{ width: "225px" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"American"}>American</MenuItem>
                <MenuItem value={"Asian"}>Asian</MenuItem>
                <MenuItem value={"Barbecue"}>Barbecue</MenuItem>
                <MenuItem value={"Burgers"}>Burgers</MenuItem>
                <MenuItem value={"Chinese"}>Chinese</MenuItem>
                <MenuItem value={"Dessert"}>Dessert</MenuItem>
                <MenuItem value={"Fast Food"}>Fast Food</MenuItem>
                <MenuItem value={"French"}>French</MenuItem>
                <MenuItem value={"Greek"}>Greek</MenuItem>
                <MenuItem value={"Indian"}>Indian</MenuItem>
                <MenuItem value={"Italian"}>Italian</MenuItem>
                <MenuItem value={"Japanese"}>Japanese</MenuItem>
                <MenuItem value={"Korean"}>Korean</MenuItem>
                <MenuItem value={"Mediterranean"}>Mediterranean</MenuItem>
                <MenuItem value={"Mexican"}>Mexican</MenuItem>
                <MenuItem value={"Pizza"}>Pizza</MenuItem>
                <MenuItem value={"Seafood"}>Seafood</MenuItem>
                <MenuItem value={"Thai"}>Thai</MenuItem>
                <MenuItem value={"Vietnamese"}>Vietnamese</MenuItem>
              </Select>
              <br></br>
              <br />
              <TextField
                onChange={(e) => handleRestChange(e, "imageMain")}
                required
                style={{ marginBottom: "20px" }}
                id="outlined-basic"
                label="Main Image (URL)"
                variant="outlined"
              />
              <br />
              <TextField
                onChange={(e) => handleRestChange(e, "imageCover")}
                required
                style={{ marginBottom: "20px" }}
                id="outlined-basic"
                label="Cover Image (URL)"
                variant="outlined"
              />
            </form>
          </div>
        )}

        {activeStep === 2 && (
          <div
            className="center-container"
            style={{ textAlign: "center", flexDirection: "column" }}
          >
            <form className="form-group"></form>
            <h2 style={{ marginBottom: "40px" }}>Restaurant Hours</h2>

            <br />
            <TextField
              onChange={(e) => handleRestChange(e, "monHrs")}
              autoFocus
              required
              style={{ marginBottom: "20px" }}
              id="outlined-basic"
              inputProps={{
                pattern:
                  "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$",
              }}
              label="Monday"
              variant="outlined"
              placeholder="HH:MM-HH:MM"
              // error={!valid.mon}
              error={!valid}
            />
            <br />
            <TextField
              onChange={(e) => handleRestChange(e, "tuesHrs")}
              autoFocus
              required
              style={{ marginBottom: "20px" }}
              id="outlined-basic"
              label="Tuesday"
              variant="outlined"
              placeholder="HH:MM-HH:MM"
              error={!valid}
            />
            <br />
            <TextField
              onChange={(e) => handleRestChange(e, "wedHrs")}
              autoFocus
              required
              style={{ marginBottom: "20px" }}
              id="outlined-basic"
              label="Wednesday"
              variant="outlined"
              placeholder="HH:MM-HH:MM"
              error={!valid}
            />
            <br />
            <TextField
              onChange={(e) => handleRestChange(e, "thursHrs")}
              autoFocus
              required
              style={{ marginBottom: "20px" }}
              id="outlined-basic"
              label="Thursday"
              variant="outlined"
              placeholder="HH:MM-HH:MM"
              error={!valid}
            />
            <br />
            <TextField
              onChange={(e) => handleRestChange(e, "friHrs")}
              autoFocus
              required
              style={{ marginBottom: "20px" }}
              id="outlined-basic"
              label="Friday"
              variant="outlined"
              placeholder="HH:MM-HH:MM"
              error={!valid}
            />
            <br />
            <TextField
              onChange={(e) => handleRestChange(e, "satHrs")}
              autoFocus
              required
              style={{ marginBottom: "20px" }}
              id="outlined-basic"
              label="Saturday"
              variant="outlined"
              placeholder="HH:MM-HH:MM"
              error={!valid}
            />
            <br />
            <TextField
              onChange={(e) => handleRestChange(e, "sunHrs")}
              autoFocus
              required
              style={{ marginBottom: "20px" }}
              id="outlined-basic"
              label="Sunday"
              variant="outlined"
              placeholder="HH:MM-HH:MM"
              error={!valid}
            />
          </div>
        )}

        {activeStep === 3 && (
          console.log(monHrs),
          console.log(tuesHrs),
          console.log(wedHrs),
          console.log(thursHrs),
          console.log(friHrs),
          console.log(satHrs),
          console.log(sunHrs),

          <div
            className="center-container"
            style={{ textAlign: "center", flexDirection: "column" }}
          >
            <h2 style={{ marginBottom: "40px" }}>Policy Agreement</h2>
            <Card
              sx={{
                minWidth: 600,
                overflow: "scroll",
                height: 400,
                marginBottom: 10,
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  <p>
                    <strong>Terms and Conditions</strong>
                  </p>
                  <p>
                    Our Terms and Conditions were last updated on [___DATE___].
                  </p>
                  <p>
                    Please read these terms and conditions carefully before
                    using Our Service.
                  </p>
                  <p>
                    <strong>Interpretation and Definitions</strong>
                  </p>
                  <p>
                    <strong>Interpretation</strong>
                  </p>
                  <p>
                    The words of which the initial letter is capitalized have
                    meanings defined under the following conditions. The
                    following definitions shall have the same meaning regardless
                    of whether they appear in singular or in plural.
                  </p>
                  <p>
                    <strong>Definitions</strong>
                  </p>
                  <p>For the purposes of these Terms and Conditions:</p>
                  <ul>
                    <li>
                      <p>
                        <strong>"Affiliate"</strong> means an entity that
                        controls, is controlled by or is under common control
                        with a party, where "control" means ownership of 50% or
                        more of the shares, equity interest or other securities
                        entitled to vote for election of directors or other
                        managing authority.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>"Account"</strong> means a unique account
                        created for You to access our Service or parts of our
                        Service.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>"Company"</strong> (referred to as either "the
                        Company", "We", "Us" or "Our" in this Agreement) refers
                        to [___COMPANY_INFORMATION___].
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>"Country"</strong> refers to
                        [___COMPANY_COUNTRY___].
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>"Content"</strong> refers to content such as
                        text, images, or other information that can be posted,
                        uploaded, linked to or otherwise made available by You,
                        regardless of the form of that content.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>"Device"</strong> means any device that can
                        access the Service such as a computer, a cellphone or a
                        digital tablet.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>"Feedback"</strong> means feedback, innovations
                        or suggestions sent by You regarding the attributes,
                        performance or features of our Service.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>"Service"</strong> refers to the Website.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>"Terms and Conditions"</strong> (also referred
                        as "Terms" or "Terms of Use") mean these Terms and
                        Conditions that form the entire agreement between You
                        and the Company regarding the use of the Service. This
                        Terms and Conditions Agreement was generated by{" "}
                        <a href="https://www.termsfeed.com/blog/sample-terms-and-conditions-template/">
                          TermsFeed Terms and Conditions Template
                        </a>
                        .
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>"Third-party Social Media Service"</strong>{" "}
                        means any services or content (including data,
                        information, products or services) provided by a
                        third-party that may be displayed, included or made
                        available by the Service.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>"Website"</strong> refers to
                        [___WEBSITE_NAME___], accessible from
                        [___WEBSITE_URL___]
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>"You"</strong> means the individual accessing or
                        using the Service, or the company, or other legal entity
                        on behalf of which such individual is accessing or using
                        the Service, as applicable.
                      </p>
                    </li>
                  </ul>
                  <p>
                    <strong>Acknowledgment</strong>
                  </p>
                  <p>
                    These are the Terms and Conditions governing the use of this
                    Service and the agreement that operates between You and the
                    Company. These Terms and Conditions set out the rights and
                    obligations of all users regarding the use of the Service.
                  </p>
                  <p>
                    Your access to and use of the Service is conditioned on Your
                    acceptance of and compliance with these Terms and
                    Conditions. These Terms and Conditions apply to all
                    visitors, users and others who access or use the Service.
                  </p>
                  <p>
                    By accessing or using the Service You agree to be bound by
                    these Terms and Conditions. If You disagree with any part of
                    these Terms and Conditions then You may not access the
                    Service.
                  </p>
                  <p>
                    You represent that you are over the age of 18. The Company
                    does not permit those under 18 to use the Service.
                  </p>
                  <p>
                    Your access to and use of the Service is also conditioned on
                    Your acceptance of and compliance with the Privacy Policy of
                    the Company. Our Privacy Policy describes Our policies and
                    procedures on the collection, use and disclosure of Your
                    personal information when You use the Application or the
                    Website and tells You about Your privacy rights and how the
                    law protects You. Please read Our Privacy Policy carefully
                    before using Our Service.
                  </p>
                  <p>
                    <strong>User Accounts</strong>
                  </p>
                  <p>
                    When You create an account with Us, You must provide Us
                    information that is accurate, complete, and current at all
                    times. Failure to do so constitutes a breach of the Terms,
                    which may result in immediate termination of Your account on
                    Our Service.
                  </p>
                  <p>
                    You are responsible for safeguarding the password that You
                    use to access the Service and for any activities or actions
                    under Your password, whether Your password is with Our
                    Service or a Third-Party Social Media Service.
                  </p>
                  <p>
                    You agree not to disclose Your password to any third party.
                    You must notify Us immediately upon becoming aware of any
                    breach of security or unauthorized use of Your account.
                  </p>
                  <p>
                    You may not use as a username the name of another person or
                    entity or that is not lawfully available for use, a name or
                    trademark that is subject to any rights of another person or
                    entity other than You without appropriate authorization, or
                    a name that is otherwise offensive, vulgar or obscene.
                  </p>
                  <p>
                    <strong>Content</strong>
                  </p>
                  <p>
                    <strong>Your Right to Post Content</strong>
                  </p>
                  <p>
                    Our Service allows You to post Content. You are responsible
                    for the Content that You post to the Service, including its
                    legality, reliability, and appropriateness.
                  </p>
                  <p>
                    By posting Content to the Service, You grant Us the right
                    and license to use, modify, publicly perform, publicly
                    display, reproduce, and distribute such Content on and
                    through the Service. You retain any and all of Your rights
                    to any Content You submit, post or display on or through the
                    Service and You are responsible for protecting those rights.
                    You agree that this license includes the right for Us to
                    make Your Content available to other users of the Service,
                    who may also use Your Content subject to these Terms.
                  </p>
                  <p>
                    You represent and warrant that: (i) the Content is Yours
                    (You own it) or You have the right to use it and grant Us
                    the rights and license as provided in these Terms, and (ii)
                    the posting of Your Content on or through the Service does
                    not violate the privacy rights, publicity rights,
                    copyrights, contract rights or any other rights of any
                    person.
                  </p>
                  <p>
                    <strong>Content Restrictions</strong>
                  </p>
                  <p>
                    The Company is not responsible for the content of the
                    Service's users. You expressly understand and agree that You
                    are solely responsible for the Content and for all activity
                    that occurs under your account, whether done so by You or
                    any third person using Your account.
                  </p>
                  <p>
                    You may not transmit any Content that is unlawful,
                    offensive, upsetting, intended to disgust, threatening,
                    libelous, defamatory, obscene or otherwise objectionable.
                    Examples of such objectionable Content include, but are not
                    limited to, the following:
                  </p>
                  <ul>
                    <li>Unlawful or promoting unlawful activity.</li>
                    <li>
                      Defamatory, discriminatory, or mean-spirited content,
                      including references or commentary about religion, race,
                      sexual orientation, gender, national/ethnic origin, or
                      other targeted groups.
                    </li>
                    <li>
                      Spam, machine – or randomly – generated, constituting
                      unauthorized or unsolicited advertising, chain letters,
                      any other form of unauthorized solicitation, or any form
                      of lottery or gambling.
                    </li>
                    <li>
                      Containing or installing any viruses, worms, malware,
                      trojan horses, or other content that is designed or
                      intended to disrupt, damage, or limit the functioning of
                      any software, hardware or telecommunications equipment or
                      to damage or obtain unauthorized access to any data or
                      other information of a third person.
                    </li>
                    <li>
                      Infringing on any proprietary rights of any party,
                      including patent, trademark, trade secret, copyright,
                      right of publicity or other rights.
                    </li>
                    <li>
                      Impersonating any person or entity including the Company
                      and its employees or representatives.
                    </li>
                    <li>Violating the privacy of any third person.</li>
                    <li>False information and features.</li>
                  </ul>
                  <p>
                    The Company reserves the right, but not the obligation, to,
                    in its sole discretion, determine whether or not any Content
                    is appropriate and complies with this Terms, refuse or
                    remove this Content. The Company further reserves the right
                    to make formatting and edits and change the manner of any
                    Content. The Company can also limit or revoke the use of the
                    Service if You post such objectionable Content.
                    <br />
                    As the Company cannot control all content posted by users
                    and/or third parties on the Service, you agree to use the
                    Service at your own risk. You understand that by using the
                    Service You may be exposed to content that You may find
                    offensive, indecent, incorrect or objectionable, and You
                    agree that under no circumstances will the Company be liable
                    in any way for any content, including any errors or
                    omissions in any content, or any loss or damage of any kind
                    incurred as a result of your use of any content.
                  </p>
                  <p>
                    <strong>Content Backups</strong>
                  </p>
                  <p>
                    Although regular backups of Content are performed, the
                    Company does not guarantee there will be no loss or
                    corruption of data.
                  </p>
                  <p>
                    Corrupt or invalid backup points may be caused by, without
                    limitation, Content that is corrupted prior to being backed
                    up or that changes during the time a backup is performed.
                  </p>
                  <p>
                    The Company will provide support and attempt to troubleshoot
                    any known or discovered issues that may affect the backups
                    of Content. But You acknowledge that the Company has no
                    liability related to the integrity of Content or the failure
                    to successfully restore Content to a usable state.
                  </p>
                  <p>
                    You agree to maintain a complete and accurate copy of any
                    Content in a location independent of the Service.
                  </p>
                  <p>
                    <strong>Copyright Policy</strong>
                  </p>
                  <p>
                    <strong>Intellectual Property Infringement</strong>
                  </p>
                  <p>
                    We respect the intellectual property rights of others. It is
                    Our policy to respond to any claim that Content posted on
                    the Service infringes a copyright or other intellectual
                    property infringement of any person.
                  </p>
                  <p>
                    If You are a copyright owner, or authorized on behalf of
                    one, and You believe that the copyrighted work has been
                    copied in a way that constitutes copyright infringement that
                    is taking place through the Service, You must submit Your
                    notice in writing to the attention of our copyright agent
                    via email ([___COPYRIGHT_AGENT_CONTACT_EMAIL___]) and
                    include in Your notice a detailed description of the alleged
                    infringement.
                  </p>
                  <p>
                    You may be held accountable for damages (including costs and
                    attorneys' fees) for misrepresenting that any Content is
                    infringing Your copyright.
                  </p>
                  <p>
                    <strong>
                      DMCA Notice and DMCA Procedure for Copyright Infringement
                      Claims
                    </strong>
                  </p>
                  <p>
                    You may submit a notification pursuant to the Digital
                    Millennium Copyright Act (DMCA) by providing our Copyright
                    Agent with the following information in writing (see 17
                    U.S.C 512(c)(3) for further detail):
                  </p>
                  <ul>
                    <li>
                      An electronic or physical signature of the person
                      authorized to act on behalf of the owner of the
                      copyright's interest.
                    </li>
                    <li>
                      A description of the copyrighted work that You claim has
                      been infringed, including the URL (i.e., web page address)
                      of the location where the copyrighted work exists or a
                      copy of the copyrighted work.
                    </li>
                    <li>
                      Identification of the URL or other specific location on
                      the Service where the material that You claim is
                      infringing is located.
                    </li>
                    <li>Your address, telephone number, and email address.</li>
                    <li>
                      A statement by You that You have a good faith belief that
                      the disputed use is not authorized by the copyright owner,
                      its agent, or the law.
                    </li>
                    <li>
                      A statement by You, made under penalty of perjury, that
                      the above information in Your notice is accurate and that
                      You are the copyright owner or authorized to act on the
                      copyright owner's behalf.
                    </li>
                  </ul>
                  <p>
                    You can contact our copyright agent via email
                    ([___COPYRIGHT_AGENT_CONTACT_EMAIL___]). Upon receipt of a
                    notification, the Company will take whatever action, in its
                    sole discretion, it deems appropriate, including removal of
                    the challenged content from the Service.
                  </p>
                  <p>
                    <strong>Intellectual Property</strong>
                  </p>
                  <p>
                    The Service and its original content (excluding Content
                    provided by You or other users), features and functionality
                    are and will remain the exclusive property of the Company
                    and its licensors.
                  </p>
                  <p>
                    The Service is protected by copyright, trademark, and other
                    laws of both the Country and foreign countries.
                  </p>
                  <p>
                    Our trademarks and trade dress may not be used in connection
                    with any product or service without the prior written
                    consent of the Company.
                  </p>
                  <p>
                    <strong>Your Feedback to Us</strong>
                  </p>
                  <p>
                    You assign all rights, title and interest in any Feedback
                    You provide the Company. If for any reason such assignment
                    is ineffective, You agree to grant the Company a
                    non-exclusive, perpetual, irrevocable, royalty free,
                    worldwide right and license to use, reproduce, disclose,
                    sub-license, distribute, modify and exploit such Feedback
                    without restriction.
                  </p>
                  <p>
                    <strong>Links to Other Websites</strong>
                  </p>
                  <p>
                    Our Service may contain links to third-party web sites or
                    services that are not owned or controlled by the Company.
                  </p>
                  <p>
                    The Company has no control over, and assumes no
                    responsibility for, the content, privacy policies, or
                    practices of any third party web sites or services. You
                    further acknowledge and agree that the Company shall not be
                    responsible or liable, directly or indirectly, for any
                    damage or loss caused or alleged to be caused by or in
                    connection with the use of or reliance on any such content,
                    goods or services available on or through any such web sites
                    or services.
                  </p>
                  <p>
                    We strongly advise You to read the terms and conditions and
                    privacy policies of any third-party web sites or services
                    that You visit.
                  </p>
                  <p>
                    <strong>Termination</strong>
                  </p>
                  <p>
                    We may terminate or suspend Your Account immediately,
                    without prior notice or liability, for any reason
                    whatsoever, including without limitation if You breach these
                    Terms and Conditions.
                  </p>
                  <p>
                    Upon termination, Your right to use the Service will cease
                    immediately. If You wish to terminate Your Account, You may
                    simply discontinue using the Service.
                  </p>
                  <p>
                    <strong>Limitation of Liability</strong>
                  </p>
                  <p>
                    Notwithstanding any damages that You might incur, the entire
                    liability of the Company and any of its suppliers under any
                    provision of this Terms and Your exclusive remedy for all of
                    the foregoing shall be limited to the amount actually paid
                    by You through the Service or 100 USD if You haven't
                    purchased anything through the Service.
                  </p>
                  <p>
                    To the maximum extent permitted by applicable law, in no
                    event shall the Company or its suppliers be liable for any
                    special, incidental, indirect, or consequential damages
                    whatsoever (including, but not limited to, damages for loss
                    of profits, loss of data or other information, for business
                    interruption, for personal injury, loss of privacy arising
                    out of or in any way related to the use of or inability to
                    use the Service, third-party software and/or third-party
                    hardware used with the Service, or otherwise in connection
                    with any provision of this Terms), even if the Company or
                    any supplier has been advised of the possibility of such
                    damages and even if the remedy fails of its essential
                    purpose.
                  </p>
                  <p>
                    Some states do not allow the exclusion of implied warranties
                    or limitation of liability for incidental or consequential
                    damages, which means that some of the above limitations may
                    not apply. In these states, each party's liability will be
                    limited to the greatest extent permitted by law.
                  </p>
                  <p>
                    <strong>"AS IS" and "AS AVAILABLE" Disclaimer</strong>
                  </p>
                  <p>
                    The Service is provided to You "AS IS" and "AS AVAILABLE"
                    and with all faults and defects without warranty of any
                    kind. To the maximum extent permitted under applicable law,
                    the Company, on its own behalf and on behalf of its
                    Affiliates and its and their respective licensors and
                    service providers, expressly disclaims all warranties,
                    whether express, implied, statutory or otherwise, with
                    respect to the Service, including all implied warranties of
                    merchantability, fitness for a particular purpose, title and
                    non-infringement, and warranties that may arise out of
                    course of dealing, course of performance, usage or trade
                    practice. Without limitation to the foregoing, the Company
                    provides no warranty or undertaking, and makes no
                    representation of any kind that the Service will meet Your
                    requirements, achieve any intended results, be compatible or
                    work with any other software, applications, systems or
                    services, operate without interruption, meet any performance
                    or reliability standards or be error free or that any errors
                    or defects can or will be corrected.
                  </p>
                  <p>
                    Without limiting the foregoing, neither the Company nor any
                    of the company's provider makes any representation or
                    warranty of any kind, express or implied: (i) as to the
                    operation or availability of the Service, or the
                    information, content, and materials or products included
                    thereon; (ii) that the Service will be uninterrupted or
                    error-free; (iii) as to the accuracy, reliability, or
                    currency of any information or content provided through the
                    Service; or (iv) that the Service, its servers, the content,
                    or e-mails sent from or on behalf of the Company are free of
                    viruses, scripts, trojan horses, worms, malware, timebombs
                    or other harmful components.
                  </p>
                  <p>
                    Some jurisdictions do not allow the exclusion of certain
                    types of warranties or limitations on applicable statutory
                    rights of a consumer, so some or all of the above exclusions
                    and limitations may not apply to You. But in such a case the
                    exclusions and limitations set forth in this section shall
                    be applied to the greatest extent enforceable under
                    applicable law.
                  </p>
                  <p>
                    <strong>Governing Law</strong>
                  </p>
                  <p>
                    The laws of the Country, excluding its conflicts of law
                    rules, shall govern this Terms and Your use of the Service.
                    Your use of the Application may also be subject to other
                    local, state, national, or international laws.
                  </p>
                  <p>
                    <strong>Disputes Resolution</strong>
                  </p>
                  <p>
                    If You have any concern or dispute about the Service, You
                    agree to first try to resolve the dispute informally by
                    contacting the Company.
                  </p>
                  <p>
                    <strong>For European Union (EU) Users</strong>
                  </p>
                  <p>
                    If You are a European Union consumer, you will benefit from
                    any mandatory provisions of the law of the country in which
                    you are resident in.
                  </p>
                  <p>
                    <strong>United States Legal Compliance</strong>
                  </p>
                  <p>
                    You represent and warrant that (i) You are not located in a
                    country that is subject to the United States government
                    embargo, or that has been designated by the United States
                    government as a "terrorist supporting" country, and (ii) You
                    are not listed on any United States government list of
                    prohibited or restricted parties.
                  </p>
                  <p>
                    <strong>Severability and Waiver</strong>
                  </p>
                  <p>
                    <strong>Severability</strong>
                  </p>
                  <p>
                    If any provision of these Terms is held to be unenforceable
                    or invalid, such provision will be changed and interpreted
                    to accomplish the objectives of such provision to the
                    greatest extent possible under applicable law and the
                    remaining provisions will continue in full force and effect.
                  </p>
                  <p>
                    <strong>Waiver</strong>
                  </p>
                  <p>
                    Except as provided herein, the failure to exercise a right
                    or to require performance of an obligation under these Terms
                    shall not effect a party's ability to exercise such right or
                    require such performance at any time thereafter nor shall be
                    the waiver of a breach constitute a waiver of any subsequent
                    breach.
                  </p>
                  <p>
                    <strong>Translation Interpretation</strong>
                  </p>
                  <p>
                    These Terms and Conditions may have been translated if We
                    have made them available to You on our Service.
                    <br />
                    You agree that the original English text shall prevail in
                    the case of a dispute.
                  </p>
                  <p>
                    <strong>Changes to These Terms and Conditions</strong>
                  </p>
                  <p>
                    We reserve the right, at Our sole discretion, to modify or
                    replace these Terms at any time. If a revision is material
                    We will make reasonable efforts to provide at least 30 days'
                    notice prior to any new terms taking effect. What
                    constitutes a material change will be determined at Our sole
                    discretion.
                  </p>
                  <p>
                    By continuing to access or use Our Service after those
                    revisions become effective, You agree to be bound by the
                    revised terms. If You do not agree to the new terms, in
                    whole or in part, please stop using the website and the
                    Service.
                  </p>
                  <p>
                    <strong>Contact Us</strong>
                  </p>
                  <p>
                    If you have any questions about these Terms and Conditions,
                    You can contact us:
                  </p>
                  <ul>
                    <li>
                      By visiting this page on our website:
                      [___WEBSITE_CONTACT_PAGE_URL___]
                    </li>
                    <li>
                      By sending us an email: [___WEBSITE_CONTACT_EMAIL___]
                    </li>
                  </ul>
                  <p></p>
                </Typography>
              </CardContent>
              <CardActions>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox checked={checked} onChange={handleChecked} />
                    }
                    label="I Agree"
                  />
                </FormGroup>
              </CardActions>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
