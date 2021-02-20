import React,{ useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import RoundStudent from './RoundStudent';

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs(props) {

  const { rounds } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [roundss, setRoundss] = useState([1,2,3]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
      setRoundss(rounds)
      console.log("rounds",rounds) 
  }, [rounds])

  if(roundss) {
    return (
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="off" aria-label="simple tabs example">
              {roundss.map(round => (
                  <Tab label= {round.name} {...a11yProps(round.number - 1)} key={round.name} wrapped />
              ))}
            </Tabs>
          </AppBar>        
          {roundss.map(round => (
            <TabPanel value={value} index={round.number - 1}>
                {/* <RoundStudent RoundId={round.number}/> */}
            </TabPanel>
          ))}
        </div>
      );
  }
  else{
      return ''
  }
}
