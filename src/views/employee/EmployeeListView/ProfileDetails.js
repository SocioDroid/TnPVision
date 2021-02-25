import React, { useState, useEffect } from 'react';
import { useForm } from '../../../components/useForm';
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
  Grid,
  CardHeader,
  Divider,
  TextField,
  MenuItem
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import EmployeeService from '../../../services/EmployeeServices'

const collegeItems = [
  {
    value: 'DYPCOE',
    label: 'DYPCOE'
  },
  {
    value: 'DYPIEMR',
    label: 'DYPIEMR'
  }
];

const departmentItems = [
  {
    value: 'Computer',
    label: 'Computer',
  },
  {
    value: 'IT',
    label: 'IT',
  },
  {
    value: 'Civil',
    label: 'Civil',
  },
  {
    value: 'Mechanical',
    label: 'Mechanical',
  },
  {
    value: 'Instrumentation',
    label: 'Instrumentation',
  },
];

const initialFValues = {
  id: 0,
  user: {
    email: '',
    first_name: '',
    last_name: ''
  },
  gender: 'M',
  isDeleted: false,
  isProfileComplete: false,

  mobile: "",
  doj: "",
  department: "",
  designation: ""

};

export default function ProfileDetails(props) {
  const [values, setValues] = useState({
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    college: '',
    isDeleted: false,
    isProfileComplete: false,
    mobile: "",
    doj: "",
    department: "",
    designation: ""
  });

  const { addOrEdit, recordForEdit, isUpdating } = props;

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
  const { errors, setErrors, resetForm } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleChange = event => {
    //console.log("Date in text: ", event.target.value)
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      const data = {
        user: {
          email: values.email,
          first_name: values.first_name,
          last_name: values.last_name
        },
        college: values.college,
        
        mobile: values.mobile,
        doj: new Date(datevalues.doj).toISOString().slice(0,10),
        department: values.department,
        designation: values.designation
      };
      if(isUpdating){
        EmployeeService.updateEmployee(values.id, data)
        .then(res => {
          addOrEdit(values, resetForm);
          console.log('res', res);
        })
        .catch(error => {});
      }else{
        console.log("Not implemented");
      } 
    }
  };

  useEffect(() => {
    //console.log(props, isUpdating)
    if(isUpdating){
      setDatevalues({
        ...datevalues,
        doj : recordForEdit.doj
      })
      setValues({
        ...values,
        id: recordForEdit.id,
        first_name: recordForEdit.user.first_name,
        last_name: recordForEdit.user.last_name,
        email: recordForEdit.user.email,
        college: recordForEdit.college,
        isDeleted: recordForEdit.isDeleted,
        isProfileComplete: recordForEdit.isProfileComplete,          
        
        mobile: recordForEdit.mobile,
        doj: recordForEdit.doj,
        department: recordForEdit.department,
        designation: recordForEdit.designation
      });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} autoComplete="off" noValidate>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="employee Profile"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
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
                disabled
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Mobile"
                name="mobile"
                onChange={handleChange}
                type="text"
                value={values.mobile}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="College"
                name="college"
                onChange={handleChange}
                type="text"
                value={values.college}
                variant="outlined"
                select
              >
                {collegeItems.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Department"
                name="department"
                onChange={handleChange}
                type="text"
                value={values.department}
                variant="outlined"
                select
              >
                {departmentItems.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                ))}
              </TextField>
            </Grid>            
            {/* <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Date of Joining"
                name="doj"
                onChange={handleChange}
                type="text"
                value={values.doj}
                variant="outlined"
              />
            </Grid> */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item md={6} xs={12}>
                  <KeyboardDatePicker
                    fullWidth
                    label="Date of Drive"
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
                label="Designation"
                name="designation"
                onChange={handleChange}
                type="text"
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
            {isUpdating ? 'Update details' : 'Save Details'}
          </Button>
        </Box>
      </Card>
    </form>
  );
}

ProfileDetails.propTypes = {
  className: PropTypes.string
};