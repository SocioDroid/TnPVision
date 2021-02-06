import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Page from '../../../components/Page';
import { Container, Divider } from '@material-ui/core';
import ProfileDetails from '../DriveListView/ProfileDetails';
import RoundService from '../../../services/RoundService';
import DriveService from '../../../services/DriveService';
import RoundDetails from './RoundDetails';

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
    paddingTop: '10px'
  }
}));

export default function DriveDetails(drive) {
  const id = drive.drive;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [rounds, setRounds] = useState([]);
  const [students, setStudents] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getAllRounds = driveId => {
    console.log('driveId', driveId);
    RoundService.getAllRounds(driveId)
      .then(res => {
        setRounds(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getAllStudentOfRound = (driveId, roundId) => {
    RoundService.getAllStudentOfRound(driveId, roundId)
      .then(res => {
        setStudents(res.data.students);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(drive, 'props');

    // Getting Drive Details

    DriveService.getSingleDrive({ id: drive.drive })
      .then(res => {
        setRecordForEdit(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    getAllRounds(drive.drive);
  }, []);

  return (
    <div>
      <div>
        <Typography variant="h3" color="primary">
          {recordForEdit
            ? recordForEdit.jobtitle + ' ' + recordForEdit.company_id
            : 'Drive name'}
        </Typography>
        <Divider style={{ margin: 10 }} />
        <div className={classes.root}>
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.SettingHeading}>
                Drive Settings
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.innerAccordian}>
              <ProfileDetails recordForEdit={recordForEdit} />
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

      <div>
        <Typography className={classes.topmargin} variant="h3" color="primary">
          Round Details
        </Typography>
        <Divider style={{ margin: 10 }} />
        {rounds.map(round => (
          <div className={classes.root}>
            <Accordion
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

                {/* <Typography noWrap className={classes.roundDescription}></Typography> */}
              </AccordionSummary>
              <AccordionDetails className={classes.innerAccordian}>
                <RoundDetails students={round.students} />
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}
