import React, { useState, useEffect} from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import StudentService from '../../../services/StudentService';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();
  const [userData, setUserData] = useState({})
  // {
  //   email: "",
  //   first_name: "",
  //   last_name: "",
  //   gender: "",
  //   group: 0,
  //   id: 0,
  // }

  useEffect((props) => {
    StudentService.getUserDetail()
      .then(function(res){
        const { data} = res;
        console.log("data: ",data);
        setUserData(data);
        // {
        //   email: data.user.email,
        //   first_name: data.user.first_name,
        //   last_name: data.user.last_name,
        //   gender: data.gender,
        //   group: data.group,
        //   id: data.id,
        // }
      }).catch(error =>{
        console.log(error);
        
      })
  }, []);



  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <Container maxWidth="lg">
        <Grid
          direction="row"
          container
          spacing={3}
        >
          <Grid
            item
            lg={12}
            md={12}
            xs={12}
          >
            <Profile userData={userData} />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xs={12}
          >
            <ProfileDetails  userData={userData} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
