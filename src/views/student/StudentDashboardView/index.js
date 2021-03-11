import React from 'react';
import { Typography, Divider ,Card, CardHeader, CardContent, Container, makeStyles, Grid } from '@material-ui/core';
import Page from '../../../components/controls/Page';
import EligibleDrives from './EligibleDrives';
import StudentReviews from './StudentReviews';
import VolunteeringDrives from './VolunteeringDrives';
import EligibleDashboard from './EligibleDashboardComponent';
import VolunteerDashboard from './VolunteeringDashboardComponent';
import DrivesPerDayDashboard from './DrivesPerDayStatistics';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    height: 369,
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
            <Typography variant="h3" color="primary">
              Drives Per Day Evaluation
            </Typography>
            <Divider style={{ margin: 10 }} />
            <Card className={classes.demo} elevation={10}>
            <CardContent>
              <br/>
              <DrivesPerDayDashboard/>
            </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <StudentReviews />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth={false}>
      <Grid container spacing={3}>
          <Grid item lg={8} md={12} xl={9} xs={12}>            
            <EligibleDashboard />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>          
            <VolunteerDashboard/>
          </Grid>
      </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
