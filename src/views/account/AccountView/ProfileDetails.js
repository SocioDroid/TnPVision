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
