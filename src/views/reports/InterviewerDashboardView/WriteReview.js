import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import swal from 'sweetalert';
import InterviewerService from '../../../services/InterviewerService';

import {
  Card,
  CardContent,
  Divider,
  TextField,
  Button
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import Auth from '../../../auth';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

export default function ReviewTabs(props) {
  const { rounds, drive_id, student_id } = props;

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [technical, setTechnical] = React.useState([]);
  const [communication, setCommunication] = React.useState([]);
  const [personality, setPersonality] = React.useState([]);
  const [comment, setComment] = React.useState([]);
  const [reviewPresent, setReviewPresent] = React.useState([]);
  const [reviewReceived, setReviewReceived] = React.useState(false);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (e, round_number) => {
    e.preventDefault();
    const data = {
      student: student_id,
      driveList: [
        {
          drive: drive_id,
          reviewData: [
            {
              round_number: round_number,
              interviewer: 1,
              technical: technical[round_number],
              communication: communication[round_number],
              personality: personality[round_number],
              comment: comment[round_number]
            }
          ]
        }
      ]
    };

    console.log(data);
    axios
      .post('http://20.37.50.140:8000/api/review/', data, {
        headers: {
          'Content-type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: 'Token ' + Auth.getToken()
        }
      })
      .then(res => {
        console.log('res', res);
        swal('Review Submitted Successsfully', 'Thank You!', 'success');
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    InterviewerService.getStudentReviews(student_id)
      .then(res => {
        let tech = [...technical];
        let commu = [...communication];
        let pers = [...personality];
        let comm = [...comment];
        let rev = [...reviewPresent];
        console.log('Student Review--- ', res.data);
        res.data.reviewData.forEach(review => {
          tech[review.round_number] = review.technical;
          commu[review.round_number] = review.communication;
          pers[review.round_number] = review.personality;
          comm[review.round_number] = review.comment;
          rev[review.round_number] = true;
        });
        setTechnical([...tech]);
        setCommunication([...commu]);
        setPersonality([...pers]);
        setComment([...comm]);
        setReviewReceived([...rev]);      
        // setDrive(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {}, [reviewReceived]);

  if (reviewReceived) {
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {rounds.map((round, index) => (
              <Tab label={round.name} {...a11yProps(index)} />
            ))}
          </Tabs>
        </AppBar>
        {rounds.map((round, index) => (
          <TabPanel value={value} index={index}>
            <form
              onSubmit={e => handleSubmit(e, round.number)}
              autoComplete="off"
              noValidate
            >
              <Typography className={classes.bold} variant="h6">
                Technical
              </Typography>
              <Rating
                name="technical"
                value={technical[round.number]}
                readOnly={reviewReceived[round.number]}
                onChange={(event, newValue) => {
                  let tech = [...technical];
                  tech[round.number] = newValue;
                  setTechnical([...tech]);
                }}
              />
              <Typography className={classes.bold} variant="h6">
                Communication
              </Typography>
              <Rating
                name="communication"
                value={communication[round.number]}
                readOnly={reviewReceived[round.number]}
                onChange={(event, newValue) => {
                  let commu = [...communication];
                  commu[round.number] = newValue;
                  setCommunication([...commu]);
                }}
              />
              <Typography className={classes.bold} variant="h6">
                Personality
              </Typography>
              <Rating
                name="personality"
                value={personality[round.number]}
                readOnly={reviewReceived[round.number]}
                onChange={(event, newValue) => {
                  let perso = [...personality];
                  perso[round.number] = newValue;
                  setPersonality([...perso]);
                  console.log(personality);
                }}
              />
              <br />
              <TextField
                id="comment"
                label="Review"
                disabled={reviewReceived[round.number]}
                multiline
                onChange={(event, newValue) => {
                  let comm = [...comment];
                  comm[round.number] = event.target.value;
                  setComment([...comm]);
                  console.log(comment);
                }}
                rows={4}
                value={comment[round.number]}
                variant="outlined"
              />
            { !reviewReceived[round.number] &&
              <Box display="flex" p={2}>
                <Button color="primary" variant="contained" type="submit">
                  Submit
                </Button>
              </Box>
            }
            </form>
          </TabPanel>
        ))}
      </div>
    );
  }
  else{
    return null;
  }
}
