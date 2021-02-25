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
  const [userData, setUserData] = useState(null)
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect((props) => {
    StudentService.getUserDetail()
      .then(function(res){
        const { data} = res;
        console.log("data: ",data);
        setUserData(data);
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
            {userData && <Profile userData={userData} />}            
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xs={12}
          >
            {userData && <ProfileDetails  userData={userData} /> }
            
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
