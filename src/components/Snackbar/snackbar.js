import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CustomSnackbar(props) {
  return (
    <div>
        <Alert onClose={props.onClose} severity={props.severity}>
          {props.message}
        </Alert>
    </div>
  );
}

export default CustomSnackbar