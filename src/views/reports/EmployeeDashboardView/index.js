import React from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import LiveDrive from './LiveDrives';
import Auth from '../../../auth';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = (props) => {
  const classes = useStyles();
  return (
    Auth.isUserAuthenticated() ? (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <LiveDrive/>        
      </Container>
    </Page>
    ) : <p>Loading</p>
  );
};

export default Dashboard;
