import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Page from '../../../components/Page';
import { Container, Divider, Button } from '@material-ui/core';
import ProfileDetails from '../DriveListView/ProfileDetails';
import VolunteerUpdate from '../DriveUpload/VolunteerUpdate';
import CoordinatorUpdate from '../DriveUpload/CoordinatorUpdate';
import RoundService from '../../../services/RoundService';
import DriveService from '../../../services/DriveService';
import RoundDetails from './RoundDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@material-ui/icons/Publish';
import axios from 'axios';
import Auth from '../../../auth';

// import Round from './Rounds';

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
  const [staffForEdit, setStaffForEdit] = useState(null);
  const [studentForEdit, setStudentForEdit] = useState(null);
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
  const addOrEdit = (drive, resetForm) => {
    if (drive.id === 0)
        console.log("Inserted");
    else
        console.log("Edited");
    setRecordForEdit(null)
    console.log("From add or edit")    
}
  const exportToExcel = round => {
    RoundService.exportRoundStudents(drive.drive, round.number).then(
      ({ data }) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'Round_' + round.name + '.xlsx'); //any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    );
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

    DriveService.getDriveCoordinators({ id: drive.drive})
    .then(res => {
      setStaffForEdit(res.data);
    })
    .catch(err => {
      console.log(err);
    });

    DriveService.getDriveVolunteers({ id: drive.drive})
      .then(res => {
        setStudentForEdit(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

    


  const [roundNumber, setRoundNumber] = useState(0);
  const changeUpdated = roundNumber => {
    console.log('changeUpdated before', roundNumber);
    setRoundNumber(roundNumber);
    console.log('changeUpdated after', roundNumber);
  };
  // File upload:
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = event => {
    console.log('file', event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };
  const handleClick = roundNumber => {
    const data = new FormData();
    data.append('file', selectedFile);
    console.log(selectedFile);
    axios
      .put(
        'http://20.37.50.140:8000/api/drive/' +
          drive.drive +
          '/upload/round/' +
          roundNumber +
          '/',
        data,
        {
          headers: {
            'Content-type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: 'Token ' + Auth.getToken()
          }
        }
      )
      .then(res => {
        console.log(res);        
      })
      .catch(error => {
        console.log(error);
      });
  };
  const uploadInputRef = useRef(null);

  return (
    <div>
      <div>
        <Typography variant="h3" color="primary">
          {recordForEdit
            ? recordForEdit.jobtitle + ' ' + recordForEdit.id
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
              <ProfileDetails recordForEdit={recordForEdit}  addOrEdit={addOrEdit} />
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

                {/* <Typography noWrap className={classes.roundDescription}></Typography> */}
              </AccordionSummary>
              <AccordionDetails className={classes.innerAccordian}>
                <RoundDetails
                  round={round}
                  driveId={drive.drive}
                  roundNumber={roundNumber}
                  changeUpdated={changeUpdated}
                />
              </AccordionDetails>
              <Divider />
              <AccordionActions>
                <React.Fragment>
                  {/* <input
                    ref={uploadInputRef}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={event => handleFileChange(event)}
                  /> */}
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
              </AccordionActions>
            </Accordion>
          </div>
        ))}
      </div>
      {/* <div>
        <Typography variant="h3" color="primary">
              Drive Manager
        </Typography>
        <Divider style={{ margin: 10 }} />
        <div className={classes.root}>
          <Accordion
            expanded={expanded === 'panel3'}
            onChange={handleChange('panel3')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.SettingHeading}>
                Volunteers and Co-ordinators Setting
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.innerAccordian}>
              <VolunteerCoordinatorDetails studentForEdit={studentForEdit} staffForEdit={staffForEdit} recordForEdit={recordForEdit} />
            </AccordionDetails>
          </Accordion>
        </div>
      </div> */}
      
      <div>
        <Typography variant="h3" color="primary">
              Volunteers Manager
        </Typography>
        <Divider style={{ margin: 10 }} />
        <div className={classes.root}>
          <Accordion
            expanded={expanded === 'panel4'}
            onChange={handleChange('panel4')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.SettingHeading}>
                Volunteers Settings
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.innerAccordian}>
            {studentForEdit  ? <VolunteerUpdate studentForEdit={studentForEdit} setStudentForEdit={setStudentForEdit} recordForEdit={recordForEdit}/>  : "Loading ..."}              
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

      <div>
        <Typography variant="h3" color="primary">
              Coordinators Manager
        </Typography>
        <Divider style={{ margin: 10 }} />
        <div className={classes.root}>
          <Accordion
            expanded={expanded === 'panel5'}
            onChange={handleChange('panel5')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.SettingHeading}>
                Coordinators Settings
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.innerAccordian}>
            {staffForEdit  ? <CoordinatorUpdate staffForEdit={staffForEdit} setStaffForEdit={setStaffForEdit} recordForEdit={recordForEdit}/> : "Loading ....." }
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

    </div>
  );
}
