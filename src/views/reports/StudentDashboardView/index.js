import React, { useEffect} from 'react';
import { Container, Grid, Typography, makeStyles, Divider } from '@material-ui/core';
import Page from '../../../components/Page';
import EligibleDrives from './EligibleDrives';
import VolunteeringDrives from './VolunteeringDrives';
import LatestOrders from './LatestOrders';
import LatestProducts from './LatestProducts';
import Sales from './Sales';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import TrafficByDevice from './TrafficByDevice';
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
  const { history } = props;
  return (
    Auth.isUserAuthenticated() ? (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>        
          <EligibleDrives />
        </Container>
      <Container maxWidth={false}>      
        <VolunteeringDrives />
      
      {/* <Grid item lg={3} sm={6} xl={3} xs={12}>
        <TotalCustomers />
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <TasksProgress />
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <TotalProfit />
      </Grid>
      <Grid item lg={8} md={12} xl={9} xs={12}>
        <Sales />
      </Grid>
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <TrafficByDevice />
      </Grid>
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <LatestProducts />
      </Grid>
      <Grid item lg={8} md={12} xl={9} xs={12}>
        <LatestOrders />
        </Grid> */}

        
      </Container >
    </Page >
    ) : <p>Loading</p>
  );
};

export default Dashboard;
