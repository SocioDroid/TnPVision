import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography , AppBar} from '@material-ui/core';
// import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import {
  Box
} from '@material-ui/core';
import axios from 'axios';
// import { ReactMultiEmailCustom } from 'react-multi-email-custom';
// import 'react-multi-email-custom/style.css';
import PersonalData from './PersonalStudentData'
import AcademicData from './AcademicData'
import PastAcademicData from './PastAcademicData'


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

  // const [values, setValues] = useState({
  //   "email" : "",
  //   "first_name" : "",
  //   "last_name" : "",
  //   "gender" : "M",
  //   "group" : 0,
  //   "id" : 0,

  //   "phone" : "",
  //   "category" : "",
  //   "pan" : "",
  //   "aadhar" : "",
  //   "dob" : "",
  //   "hometown" : "",

  //   "tenthpercentage": "60",
  //   "tenthboard": "",
  //   "tenthyear": "",
  //   "twelfthpercenatge": "60",
  //   "twelfthboard": "",
  //   "twelfthyear": "",
  //   "diplomapercentage": "60",
  //   "diplomaboard": "",
  //   "diplomayear": "",
  //   "enggqualifyyear": "",
  //   "enggqualifyscore": "",

  //   "college": "",
  //   "branch": "",
  //   "yearofstudy": "",
  //   "prn": "",
  //   "sem1sgpa":"",
  //   "sem1percentage":"",
  //   "sem2sgpa":"",
  //   "sem2percentage":"",
  //   "sem3sgpa":"",
  //   "sem3percentage":"",
  //   "sem4sgpa":"",
  //   "sem4percentage":"",
  //   "sem5sgpa":"",
  //   "sem5percentage":"",
  //   "enggaggregateper":"",
  //   "enggaggregatesgpa": "",
  //   "live": "",
  //   "dead": "",
  //   "gaps": "",
  //   "yd": "",

  // });

  // const validate = (fieldValues = values) => {
  //   let temp = { ...errors }
  //   if ('first_name' in fieldValues)
  //     temp.first_name = fieldValues.first_name ? "" : "This field is required."
  //   if ('last_name' in fieldValues)
  //     temp.last_name = fieldValues.last_name ? "" : "This field is required."
  //   if ('email' in fieldValues)
  //     temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
  //   setErrors({
  //     ...temp
  //   })
  //   if (fieldValues === values)
  //     return Object.values(temp).every(x => x === "")
  // }

  // const {
  //   valuess,
  //   setValuess,
  //   errors,
  //   setErrors,
  //   handleInputChange,
  //   resetForm
  // } = useForm(initialFValues, true, validate);


  // useEffect(() =>{
  //   if(userData !=null){
  //     setValues({
  //       ...values,
  //       "email" : userData.email,
  //       "first_name" : userData.first_name,
  //       "last_name" : userData.last_name,
  //       "gender" : userData.gender,
  //       "group" : userData.group,
  //       "id" : userData.id,

  //       "phone" : userData.phone,
  //       "category" : userData.category,
  //       "pan" : userData.pan,
  //       "aadhar" : userData.aadhar,
  //       "dob" : userData.dob,
  //       "hometown" : userData.hometown,

  //       "tenthpercentage": userData.tenthpercentage,
  //       "tenthboard": userData.tenthboard,
  //       "tenthyear": userData.tenthyear,
  //       "twelfthpercenatge": userData.twelfthpercenatge,
  //       "twelfthboard": userData.twelfthboard,
  //       "twelfthyear": userData.twelfthyear,
  //       "diplomapercentage": userData.diplomapercentage,
  //       "diplomaboard": userData.diplomaboard,
  //       "diplomayear": userData.diplomayear,
  //       "enggqualifyyear": userData.enggqualifyyear,
  //       "enggqualifyscore": userData.enggqualifyscore,

  //       "college": userData.college,
  //       "branch": userData.branch,
  //       "yearofstudy": userData.yearofstudy,
  //       "prn": userData.prn,
  //       "sem1sgpa": userData.sem1sgpa,
  //       "sem1percentage": userData.sem1percentage,
  //       "sem2sgpa":userData.sem2sgpa,
  //       "sem2percentage": userData.sem2percentage,
  //       "sem3sgpa": userData.sem3sgpa,
  //       "sem3percentage": userData.sem3percentage,
  //       "sem4sgpa": userData.sem4sgpa,
  //       "sem4percentage": userData.sem4percentage,
  //       "sem5sgpa": userData.sem5sgpa,
  //       "sem5percentage": userData.sem5percentage,
  //       "enggaggregateper": userData.enggaggregateper,
  //       "enggaggregatesgpa": userData.enggaggregatesgpa,
  //       "live": userData.live,
  //       "dead": userData.dead,
  //       "gaps": userData.gaps,
  //       "yd": userData.yd,
  //     })
  //   }
  // },[userData]);


  const [value, setValue] = useState(0);

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
