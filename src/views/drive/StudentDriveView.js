import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button, Box } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
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
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    margin: theme.spacing(2)
  },
  progressRoot:{
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
  }
}));

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}


export default function StudentDriveView() {
  const classes = useStyles();
  const { id } = useParams();
  const [driveDetails, setDriveDetails] = useState(null);
  const [postedDays, setPostedDays] = useState(null);
  const [progress, setProgress] = useState(10);

function generatePostedDays(){
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
  useEffect(() => {
    // Getting Drive Details

    DriveService.getSingleDrive({ id: id })
      .then(res => {
        setDriveDetails(res.data);
        generatePostedDays();

      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

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
                
                <Typography component="p" color="textSecondary">
                  <AccountBalanceWalletOutlinedIcon fontSize="small" />
                  {' '}{driveDetails.min_salary} - {driveDetails.max_salary} P.A.
                </Typography>
                
                <Typography component="p" color="textSecondary">
                  <LocationOnOutlinedIcon fontSize="small" /> Job Location{' '}
                  {driveDetails.drive_location}
                </Typography>
              </Grid>

              <Grid
                item
                md={4}
                xs={12}
                justify="center"
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
                 <Typography component="p" color="textSecondary">
                    Posted: {postedDays} 
                </Typography> 
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card className={classes.root}>
          <CardContent>
            <Typography component="h2" variant="h4">
              Job Description
            </Typography>
            <Typography component="p">
              <p>
                Sint id nulla ea aliqua non magna esse veniam anim commodo.
                Aliqua
                <br />
                irure dolor qui sint anim commodo exercitation velit dolore
                <br />
                reprehenderit laboris do laboris. Quis aute magna culpa tempor
                <br />
                aliquip. Est magna est nulla culpa dolor sunt ipsum ea fugiat
                aute
                <br />
                esse Lorem. Non cillum do minim dolore ex amet mollit nisi amet
                et
                <br />
                sunt mollit. Aliquip aliqua veniam fugiat elit et. Qui velit
                <br />
                veniam irure nostrud. Anim esse commodo pariatur sint. Dolore
                duis
                <br />
                adipisicing reprehenderit mollit deserunt nostrud magna enim
                <br />
                fugiat consectetur duis do dolore ipsum. Labore consequat sit
                aute
                <br />
                quis esse proident minim cillum aliquip ex in. Velit adipisicing
                <br />
                nisi sunt et. Duis duis dolore non adipisicing aute eiusmod ad
                <br />
                irure eiusmod culpa sint sint cupidatat. Cillum fugiat nisi sit
                <br />
                elit occaecat magna velit id. Nostrud aute adipisicing consequat
                <br />
                sint anim ex tempor magna. Fugiat dolore culpa nulla duis
                nostrud.
              </p>
            </Typography>
          </CardContent>
        </Card>

        <Card className={classes.root}>
          <CardContent>
            <Typography component="h2" variant="h4">
              About Company
            </Typography>
            <Typography component="p" className={classes.pos}>
              Company domain
            </Typography>
            <Typography component="p">
              <WorkOutlineOutlinedIcon fontSize="small" />
              Company industry type : {driveDetails.company.industry}
            </Typography>
            <Typography component="p">
              <LanguageOutlinedIcon fontSize="small" /> Company website :{' '}
              <a href={driveDetails.company.website}>
                {driveDetails.company.website}
              </a>
            </Typography>
            <Typography component="p">
              <HomeWorkOutlinedIcon fontSize="small" /> Company Address
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return( 
      <div className={classes.progressRoot}>
      <CircularProgressWithLabel size={70} value={progress} />
      <Typography  variant="h3" color="primary">Loading...</Typography>
      </div>
    );
  }
}


CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};