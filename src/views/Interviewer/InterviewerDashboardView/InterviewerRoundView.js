import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import RoundStudent from './RoundStudent';
import InterviewerService from '../../../services/InterviewerService';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {/* <Typography>{children}</Typography> */}
          <Typography component={'span'}>{children}</Typography>
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
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function SimpleTabs(props) {
  const { rounds } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [roundStudents, setRoundStudents] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    InterviewerService.getStudentsFromRound().then(res => {
      console.log(res.data);
      res.data.map((round, index) => {
        round.pending.map(student => {
          student.status = 'pending';
          // data.push(student)
        });
        round.accepted.map(student => {
          student.status = 'accepted';
          // data.push(student)
        });
        round.rejected.map(student => {
          student.status = 'rejected';
          // data.push(student)
        });
        let a = roundStudents
        a[index] = [...round.pending,
          ...round.accepted,
          ...round.rejected]
        setRoundStudents(a);
      });
    });
  }, [rounds]);

  if (roundStudents.length > 0) {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="off"
            aria-label="simple tabs example"
          >
            {rounds.map((round, index) => (
              <Tab
                label={round.name}
                {...a11yProps(round.number - 1)}
                key={index}
                wrapped
              />
            ))}
          </Tabs>
        </AppBar>
        {rounds.map((round, index) => (
          <TabPanel value={value} key={index} index={round.number - 1}>
            <RoundStudent
              students={roundStudents[index]}
              roundId={round.number}
            />
          </TabPanel>
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
}
