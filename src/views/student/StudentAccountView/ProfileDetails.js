import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography , AppBar} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Box } from '@material-ui/core';
import PersonalData from './PersonalStudentData';
import AcademicData from './AcademicData';
import PastAcademicData from './PastAcademicData';
import ExtraDetails from './ExtraDetails';
import ProgressBar from '../../../components/controls/ProgressBar';


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
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
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
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
          <Tabs value={value} onChange={handleChangeTabs} variant="scrollable"
            scrollButtons="off"
            >
            <Tab label="Personal Details" {...a11yProps(0)} wrapped />
            <Tab label="Academic Details" {...a11yProps(1)} wrapped />
            <Tab label="Past Academic Details" {...a11yProps(2)} wrapped />
            <Tab label="Extra Details" {...a11yProps(3)} wrapped />
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
        <TabPanel value={value} index={3}>
            <ExtraDetails userData={userData}/>
        </TabPanel>
      </div>
    );
 
}


// eslint-disable-next-line no-lone-blocks
{/*ProfileDetails.propTypes = {
  className: PropTypes.string
};*/}
