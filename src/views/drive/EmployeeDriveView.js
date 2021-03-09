import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button, CardContent, CardHeader, Typography, Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import DriveService from '../../services/DriveService';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import DriveRounds from './DriveRounds';
import ProgressBar from '../../components/controls/ProgressBar';
import RejectedStudentsPreview from '../employee/EmployeeDashboardView/RejectedStudentsPreview';
import AcceptedStudentsPreview from '../employee/EmployeeDashboardView/AcceptedStudentsPreview';
import PendingStudentsPreview from '../employee/EmployeeDashboardView/PendingStudentsPreview';


const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    margin: theme.spacing(2)
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  progressRoot: {
    margin: theme.spacing(40),
    textAlign: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  alignToBottom: {
    alignSelf: 'flex-end'
  }
}));


export default function StudentDriveView() {
  const classes = useStyles();
  const { id } = useParams();
  const [driveDetails, setDriveDetails] = useState(null);
  useEffect(() => {
    // Getting Drive Details
    DriveService.getSingleDrive({ id: id })
      .then(res => {
        setDriveDetails(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);


  if (driveDetails) {
    return (
      <div>
        {/* <Card className={classes.root}>
          <CardContent>
            <Grid container spacing={3}>
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
          </CardContent>
        </Card> */}

        {/* <Card className={classes.root}>
          <CardContent><Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={12}
              md={12}
              xl={9}
              xs={12}
            >
              <DriveRounds driveId={driveDetails.id} />
            </Grid>
          </Grid>
            
          </CardContent>
        </Card>  */}
            <Grid
              container
              spacing={3}
            >
              <Grid
                item              
                sm={12}                
                xs={12}
              >       
                <Card>
                <CardHeader  title="Rejected Student Evaluation"/>
                  <CardContent>
                  { driveDetails && <RejectedStudentsPreview DriveId={driveDetails.id}/> }  
                  </CardContent>         
                </Card>                  
              </Grid>
              <Grid
                item                
                sm={12}
                xs={12}
              >
                <Card>
                <CardHeader  title="Accepted Student Evaluation"/>
                  <CardContent>
                  { driveDetails && <AcceptedStudentsPreview DriveId={driveDetails.id}/> }
                  </CardContent>         
                </Card>                               
              </Grid>
              <Grid
                item                
                sm={12}                
                xs={12}
              >
                <Card>
                <CardHeader  title="Pending Student Evaluation"/>
                  <CardContent>
                    { driveDetails && <PendingStudentsPreview DriveId={driveDetails.id}/> }             
                  </CardContent>         
                </Card>                 
              </Grid>
            </Grid>      

      </div>
    );
  } else {
    return (
      <ProgressBar />
    );
  }
}
