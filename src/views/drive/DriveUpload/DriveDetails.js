// import React, { useState, useEffect /*useRef*/ } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Accordion from '@material-ui/core/Accordion';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { Divider, Button } from '@material-ui/core';
// import ProfileDetails from '../DriveListView/ProfileDetails';
// import VolunteerUpdate from '../DriveUpload/VolunteerUpdate';
// import CoordinatorUpdate from '../DriveUpload/CoordinatorUpdate';
// import InterviewerUpdate from '../DriveUpload/InterviewerUpdate';
// import RoundService from '../../../services/RoundService';
// import DriveService from '../../../services/DriveService';
// import RoundDetails from './RoundDetails';
// import AccordionActions from '@material-ui/core/AccordionActions';
// import SaveIcon from '@material-ui/icons/Save';
// import axios from 'axios';
// import Auth from '../../../auth';
// import ProgressBar from '../../../components/controls/ProgressBar';

// // import Round from './Rounds';

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%'
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     // flexBasis: '15.33%',
//     flexShrink: 0
//   },
//   SettingHeading: {
//     fontSize: theme.typography.pxToRem(15),
//     // flexBasis: '33.33%',
//     flexShrink: 0
//   },
//   roundName: {
//     fontSize: theme.typography.pxToRem(15),
//     color: theme.palette.text.secondary,
//     // flexBasis: '5.33%',
//     flexShrink: 0
//   },
//   roundDescription: {
//     fontSize: theme.typography.pxToRem(15),
//     color: theme.palette.text.secondary,
//     // flexBasis: '5.33%',
//     flexShrink: 0
//   },
//   innerAccordian: {
//     backgroundColor: 'rgba(0, 0, 0, .03)',
//     justifyContent: 'center'
//   },
//   topmargin: {
//     paddingTop: '20px'
//   }
// }));

// export default function DriveDetails(drive) {
//   const classes = useStyles();
//   const [expanded, setExpanded] = React.useState(false);
//   const [rounds, setRounds] = useState([]);
//   const [recordForEdit, setRecordForEdit] = useState(null);
//   const [staffForEdit, setStaffForEdit] = useState(null);
//   const [interviewerForEdit, setInterviewerForEdit] = useState(null);
//   const [studentForEdit, setStudentForEdit] = useState(null);
//   const handleChange = panel => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   const getAllRounds = driveId => {
//     console.log('driveId', driveId);
//     RoundService.getAllRounds(driveId)
//       .then(res => {
//         setRounds([...res.data]);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };
//   const addOrEdit = (drive, resetForm) => {
//     if (drive.id === 0) console.log('Inserted');
//     else console.log('Edited');
//     setRecordForEdit(null);
//     console.log('From add or edit');
//   };
//   const exportToExcel = round => {
//     RoundService.exportRoundStudents(drive.drive, round.number).then(
//       ({ data }) => {
//         const downloadUrl = window.URL.createObjectURL(new Blob([data]));
//         const link = document.createElement('a');
//         link.href = downloadUrl;
//         link.setAttribute('download', 'Round_' + round.name + '.xlsx'); //any other extension
//         document.body.appendChild(link);
//         link.click();
//         link.remove();
//       }
//     );
//   };

//   useEffect(() => {
//     console.log(drive, 'props');

//     // Getting Drive Details

//     DriveService.getSingleDrive({ id: drive.drive })
//       .then(res => {
//         setRecordForEdit(res.data);
//       })
//       .catch(err => {
//         console.log(err);
//       });

//     getAllRounds(drive.drive);

//     DriveService.getDriveCoordinators({ id: drive.drive })
//       .then(res => {
//         setStaffForEdit(res.data);
//       })
//       .catch(err => {
//         console.log(err);
//       });

//     DriveService.getDriveInterviewers({ id: drive.drive })
//       .then(res => {
//         setInterviewerForEdit(res.data);
//       })
//       .catch(err => {
//         console.log(err);
//       });

//     DriveService.getDriveVolunteers({ id: drive.drive })
//       .then(res => {
//         setStudentForEdit(res.data);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }, []);

//   const [roundNumber, setRoundNumber] = useState(0);
//   const changeUpdated = roundNumber => {
//     console.log('changeUpdated before', roundNumber);
//     setRoundNumber(roundNumber);
//     console.log('changeUpdated after', roundNumber);
//   };
//   // File upload:
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = event => {
//     console.log('file', event.target.files[0]);
//     setSelectedFile(event.target.files[0]);
//   };
//   const handleClick = roundNumber => {
//     const data = new FormData();
//     data.append('file', selectedFile);
//     console.log(selectedFile);
//     axios
//       .put(
//         'http://20.37.243.248:8000/api/drive/' +
//           drive.drive +
//           '/upload/round/' +
//           roundNumber +
//           '/',
//         data,
//         {
//           headers: {
//             'Content-type': 'application/json',
//             'X-Requested-With': 'XMLHttpRequest',
//             Authorization: 'Token ' + Auth.getToken()
//           }
//         }
//       )
//       .then(res => {
//         console.log(res);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };
//   //const uploadInputRef = useRef(null);

//   if(recordForEdit){
//   return (
//     <div>
//       <div>
//         <Typography variant="h3" color="primary">
//           {recordForEdit
//             ? recordForEdit.jobtitle + ' ' + recordForEdit.id
//             : 'Drive name'}
//         </Typography>
//         <Divider style={{ margin: 10 }} />
//         <div className={classes.root}>
//           <Accordion
//             expanded={expanded === 'panel1'}
//             onChange={handleChange('panel1')}
//           >
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls="panel1bh-content"
//               id="panel1bh-header"
//             >
//               <Typography className={classes.SettingHeading}>
//                 Drive Settings
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails className={classes.innerAccordian}>
//               <ProfileDetails
//                 recordForEdit={recordForEdit}
//                 addOrEdit={addOrEdit}
//               />
//             </AccordionDetails>
//           </Accordion>
//         </div>
//       </div>

//       <div>
//         <Typography className={classes.topmargin} variant="h3" color="primary">
//           Round Details
//         </Typography>
//         <Divider style={{ margin: 10 }} />
//         {rounds.map(round => (
//           <div className={classes.root} key={round.number}>
//             <Accordion
//               style={{ margin: '10px auto' }}
//               expanded={expanded === round.number}
//               onChange={handleChange(round.number)}
//             >
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="panel1bh-content"
//                 id="panel1bh-header"
//               >
//                 <Typography className={classes.heading}>
//                   Round {round.number} : {round.name}
//                 </Typography>

//                 {/* <Typography noWrap className={classes.roundDescription}></Typography> */}
//               </AccordionSummary>
//               <AccordionDetails className={classes.innerAccordian}>
//                 <RoundDetails
//                   round={round}
//                   driveId={drive.drive}
//                   roundNumber={roundNumber}
//                   changeUpdated={changeUpdated}
//                 />
//               </AccordionDetails>
//               <Divider />
//               <AccordionActions>
//                 <React.Fragment>
//                   {/* <input
//                     ref={uploadInputRef}
//                     type="file"
//                     style={{ display: 'none' }}
//                     onChange={event => handleFileChange(event)}
//                   /> */}
//                   <div className={classes.uploadArea}>
//                     <input
//                       type="file"
//                       name="file"
//                       onChange={event => handleFileChange(event)}
//                     />
//                     <Button
//                       type="button"
//                       onClick={() => handleClick(round.number)}
//                       variant="contained"
//                       color="primary"
//                       className={classes.button}
//                     >
//                       {' '}
//                       Upload
//                     </Button>
//                   </div>
//                 </React.Fragment>
//                 <Button
//                   color="primary"
//                   className={classes.button}
//                   startIcon={<SaveIcon />}
//                   onClick={() => exportToExcel(round)}
//                 >
//                   Export to excel
//                 </Button>
//               </AccordionActions>
//             </Accordion>
//           </div>
//         ))}
//       </div>

//       <div>
//         <Typography className={classes.topmargin} variant="h3" color="primary">
//           Volunteers Manager
//         </Typography>
//         <Divider style={{ margin: 10 }} />
//         <div className={classes.root}>
//           <Accordion
//             expanded={expanded === 'panel4'}
//             onChange={handleChange('panel4')}
//           >
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls="panel1bh-content"
//               id="panel1bh-header"
//             >
//               <Typography className={classes.SettingHeading}>
//                 Volunteers Settings
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails className={classes.innerAccordian}>
//               {studentForEdit ? (
//                 <VolunteerUpdate
//                   studentForEdit={studentForEdit}
//                   setStudentForEdit={setStudentForEdit}
//                   recordForEdit={recordForEdit}
//                 />
//               ) : (
//                 'Loading ...'
//               )}
//             </AccordionDetails>
//           </Accordion>
//         </div>
//       </div>

//       <div>
//         <Typography className={classes.topmargin} variant="h3" color="primary">
//           Coordinators Manager
//         </Typography>
//         <Divider style={{ margin: 10 }} />
//         <div className={classes.root}>
//           <Accordion
//             expanded={expanded === 'panel5'}
//             onChange={handleChange('panel5')}
//           >
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls="panel1bh-content"
//               id="panel1bh-header"
//             >
//               <Typography className={classes.SettingHeading}>
//                 Coordinators Settings
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails className={classes.innerAccordian}>
//               {staffForEdit ? (
//                 <CoordinatorUpdate
//                   staffForEdit={staffForEdit}
//                   setStaffForEdit={setStaffForEdit}
//                   recordForEdit={recordForEdit}
//                 />
//               ) : (
//                 'Loading .....'
//               )}
//             </AccordionDetails>
//           </Accordion>
//         </div>
//       </div>
//       <div>
//         <Typography className={classes.topmargin} variant="h3" color="primary">
//           Interviewer Manager
//         </Typography>
//         <Divider style={{ margin: 10 }} />
//         <div className={classes.root}>
//           <Accordion
//             expanded={expanded === 'panel6'}
//             onChange={handleChange('panel6')}
//           >
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls="panel1bh-content"
//               id="panel1bh-header"
//             >
//               <Typography className={classes.SettingHeading}>
//                 Interviewer Settings
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails className={classes.innerAccordian}>
//               {interviewerForEdit ? (
//                 <InterviewerUpdate
//                   interviewerForEdit={interviewerForEdit}
//                   setInterviewerForEdit={setInterviewerForEdit}
//                   recordForEdit={recordForEdit}
//                 />
//               ) : (
//                 'Loading .....'
//               )}
//             </AccordionDetails>
//           </Accordion>
//         </div>
//       </div>
//     </div>
//   );

// }
// else{
//   return <ProgressBar/>
// }
// }



import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider, Button } from '@material-ui/core';
import ProfileDetails from '../DriveListView/ProfileDetails';
import VolunteerUpdate from '../DriveUpload/VolunteerUpdate';
import CoordinatorUpdate from '../DriveUpload/CoordinatorUpdate';
import InterviewerUpdate from '../DriveUpload/InterviewerUpdate';
import RoundService from '../../../services/RoundService';
import DriveService from '../../../services/DriveService';
import RoundDetails from './RoundDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import Auth from '../../../auth';
import ProgressBar from '../../../components/controls/ProgressBar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0
  },
  SettingHeading: {
    fontSize: theme.typography.pxToRem(15),    
    flexShrink: 0
  },
  roundName: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexShrink: 0
  },
  roundDescription: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
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

const options = ['All', 'Accepted', 'Rejected', 'Pending'];

export default function DriveDetails(drive) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [rounds, setRounds] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [staffForEdit, setStaffForEdit] = useState(null);
  const [interviewerForEdit, setInterviewerForEdit] = useState(null);
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
    if (drive.id === 0) console.log('Inserted');

    setFlag(true);
    setRecordForEdit(null);
  };
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

  const [flag, setFlag] = useState(true);
  useEffect(() => {

    // Getting Drive Details
    if(flag){
    DriveService.getSingleDrive({ id: drive.drive })
      .then(res => {
        setRecordForEdit(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    getAllRounds(drive.drive);

    DriveService.getDriveCoordinators({ id: drive.drive })
      .then(res => {
        setStaffForEdit(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    DriveService.getDriveInterviewers({ id: drive.drive })
      .then(res => {
        setInterviewerForEdit(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    DriveService.getDriveVolunteers({ id: drive.drive })
      .then(res => {
        setStudentForEdit(res.data);
      })
      .catch(err => {
        console.log(err);
      });
      setFlag(false);
    }
  }, [flag]);

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
        'http://20.37.243.248:8000/api/drive/' +
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


  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  if (recordForEdit) {
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
                <ProfileDetails
                  recordForEdit={recordForEdit}
                  addOrEdit={addOrEdit}
                />
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


                  <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">                    
                    <Button
                      color="primary"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                      onClick={() => exportToExcel(round)}
                    >
                      {options[selectedIndex]}
                    </Button>
                    <Button
                      color="primary"
                      size="small"
                      aria-controls={open ? 'split-button-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-label="select merge strategy"
                      aria-haspopup="menu"
                      onClick={handleToggle}
                    >
                      <ArrowDropDownIcon />
                    </Button>
                  </ButtonGroup>
                  <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin: placement === 'top' ? 'center top' : 'center top',
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList id="split-button-menu">
                              {options.map((option, index) => (
                                <MenuItem
                                  key={option}
                                  disabled={index === 2}
                                  selected={index === selectedIndex}
                                  onClick={(event) => handleMenuItemClick(event, index)}
                                >
                                  {option}
                                </MenuItem>
                              ))}
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </AccordionActions>
              </Accordion>
            </div>
          ))}
        </div>

        <div>
          <Typography className={classes.topmargin} variant="h3" color="primary">
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
                {studentForEdit ? (
                  <VolunteerUpdate
                    studentForEdit={studentForEdit}
                    setStudentForEdit={setStudentForEdit}
                    recordForEdit={recordForEdit}
                  />
                ) : (
                    'Loading ...'
                  )}
              </AccordionDetails>
            </Accordion>
          </div>
        </div>

        <div>
          <Typography className={classes.topmargin} variant="h3" color="primary">
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
                {staffForEdit ? (
                  <CoordinatorUpdate
                    staffForEdit={staffForEdit}
                    setStaffForEdit={setStaffForEdit}
                    recordForEdit={recordForEdit}
                  />
                ) : (
                    'Loading .....'
                  )}
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div>
          <Typography className={classes.topmargin} variant="h3" color="primary">
            Interviewer Manager
        </Typography>
          <Divider style={{ margin: 10 }} />
          <div className={classes.root}>
            <Accordion
              expanded={expanded === 'panel6'}
              onChange={handleChange('panel6')}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.SettingHeading}>
                  Interviewer Settings
              </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.innerAccordian}>
                {interviewerForEdit ? (
                  <InterviewerUpdate
                    interviewerForEdit={interviewerForEdit}
                    setInterviewerForEdit={setInterviewerForEdit}
                    recordForEdit={recordForEdit}
                  />
                ) : (
                    'Loading .....'
                  )}
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    );

  }
  else {
    return <ProgressBar />
  }
}