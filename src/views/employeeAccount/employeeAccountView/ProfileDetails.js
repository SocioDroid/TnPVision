import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Controls from "../../../components/controls/Controls";
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';
// import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import { useForm, Form } from '../../../components/useForm';

const initialFValues = {
  id: 0,
  user: {
    email: "",
    first_name: "",
    last_name: ""
  },
    college: "",
    mobile: "",
    doj: "",
    department: "",
    designation: "",
  isDeleted: false,
  isProfileComplete: false
}

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, userData, ...rest }) => {
  const classes = useStyles();
  // const [emails,setEmails] = useState([])
  // const myStyle = {};
  const [values, setValues] = useState({
    "email" : "",
    "first_name" : "",
    "last_name" : "",
    "group" : 0,
    "id" : 0,
    "college": '',
    "mobile": '',
    "doj": '',
    "department": '',
    "designation": ''
  });

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('first_name' in fieldValues)
      temp.first_name = fieldValues.first_name ? "" : "This field is required."
    if ('last_name' in fieldValues)
      temp.last_name = fieldValues.last_name ? "" : "This field is required."
    if ('email' in fieldValues)
      temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
    setErrors({
      ...temp
    })

    if (fieldValues == values)
      return Object.values(temp).every(x => x == "")
  }
  const {
    valuess,
    setValuess,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault()
    console.log("e",e);
    
    if (validate()) {
      const data = {
        "user": {
          "email": values.email,
          "first_name": values.first_name,
          "last_name": values.last_name
        },
        "college": values.college,
        "mobile": values.mobile,
        "doj": values.doj,
        "department": values.department,
        "designation": values.designation
      }

      axios.patch("http://20.37.50.140:8000/api/employee/" + values.id, data)
        .then(res =>{
          console.log("res", res);
        }).catch(error => {
          console.log(error);
          
        });

        setTimeout(window.location.reload(false), 10000);
    }
  }

  useEffect(() =>{
    if(userData !=null){
      setValues({
        ...values,
        "email" : userData.email,
        "first_name" : userData.first_name,
        "last_name" : userData.last_name,
        "group" : userData.group,
        "id" : userData.id,
        "college": userData.college,
        "mobile": userData.mobile,
        "doj": userData.doj,
        "department": userData.department,
        "designation": userData.designation
      })
    }
  },[userData])
 

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Student Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="first_name"
                onChange={handleChange}
                required
                value={values.first_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="last_name"
                onChange={handleChange}
                required
                value={values.last_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Date of Birth"
                name="doj"
                onChange={handleChange}
                required
                value={values.doj}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="College"
                name="college"
                onChange={handleChange}
                required
                value={values.college}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Mobile"
                name="mobile"
                onChange={handleChange}
                required
                value={values.mobile}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Department"
                name="department"
                onChange={handleChange}
                required
                value={values.department}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Designation"
                name="designation"
                onChange={handleChange}
                required
                value={values.designation}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormControl>
                <FormControlLabel
                  control={<MuiCheckbox
                    name="isProfileComplete"
                    disabled
                    color="primary"
                    checked={values.isProfileComplete}
                  />}
                  label="Is Profile Completed  ?"
                />
              </FormControl>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormControl>
                <FormControlLabel
                  control={<MuiCheckbox
                    name="isDeleted"
                    disabled
                    color="primary"
                    checked={values.isDeleted}
                  />}
                  label="Is Deleted ?"
                />
              </FormControl>
              {/* <FormControl>
              <ReactMultiEmailCustom
                style={myStyle}
                emails={emails}
                onChange={_emails => {
                  setEmails(_emails);
                }}
                getLabel={(
                  email,
                  index,
                  removeEmail,
                ) => {
                  return (
                    <label key={index}>
                      {email}
                      <HighlightOffIcon color="secondary" name="delete" onClick={() => removeEmail(index)} />
                    </label>
                  );
                }}
              />
            </FormControl>
            <FormControl>
              <label>react-multi-email-custom value</label>
              {emails.join(', ') || 'empty'}
            </FormControl> */}
            </Grid>
          </Grid>
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
            type="submit"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;