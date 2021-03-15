import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import PauseIcon from '@material-ui/icons/Pause';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function DriveStatusComponent(props) {
  const classes = useStyles();
  const { status } = props

if (status=="live"){
  return (
    <div className={classes.root}>
      <Tooltip title="Drive is live">
      <CircularProgress size={25}  style={{ color: 'red' }} />
      </Tooltip>
    </div>
  );
}
else if (status=="paused"){
  return (
    <div className={classes.root}>
      <Tooltip title="Drive has been paused">
      <PauseIcon size={25}  style={{ color: 'red' }} />
            </Tooltip>
    </div>
  );
}
else if (status=="completed"){
  return (
    <div className={classes.root}>
<Tooltip title="Drive has been completed">
      <CheckCircleIcon size={25}  style={{ color: 'green' }} />
 </Tooltip>
    </div>
  );
}
else if (status=="inactive"){
  return (
    <div className={classes.root}>
      <Tooltip title="Drive is yet to be started">
      <RemoveCircleOutlineIcon size={25}  style={{ color: 'grey' }} />
       </Tooltip>
    </div>
  );
}

}
