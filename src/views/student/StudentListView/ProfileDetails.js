import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { useForm, Form } from '../../../components/useForm';
import Controls from "../../../components/controls/Controls";
import PropTypes from 'prop-types';
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  CardHeader,
  Divider,
  Checkbox,
  TextField,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const genderItems = [
  { id: 'M', title: 'Male' },
  { id: 'F', title: 'Female' },
  { id: 'O', title: 'Other' },
]

const initialFValues = {
  id: 0,
  user: {
    email: "",
    first_name: "",
    last_name: ""
  },
  gender: "M",
  isDeleted: false,
  isProfileComplete: false
}


export default function ProfileDetails(props) {
  const [values, setValues] = useState({
    id: 0,
    email: "",
    first_name: "",
    last_name: "",
    gender: "M",
    isDeleted: false,
    isProfileComplete: false
  });
  const classes = useStyles();

  const { addOrEdit, recordForEdit } = props

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

    if (fieldValues === values)
      return Object.values(temp).every(x => x === "")
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
    if (validate()) {
      const data = {
        "user": {
          "email": values.email,
          "first_name": values.first_name,
          "last_name": values.last_name
        },
        "gender": values.gender
      }

      addOrEdit(values, resetForm);

      axios.patch("http://20.37.50.140:8000/api/student/" + values.id, data)
        .then(res =>{
          console.log("res", res);
        }).catch(error => {
          console.log(error);  
        });
     
    }
  }

  
  useEffect(() => {

    if (recordForEdit != null) {
      setValues({
        ...values,
        'id': recordForEdit.id,
        'first_name':recordForEdit.user.first_name,
        'last_name':recordForEdit.user.last_name,
        'email':recordForEdit.user.email,
        'gender':recordForEdit.gender,
        'isDeleted' : recordForEdit.isDeleted,
        'isProfileComplete': recordForEdit.isProfileComplete
      });
      console.log("IN Detaisl : ", values);
      console.log("IN Detaisl : ", recordForEdit);
    }
  }, [recordForEdit])

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
              {/* <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              /> */}
              <Controls.RadioGroup
                name="gender"
                label="Gender"
                value={values.gender}
                onChange={handleChange}
                items={genderItems}
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
