import React from 'react';
import { Typography, Divider ,Card, CardContent, Container, makeStyles, Grid } from '@material-ui/core';
import Page from '../../../components/controls/Page';
import StudentReviews from './StudentReviews';
import EligibleDashboard from './EligibleDashboardComponent';
import VolunteerDashboard from './VolunteeringDashboardComponent';
import DrivesPerDayDashboard from './DrivesPerDayStatistics';
import RatingsPerDayDashboard from './RatingPerDay';
import PositiveCount from './PositiveReviewDashboard';
import NegativeCount from './NegativeReviewDashboard';
import MasterValueTechnical from './MasterValueTechnical';
import MasterValueSales from './MasterValueSales';

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
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <PositiveCount />
          </Grid>   
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <NegativeCount />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MasterValueTechnical />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MasterValueSales />
          </Grid>    
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
        <br/>
        <Grid container spacing={3}>       
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Typography variant="h3" color="primary">
              Ratings Per Drive Evaluation
            </Typography>
            <Divider style={{ margin: 10 }} />
            <Card className={classes.demo} elevation={10}>
            <CardContent>
              <br/>
              <RatingsPerDayDashboard/>
            </CardContent>
            </Card>
          </Grid>        
        </Grid>
      </Container>
      <Container maxWidth={false}>
        <br/>
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
