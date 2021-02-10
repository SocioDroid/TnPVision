import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CustomSnackbar(props) {
  const [open, setOpen] = React.useState(true);
  const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
    setOpen(false);
    props.changeError();
	};
  return (
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.severity}>
          {props.message}
        </Alert>
        </Snackbar>
    
  );
}

export default CustomSnackbar