import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from '../../../components/controls/Page';
import EligibleDrives from './EligibleDrives';
import VolunteeringDrives from './VolunteeringDrives';
import Auth from '../../../auth';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  title: {
    paddingTop: '15px'
  },
}));


const Dashboard = props => {
  const classes = useStyles();
  return (
    
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>        
          <EligibleDrives />
        </Container>
      <Container maxWidth={false}>      
        <VolunteeringDrives />  
      </Container >
    </Page >
    
  );
};

export default Dashboard;
