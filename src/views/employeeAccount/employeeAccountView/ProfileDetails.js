import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox
} from '@material-ui/core';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  MenuItem
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';
import { useForm } from '../../../components/useForm';
import Auth from '../../../auth';


const departmentItems = [
  {
    value: 'Computer',
    label: 'Computer Engineering'
  },
  {
    value: 'Civil',
    label: 'Civil Engineering'
  },
  {
    value: 'ENTC',
    label: 'E&TC Engineering'
  },
  {
    value: 'Instrumentation',
    label: 'Instrumentation Engineering'
  },
  {
    value: 'IT',
    label: 'Information Technology'
  },
  {
    value: 'Mechanical',
    label: 'Mechanical Engineering'
  }
];


const collegeItems = [

  {
      id: 'DYPCOE',
      title: 'DYPCOE',
  },
  {
      id: 'DYPIEMR',
      title: 'DYPIEMR',
  },
];

const initialFValues = {
  id: 0,
  user: {
    email: '',
    first_name: '',
    last_name: ''
  },
  college: '',
  mobile: '',
  doj: '',
  department: '',
  designation: '',
  isDeleted: false,
  isProfileComplete: false
};

const ProfileDetails = ({ className, userData, ...rest }) => {
  const [values, setValues] = useState({
    email: '',
    first_name: '',
    last_name: '',
    group: 0,
    id: 0,
    college: '',
    mobile: '',
    doj: '',
    department: '',
    designation: ''
  });

  const [datevalues, setDatevalues] = useState({
    doj: new Date()
  });

  const handDateChange = event => {
    console.log('date event=========>', new Date(event).toISOString().slice(0,10));
    //console.log('date event new =========>', event);
    setDatevalues({ doj: event });
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('first_name' in fieldValues)
      temp.first_name = fieldValues.first_name ? '' : 'This field is required.';
    if ('last_name' in fieldValues)
      temp.last_name = fieldValues.last_name ? '' : 'This field is required.';
    if ('email' in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ''
        : 'Email is not valid.';
    setErrors({
      ...temp
    });

    if (fieldValues === values) return Object.values(temp).every(x => x === '');
  };
  const { errors, setErrors } = useForm(initialFValues, true, validate);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('e', e);

    if (validate()) {
      const data = {
        first_name: values.first_name,
        last_name: values.last_name,

        employeeProfile: {
          college: values.college,
          mobile: values.mobile,
          //doj: values.doj,
          doj: new Date(datevalues.doj).toISOString().slice(0,10),
          department: values.department,
          designation: values.designation
        }
      };
      axios
        .put('http://20.37.50.140:8000/api/user/', data, {
          headers: {
            'Content-type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: 'Token ' + Auth.getToken()
          }
        })
        .then(res => {
          console.log('res', res);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  useEffect(() => {

      console.log("ProfileDetails : ",userData);
      setDatevalues({
        ...datevalues,
        doj : userData.doj
      })
      setValues({
        ...values,
        email: userData && userData.email ? userData.email: "",
        first_name: userData && userData.first_name ? userData.first_name: "",
        last_name: userData && userData.last_name ? userData.last_name: "",
        group: userData && userData.group ? userData.group : "",
        id: userData && userData.id ? userData.id: "",
        college: userData && userData.college ? userData.college: "",
        mobile: userData && userData.mobile ? userData.mobile: "",
        doj: userData && userData.dob ? userData.doj: "",
        department: userData && userData.department ? userData.department: "",
        designation: userData && userData.designation ? userData.designation: ""
      });
  }, []);

  return (
    <form onSubmit={handleSubmit} autoComplete="off" noValidate>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Employee Profile"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First name"
                name="first_name"
                onChange={handleChange}
                required
                value={values.first_name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
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
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            {/* <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Date of Joining"
                name="doj"
                onChange={handleChange}
                required
                value={values.doj}
                variant="outlined"
              />
            </Grid> */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item md={6} xs={12}>
                  <KeyboardDatePicker
                    fullWidth
                    label="Date of Joining"
                    inputVariant="outlined"
                    format="yyyy/MM/dd"
                    value={datevalues.doj}
                    onChange={handDateChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="College"
                name="college"
                onChange={handleChange}
                required
                value={values.college}
                variant="outlined"
                select
              >
                {collegeItems.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.title}
                    </MenuItem>
                  ))} 
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
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
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Department"
                name="department"
                onChange={handleChange}
                required
                value={values.department}
                variant="outlined"
                select
              >
                {departmentItems.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                  ))} 
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
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
            <Grid item md={6} xs={12}>
              <FormControl>
                <FormControlLabel
                  control={
                    <MuiCheckbox
                      name="isProfileComplete"
                      disabled
                      color="primary"
                      checked={values.isProfileComplete}
                    />
                  }
                  label="Is Profile Completed  ?"
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl>
                <FormControlLabel
                  control={
                    <MuiCheckbox
                      name="isDeleted"
                      disabled
                      color="primary"
                      checked={values.isDeleted}
                    />
                  }
                  label="Is Deleted ?"
                />
              </FormControl>              
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" type="submit">
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
