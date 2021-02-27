import React, { useState, useEffect } from 'react';
import { Card, CardContent, Grid, Typography, colors, Button, makeStyles, Box} from '@material-ui/core';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import InterviewerRoundView from './InterviewerRoundView';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import InterviewerService from '../../../services/InterviewerService';
import ProgressBar from '../../../components/controls/ProgressBar';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    margin: theme.spacing(3),
  },
  progressRoot: {
    minWidth: 275,
    margin: theme.spacing(40),
    textAlign: 'center',
    justifyContent: 'center',
  },
  pos: {
    marginBottom: 12,
    marginLeft: "5px"
  },
  alignToBottom: {
    alignSelf: 'flex-end'
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
  }
}));

// function CircularProgressWithLabel(props) {
//   return (
//     <Box position="relative" display="inline-flex">
//       {/* <CircularProgress variant="determinate" {...props} /> */}
//       < ProgressBar />
//       <Box
//         top={0}
//         left={0}
//         bottom={0}
//         right={0}
//         position="absolute"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//       >
//         <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
//           props.value,
//         )}%`}</Typography>
//       </Box>
//     </Box>
//   );
// }

const Interviewerdrive = ({ className, Drive ,...rest }) => {
  const classes = useStyles();
  const [drive, setDrive] = useState([]);
  const [data, setData] = useState(false);
  const [progress, setProgress] = useState(10);
  
  useEffect(() => {
    InterviewerService.getDrive()
    .then(res =>{
      console.log("Interviewer Drive ",res.data);
      setDrive(res.data);
      setData(true)
    })
    .catch(error =>{
      console.log(error);
      setData(false)
    })
  }, [data])

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);


  if (data)
  {
    return(
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
                    {drive.jobtitle}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm container>
                  <Typography className={classes.pos} variant="h4">
                    {drive.company.name}
                  </Typography>
                </Grid>
                <div style={{ marginLeft: 5}}>
                  <Typography color="textSecondary" >
                    <AccountBalanceWalletOutlinedIcon fontSize="small" style={{ verticalAlign: "sub" }} />
                    {'  '}{drive.min_salary} - {drive.max_salary} P.A.
                </Typography>
                </div>
                <div style={{ marginLeft: 5, marginTop: "5px" }}>
                  <Typography color="textSecondary">
                    <LocationOnOutlinedIcon fontSize="small" style={{ verticalAlign: "sub" }} />
                    {' '} {drive.drive_location}
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

            <br/>
              <InterviewerRoundView rounds = {drive.rounds}/>
          </CardContent>
        </Card>

      </div>
      )
  }
  return (
    <div className={classes.progressRoot}>
      {/* <CircularProgressWithLabel size={70} value={progress} />
      <Typography variant="h3" color="primary">Loading...</Typography> */}
      < ProgressBar />
    </div>
  );
};

export default Interviewerdrive;


// CircularProgressWithLabel.propTypes = {
//   value: PropTypes.number.isRequired,
// };