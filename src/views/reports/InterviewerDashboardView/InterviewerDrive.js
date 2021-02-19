import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  Button,
  makeStyles
} from '@material-ui/core';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import InterviewerRoundView from './InterviewerRoundView';
import InterviewerService from '../../../services/InterviewerService';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    margin: theme.spacing(3),
  },
  pos: {
    marginBottom: 12
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    marginRight: theme.spacing(1)
  },
  text:{
    color: "#ffffff",
  },
  alignToBottom: {
    alignSelf: 'flex-end',
  },
  bottomSpace:{
    marginBottom: '10px',
    marginLeft: '5px'
  }
}));

const Interviewerdrive = ({ className, Drive ,...rest }) => {
  const classes = useStyles();
  const [driveDetails, setDriveDetails] = useState([]);
  const [data, setData] = useState(false);
  
  useEffect(() => {
    InterviewerService.getDrive()
    .then(res =>{
      console.log("Interviewer Drive ",res.data);
      setDriveDetails(res.data);
      setData(true)
    })
    .catch(error =>{
      console.log(error);
      setData(false)
    })
  }, [])


  console.log("Data got", driveDetails);

  if (driveDetails)
  {
    return(
      <div>
        <Card className={classes.root}>
          <CardContent>
          <Grid container spacing={3} className={classes.bottomSpace}>
              <Grid item md={8} xs={12}>
                <Grid item xs={12} sm container>
                  <Typography
                    className={classes.pos}
                    variant="h3"
                  >
                    {driveDetails.jobtitle}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm container>
                  <Typography className={classes.pos} variant="h4">
                    {driveDetails.company.name}
                  </Typography>
                </Grid>
                <div>
                  <Typography color="textSecondary" >
                    <AccountBalanceWalletOutlinedIcon fontSize="small" style={{ verticalAlign: "sub" }} />
                    {'  '}{driveDetails.min_salary} - {driveDetails.max_salary} P.A.
                </Typography>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <Typography color="textSecondary">
                    <LocationOnOutlinedIcon fontSize="small" style={{ verticalAlign: "sub" }} />
                    {' '} {driveDetails.drive_location}
                  </Typography>
                </div>
              </Grid>
              <Grid
                item
                md={4}
                xs={12}
                className={classes.alignToBottom}
              >
                <Button variant="contained" color="primary">
                  Mark As Finished
                </Button>
              </Grid>
            </Grid>
              <InterviewerRoundView />
          </CardContent>
        </Card>

      </div>
      )
  }
  else{
    return("Loading")
  }
};

export default Interviewerdrive;
