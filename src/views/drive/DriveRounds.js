import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import RoundService from '../../services/RoundService';
import MaterialTable from 'material-table';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import DoneIcon from '@material-ui/icons/Done';
import CircularProgress from '@material-ui/core/CircularProgress';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProfileDetails from './DriveListView/ProfileDetails';
import VolunteerUpdate from './DriveUpload/VolunteerUpdate';
import CoordinatorUpdate from './DriveUpload/CoordinatorUpdate';
import InterviewerUpdate from './DriveUpload/InterviewerUpdate';
import DriveService from './../../services/DriveService';
import RoundDetails from './DriveUpload/RoundDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import Auth from '../../auth';
import ProgressBar from '../../components/controls/ProgressBar';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    // flexBasis: '15.33%',
    flexShrink: 0
  },
  SettingHeading: {
    fontSize: theme.typography.pxToRem(15),
    // flexBasis: '33.33%',
    flexShrink: 0
  },
  roundName: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    // flexBasis: '5.33%',
    flexShrink: 0
  },
  roundDescription: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    // flexBasis: '5.33%',
    flexShrink: 0
  },
  innerAccordian: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    justifyContent: 'center'
  },
  topmargin: {
    paddingTop: '20px'
  }
}));


const DriveRounds = ({ driveId, ...rest }) => {
  const classes = useStyles();
  const [students, setStudents] = useState([]);
  const [flag, setFlag] = useState(Boolean(true));
  const [rounds, setRounds] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [staffForEdit, setStaffForEdit] = useState(null);
  const [interviewerForEdit, setInterviewerForEdit] = useState(null);
  const [studentForEdit, setStudentForEdit] = useState(null);
  const [roundNumber, setRoundNumber] = useState(0);


  const changeUpdated = roundNumber => {
    console.log('changeUpdated before', roundNumber);
    setRoundNumber(roundNumber);
    console.log('changeUpdated after', roundNumber);
  };

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getAllRounds = driveId => {
    console.log('driveId', driveId);
    RoundService.getAllRounds(driveId)
      .then(res => {
        setRounds([...res.data]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllRounds(driveId);
  }, [])

  return (
       
      <div>
        <Typography className={classes.topmargin} variant="h3" color="primary">
          Round Details
        </Typography>
        <Divider style={{ margin: 10 }} />
        {rounds.map(round => (
          <div className={classes.root} key={round.number}>
            <Accordion
              style={{ margin: '10px auto' }}
              expanded={expanded === round.number}
              onChange={handleChange(round.number)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.heading}>
                  Round {round.number} : {round.name}
                </Typography>

              </AccordionSummary>
              <AccordionDetails className={classes.innerAccordian}>
                <RoundDetails
                  round={round}
                  driveId={driveId}
                  roundNumber={roundNumber}
                  changeUpdated={changeUpdated}
                />
              </AccordionDetails>
              <Divider />
              {/* <AccordionActions>
                <React.Fragment>                  
                  <div className={classes.uploadArea}>
                    <input
                      type="file"
                      name="file"
                      onChange={event => handleFileChange(event)}
                    />
                    <Button
                      type="button"
                      onClick={() => handleClick(round.number)}
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      {' '}
                      Upload
                    </Button>
                  </div>
                </React.Fragment>
                <Button
                  color="primary"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  onClick={() => exportToExcel(round)}
                >
                  Export to excel
                </Button>
              </AccordionActions> */}
            </Accordion>
          </div>
        ))}
      </div>
  );
};

export default DriveRounds;
