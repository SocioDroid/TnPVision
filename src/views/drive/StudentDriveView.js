import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import DriveService from '../../services/DriveService';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Grid from '@material-ui/core/Grid';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import LanguageOutlinedIcon from '@material-ui/icons/Language';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import Divider from '@material-ui/core/Divider';
import ProgressBar from '../../components/controls/ProgressBar';
import ReactHTMLParser from 'react-html-parser'

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    margin: theme.spacing(2)
  },
  progressRoot: {
    minWidth: 275,
    margin: theme.spacing(40),
    textAlign: 'center',
    justifyContent: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
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
  skills:{
    backgroundColor: '#d2e4fc',
    padding: '2px 10px',
    marginRight: '5px',
    borderRadius: '100px',
    whiteSpace: 'nowrap',
    color: '#636363',
    cursor: 'pointer'
  }
}));


export default function StudentDriveView() {
  const classes = useStyles();
  const { id } = useParams();
  const [driveDetails, setDriveDetails] = useState(null);
  const [postedDays, setPostedDays] = useState(null);

  useEffect(() => {
    // Getting Drive Details
    function generatePostedDays() {
      // Modify this field
      const date1 = new Date(driveDetails.createdAt);
      const date2 = new Date();
      const diffDays = date2.getDate() - date1.getDate();
      console.log(diffDays + " days");
      if (diffDays > 0)
        setPostedDays(diffDays);
      else
        setPostedDays("Today")
    }

    DriveService.getSingleDrive({ id: id })
      .then(res => {
        setDriveDetails(res.data);
        generatePostedDays();

      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);


  if (driveDetails) {
    return (
      <div>
        <Card className={classes.root}>
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
                  Apply Drive
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Divider />
                <Typography color="textSecondary">
                  Posted: {postedDays}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card className={classes.root}>
          <CardContent>
            <Typography component="h2" variant="h4" style={{ marginBottom: "10px" }} >
              Job Description
            </Typography>
            <Typography variant="h5" style={{ marginBottom: "5px" }} >
              Roles and Responsibilities
            </Typography>
            <Typography style={{ paddingLeft: "10px" }} >
              {driveDetails.description ? ReactHTMLParser(driveDetails.description): ""}              
            </Typography>            
          </CardContent>
        </Card >

      <Card className={classes.root}>
        <CardContent>
          <Typography component="h2" variant="h4">
            About Company
            </Typography>
          <Typography component="p" className={classes.pos}>
            Company domain
            </Typography>
          <Typography>
            <WorkOutlineOutlinedIcon fontSize="small" style={{ verticalAlign: "sub" }} />
            {'  '}{driveDetails.company.industry}
          </Typography>
          <Typography>
            <LanguageOutlinedIcon fontSize="small" style={{ verticalAlign: "sub" }} />
            <a href={driveDetails.company.website}>
              {'  '}{driveDetails.company.website}
            </a>
          </Typography>
          <Typography>
            <HomeWorkOutlinedIcon fontSize="small" style={{ verticalAlign: "sub" }} /> Company Address
            </Typography>
        </CardContent>
      </Card>
      </div >
    );
  } else {
    return (
      <ProgressBar />
    );
  }
}
