import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Controls from "../../../components/controls/Controls";
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox , Typography , AppBar} from '@material-ui/core';
// import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import {
  Box
} from '@material-ui/core';
import axios from 'axios';
import { useForm, Form } from '../../../components/useForm';
// import { ReactMultiEmailCustom } from 'react-multi-email-custom';
// import 'react-multi-email-custom/style.css';
import PersonalData from './PersonalStudentData'
import AcademicData from './AcademicData'
import PastAcademicData from './PastAcademicData'


const initialFValues = {
  id: 0,
  user: {
    email: "",
    first_name: "",
    last_name: ""
  },
  gender: "M",
  isDeleted: false,
  isProfileComplete: false
}

// eslint-disable-next-line no-lone-blocks
{/*const ProfileDetails = ({ className, userData, ...rest }) => {
  const classes = useStyles();
  // const [emails,setEmails] = useState([])
  // const myStyle = {};
  const [values, setValues] = useState({
    "email" : "",
    "first_name" : "",
    "last_name" : "",
    "gender" : "M",
    "group" : 0,
    "id" : 0,
  });

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('first_name' in fieldValues)
      temp.first_name = fieldValues.first_name ? "" : "This field is required."
    if ('last_name' in fieldValues)
      temp.last_name = fieldValues.last_name ? "" : "This field is required."
    if ('email' in fieldValues)
      temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
    setErrors({
      ...temp
    })

    if (fieldValues == values)
      return Object.values(temp).every(x => x == "")
  }
  const {
    valuess,
    setValuess,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault()
    console.log("e",e);
    
    if (validate()) {
      const data = {
        "user": {
          "email": values.email,
          "first_name": values.first_name,
          "last_name": values.last_name
        },
        "gender": values.gender,
      }

      axios.patch("https://tnpvision-cors.herokuapp.com/https://tnpvisionapi.herokuapp.com/api/student/" + values.id, data)
        .then(res =>{
          console.log("res", res);
        }).catch(error => {
          console.log(error);
          
        });
    }
  }

  useEffect(() =>{
    if(userData !=null){
      setValues({
        ...values,
        "email" : userData.email,
        "first_name" : userData.first_name,
        "last_name" : userData.last_name,
        "gender" : userData.gender,
        "group" : userData.group,
        "id" : userData.id,
      })
    }
  },[userData])
 

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Student Profile"
        />
        <Divider />
        <CardContent>

          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="first_name"
                onChange={handleChange}
                required
                value={values.first_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="last_name"
                onChange={handleChange}
                required
                value={values.last_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              /> 
              <Controls.RadioGroup
                name="gender"
                label="Gender"
                value={values.gender}
                onChange={handleChange}
                items={genderItems}
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <FormControl>
                <FormControlLabel
                  control={<MuiCheckbox
                    name="isProfileComplete"
                    disabled
                    color="primary"
                    checked={values.isProfileComplete}
                  />}
                  label="Is Profile Completed  ?"
                />
              </FormControl>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormControl>
                <FormControlLabel
                  control={<MuiCheckbox
                    name="isDeleted"
                    disabled
                    color="primary"
                    checked={values.isDeleted}
                  />}
                  label="Is Deleted ?"
                />
              </FormControl>
              <FormControl>
              <ReactMultiEmailCustom
                style={myStyle}
                emails={emails}
                onChange={_emails => {
                  setEmails(_emails);
                }}
                getLabel={(
                  email,
                  index,
                  removeEmail,
                ) => {
                  return (
                    <label key={index}>
                      {email}
                      <HighlightOffIcon color="secondary" name="delete" onClick={() => removeEmail(index)} />
                    </label>
                  );
                }}
              />
            </FormControl>
            <FormControl>
              <label>react-multi-email-custom value</label>
              {emails.join(', ') || 'empty'}
            </FormControl> 
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
    );
};*/}


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ProfileDetails({ className, userData, ...rest }) {

  const [values, setValues] = useState({
    "email" : "",
    "first_name" : "",
    "last_name" : "",
    "gender" : "M",
    "group" : 0,
    "id" : 0,

    "phone" : "",
    "category" : "",
    "pan" : "",
    "aadhar" : "",
    "dob" : "",
    "hometown" : "",

    "tenthpercentage": "60",
    "tenthboard": "",
    "tenthyear": "",
    "twelfthpercenatge": "60",
    "twelfthboard": "",
    "twelfthyear": "",
    "diplomapercentage": "60",
    "diplomaboard": "",
    "diplomayear": "",
    "enggqualifyyear": "",
    "enggqualifyscore": "",

    "college": "",
    "branch": "",
    "yearofstudy": "",
    "prn": "",
    "sem1sgpa":"",
    "sem1percentage":"",
    "sem2sgpa":"",
    "sem2percentage":"",
    "sem3sgpa":"",
    "sem3percentage":"",
    "sem4sgpa":"",
    "sem4percentage":"",
    "sem5sgpa":"",
    "sem5percentage":"",
    "enggaggregateper":"",
    "enggaggregatesgpa": "",
    "live": "",
    "dead": "",
    "gaps": "",
    "yd": "",

  });

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('first_name' in fieldValues)
      temp.first_name = fieldValues.first_name ? "" : "This field is required."
    if ('last_name' in fieldValues)
      temp.last_name = fieldValues.last_name ? "" : "This field is required."
    if ('email' in fieldValues)
      temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
    setErrors({
      ...temp
    })
    if (fieldValues === values)
      return Object.values(temp).every(x => x === "")
  }

  const {
    valuess,
    setValuess,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate);


  useEffect(() =>{
    if(userData !=null){
      setValues({
        ...values,
        "email" : userData.email,
        "first_name" : userData.first_name,
        "last_name" : userData.last_name,
        "gender" : userData.gender,
        "group" : userData.group,
        "id" : userData.id,

        "phone" : userData.phone,
        "category" : userData.category,
        "pan" : userData.pan,
        "aadhar" : userData.aadhar,
        "dob" : userData.dob,
        "hometown" : userData.hometown,

        "tenthpercentage": userData.tenthpercentage,
        "tenthboard": userData.tenthboard,
        "tenthyear": userData.tenthyear,
        "twelfthpercenatge": userData.twelfthpercenatge,
        "twelfthboard": userData.twelfthboard,
        "twelfthyear": userData.twelfthyear,
        "diplomapercentage": userData.diplomapercentage,
        "diplomaboard": userData.diplomaboard,
        "diplomayear": userData.diplomayear,
        "enggqualifyyear": userData.enggqualifyyear,
        "enggqualifyscore": userData.enggqualifyscore,

        "college": userData.college,
        "branch": userData.branch,
        "yearofstudy": userData.yearofstudy,
        "prn": userData.prn,
        "sem1sgpa": userData.sem1sgpa,
        "sem1percentage": userData.sem1percentage,
        "sem2sgpa":userData.sem2sgpa,
        "sem2percentage": userData.sem2percentage,
        "sem3sgpa": userData.sem3sgpa,
        "sem3percentage": userData.sem3percentage,
        "sem4sgpa": userData.sem4sgpa,
        "sem4percentage": userData.sem4percentage,
        "sem5sgpa": userData.sem5sgpa,
        "sem5percentage": userData.sem5percentage,
        "enggaggregateper": userData.enggaggregateper,
        "enggaggregatesgpa": userData.enggaggregatesgpa,
        "live": userData.live,
        "dead": userData.dead,
        "gaps": userData.gaps,
        "yd": userData.yd,
      })
    }
  },[userData]);


  const [value, setValue] = React.useState(0);

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <div >
      <AppBar position="static">
        <Tabs value={value} onChange={handleChangeTabs} aria-label="simple tabs example">
          <Tab label="Personal Details" {...a11yProps(0)} />
          <Tab label="Academic Details" {...a11yProps(1)} />
          <Tab label="Past Academic Details" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

       <TabPanel value={value} index={0}>
          <PersonalData userData={userData}/>  
       </TabPanel>
       <TabPanel value={value} index={1}>
          <AcademicData userData={userData}/>
       </TabPanel>
       <TabPanel value={value} index={2}>
          <PastAcademicData userData={userData}/>
      </TabPanel>
    </div>
  );
}


// eslint-disable-next-line no-lone-blocks
{/*ProfileDetails.propTypes = {
  className: PropTypes.string
};*/}
