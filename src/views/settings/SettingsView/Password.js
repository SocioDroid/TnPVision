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
import swal from 'sweetalert';

const useStyles = makeStyles(({
  root: {}
}));

const Password = ({ className, ...rest }) => {
  const classes = useStyles();
  const [value, setValue] = useState({
    confirm: ''
  });
  const [isDataSubmitted, setDataSubmitted] = React.useState(false);

  const handleChange = (event) => {
    setValue({
      confirm: event.target.value
    });
  };

  const formik = useFormik({
		initialValues: {
      old_password: '',
      new_password:'',
      confirm: ''
		},
		onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);  
      if(values.confirm === values.new_password){
        LoginService.changePassword({old_password: values.old_password, new_password : values.new_password})
          .then( result=>{
            swal({
              title: "Thank You!",
              text: "Password Updated Successfully!",
              icon: "success",
              button: "Close!",
              timer: 1500
            });
            setDataSubmitted(false);
            resetForm({})
          
          })
          .catch(error => {
            console.log(error);
            setSubmitting(false)
            setDataSubmitted(false);
            swal({
              title: "Error Occured?",
              icon: "warning",
              button: "Close!",
              timer: 1500
            })
            
          })
          
      }
      else{
        console.log("Password not matching")
        setDataSubmitted(false);
        swal({
          title: "Error Occured?",
          icon: "warning",
          button: "Close!",
          timer: 1500
        })
      }	
      
		},
		validationSchema: Yup.object({
      old_password: Yup.string().required('Required'),
      new_password: Yup.string().min(5, 'Minimum 5 characters required').required('Required'),
			confirm: Yup.string().oneOf([Yup.ref('new_password'), null], 'Passwords must match')
		})
  });
  
  return (
    <div>
    {!isDataSubmitted && <React.Fragment>
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
            value={formik.values.old_password}
            error={formik.errors.old_password && formik.touched.old_password}
            helperText= {(formik.errors.old_password && formik.touched.old_password) && formik.errors.old_password}
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
            value={formik.values.new_password}
            error={formik.errors.new_password && formik.touched.new_password}
            helperText= {(formik.errors.new_password && formik.touched.new_password) && formik.errors.new_password}
            type="password"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={formik.handleChange}
            type="password"
            value={formik.values.confirm}
            error={formik.errors.confirm && formik.touched.confirm}
            helperText= {(formik.errors.confirm && formik.touched.confirm) && formik.errors.confirm}
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
            disabled={formik.isSubmitting}
          >
            Update
          </Button>
        </Box>
      </Card>
    </form>
    </React.Fragment>
  }
  </div>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
