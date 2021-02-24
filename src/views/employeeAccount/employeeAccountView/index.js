import React, { useState, useEffect } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from '../../../components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import EmployeeService from '../../../services/EmployeeServices';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();
  const [userData, setUserData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    group: 0,
    id: 0,
    college: '',
    mobile: '',
    doj: '',
    department: '',
    designation: ''
  });
  const [isUserDataSet, setIsUserDataSet] = useState(false);

  useEffect(props => {
    
    EmployeeService.getEmployeeDetail()
      .then(function(res) {
        const { data } = res;
        console.log('data idex', data);

        setUserData({
          email: data.user.email,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          group: data.group,
          id: data.id,
          college: data.college,
          mobile: data.mobile,
          doj: data.doj,
          department: data.department,
          designation: data.designation
        });
        setIsUserDataSet(true);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            {isUserDataSet && <Profile userData={userData} />}
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            {isUserDataSet && <ProfileDetails userData={userData} /> }
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
