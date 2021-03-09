import React from 'react';
import { Container, makeStyles, Grid } from '@material-ui/core';
import Page from '../../../components/controls/Page';
import EligibleDrives from './EligibleDrives';
import StudentReviews from './StudentReviews';
import VolunteeringDrives from './VolunteeringDrives';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  title: {
    paddingTop: '15px'
  }
}));

const Dashboard = props => {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <EligibleDrives />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <StudentReviews />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth={false}>
        <VolunteeringDrives />
      </Container>
    </Page>
  );
};

export default Dashboard;
