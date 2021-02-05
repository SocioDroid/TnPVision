// import React from 'react'
 import ProfileDetaiils from '../DriveListView/ProfileDetails'

//  export default function AfterDriveUpload(){
//     return(
//         <div>
//             <ProfileDetaiils/>
//         </div>
//     )
//  }


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Drive Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <ProfileDetaiils/>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Round Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <ProfileDetaiils/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
