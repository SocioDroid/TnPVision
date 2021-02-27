import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoginService from '../../../services/LoginService';

const useStyles = makeStyles(({
  root: {}
}));

const Password = ({ className, ...rest }) => {
  const classes = useStyles();
  const [value, setValue] = useState({
    confirm: ''
  });
  
  const [isSubmitting, setSubmitionCompleted] = React.useState(false);

  const handleChange = (event) => {
    setValue({
      confirm: event.target.value
    });
  };

  const formik = useFormik({
		initialValues: {
      old_password: '',
      new_password:'',
		},
		onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);  
      if(value.confirm === values.new_password){
        LoginService.changePassword({old_password: values.old_password, new_password : values.new_password})
          .then( result=>{
            console.log("Password Changes successfully");
            setSubmitionCompleted(false);
          })
          .catch(error => {
            console.log(error);
            setSubmitionCompleted(false);
          })
          
      }
      else{
        console.log("Password not matching")
        setSubmitionCompleted(false);
      }	
      
		},
		validationSchema: Yup.object({
      // email: Yup.string().email('Invalid Email').required('Required'),
      // password: Yup.string().min(5, 'Minimum 5 characters required').required('Required'),
			// password: Yup.string().min(5, 'Minimum 5 characters required').required('Required'),
		})
  });
  
  return (
    <form 
    onSubmit={formik.handleSubmit}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
        <TextField
            fullWidth
            label="Current Password"
            margin="normal"
            name="old_password"
            id="old_password"
            onChange={formik.handleChange}
            type="password"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="New Password"
            margin="normal"
            name="new_password"
            id="new_password"
            onChange={formik.handleChange}
            type="password"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={value.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            // onClick = {changePassword}
            type="submit" 
            disabled={isSubmitting}
          >
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
