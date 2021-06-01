import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Button,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Box
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import DriveService from '../../services/DriveService';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import DriveRounds from './DriveRounds';
import ProgressBar from '../../components/controls/ProgressBar';
import RejectedStudentsPreview from '../employee/EmployeeDashboardView/RejectedStudentsPreview';
import AcceptedStudentsPreview from '../employee/EmployeeDashboardView/AcceptedStudentsPreview';
import PendingStudentsPreview from '../employee/EmployeeDashboardView/PendingStudentsPreview';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Backdrop from '@material-ui/core/Backdrop';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import ClearIcon from '@material-ui/icons/Clear';

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
    justifyContent: 'center'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  alignToBottom: {
    alignSelf: 'flex-end'
  },
  fab: {
    margin: 0,
    top: 'auto',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    left: 'auto',
    position: 'fixed'
  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

export default function StudentDriveView() {
  const classes = useStyles();
  const { id } = useParams();
  const [driveDetails, setDriveDetails] = useState(null);
  const [driveStatus, setDriveStatus] = useState("inactive");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    // Getting Drive Details
    DriveService.getSingleDrive({ id: id })
      .then(res => {
        setDriveDetails(res.data);
        setDriveStatus(res.data.status);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function changeStatus(status){
    console.log("styahfffjf");
    DriveService.changeStatus(driveDetails.id, { status: status })
      .then(res => {
        setDriveStatus(res.data.status);
      })
      .catch(err => {
        console.log(err);
      });
      handleClose();
  };

  useEffect(() => {}, [driveStatus]);

  const actions = [
    (driveStatus=="completed") && { icon: <ClearIcon />, name: 'You cannot perform any action', action: handleClose },
    (driveStatus=="inactive") && { icon: <PlayArrowIcon />, name: 'Start', action: ()=>changeStatus("live") } ,
    (driveStatus=="paused") && { icon: <PlayArrowIcon />, name: 'Resume', action: ()=>changeStatus("live") } ,
    (driveStatus=="paused") && { icon: <StopIcon />, name: 'End' , action: ()=>changeStatus("completed")} ,
    (driveStatus=="live") && { icon: <PauseIcon />, name: 'Pause', action: ()=>changeStatus("pause")} ,
    (driveStatus=="live") && { icon: <StopIcon />, name: 'End' , action: ()=>changeStatus("completed")}
  ].filter(Boolean);
  
  if (driveDetails) {
    return (
      <Box height="100%" display="flex" flexDirection="column">
        <Card className={classes.root}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={8} xs={12}>
                <Grid item xs={12} sm container>
                  <Typography className={classes.pos} variant="h3">
                    {driveDetails.jobtitle}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm container>
                  <Typography className={classes.pos} variant="h4">
                    {driveDetails.company.name}
                  </Typography>
                </Grid>
                <div>
                  <Typography color="textSecondary">
                    <AccountBalanceWalletOutlinedIcon
                      fontSize="small"
                      style={{ verticalAlign: 'sub' }}
                    />
                    {'  '}
                    {driveDetails.min_salary} - {driveDetails.max_salary} P.A.
                  </Typography>
                </div>
                <div style={{ marginTop: '5px' }}>
                  <Typography color="textSecondary">
                    <LocationOnOutlinedIcon
                      fontSize="small"
                      style={{ verticalAlign: 'sub' }}
                    />{' '}
                    {driveDetails.drive_location}
                  </Typography>
                </div>
                <div style={{ marginTop: '5px' }}>
                  <Typography color="textSecondary">
                    Status: 
                    {driveStatus}
                  </Typography>
                </div>
              </Grid>
              <Grid item md={4} xs={12} className={classes.alignToBottom}>
                <Button variant="contained" color="primary">
                  Mark As Finished
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card className={classes.root}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item lg={12} md={12} xl={9} xs={12}>
                <DriveRounds driveId={driveDetails.id} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        





        <div>
          <Grid container spacing={3}>
            <Grid item sm={12} xs={12}>
              <Card className={classes.root}>
                <CardHeader title="Rejected Student Evaluation" />
                <CardContent>
                  {driveDetails && (
                    <RejectedStudentsPreview DriveId={driveDetails.id} />
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Card className={classes.root}>
                <CardHeader title="Accepted Student Evaluation" />
                <CardContent>
                  {driveDetails && (
                    <AcceptedStudentsPreview DriveId={driveDetails.id} />
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Card className={classes.root}>
                <CardHeader title="Pending Student Evaluation" />
                <CardContent>
                  {driveDetails && (
                    <PendingStudentsPreview DriveId={driveDetails.id} />
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>




        <div className={classes.fab}>
          <Backdrop open={open} />
          <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            className={classes.speedDial}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
          >
            {actions.map(action => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipOpen
                onClick={action.action}
              />
            ))}
          </SpeedDial>
        </div>
      </Box>
    );
  } else {
    return <ProgressBar />;
  }
}
