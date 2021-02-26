import React from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';
import Page from '../../../components/controls/Page';
import LiveDrive from './LiveDrives';

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
    <Page
      className={classes.root}
      title="Employee Dashboard"
    >
      <Container maxWidth={false}>
        <LiveDrive/>        
      </Container>
    </Page>
  );
};

export default Dashboard;
