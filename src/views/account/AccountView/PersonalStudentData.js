import React, { useState, useEffect } from 'react';
import Controls from "../../../components/controls/Controls";
import { MenuItem } from '@material-ui/core';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core';
import { useForm } from '../../../components/useForm';
import axios from 'axios';
import Auth from '../../../auth';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import StudentService from '../../../services/StudentService';

const genderItems = [
  { id: 'M', title: 'Male' },
  { id: 'F', title: 'Female' },
  { id: 'O', title: 'Other' },
]
const categoryItems = [
  {id: 'SBC', title: 'SBC'},
  {id: 'OBC', title: 'OBC'},
  {id: 'OPEN', title: 'OPEN'},
]

const initialFValues = {
  id: 0,
  user: {
    email: "",
    first_name: "",
    last_name: ""
  },
  gender: "M",
  group: 0,
  mobileNumber: "",
  category: "",
  PAN_number: "",
  aadhar: "",
  dob: "",
  homeTown: "",
  fatherOccupation: "",
  motherOccupation: "",
  parentsEmail: "",
  parentsMobileNumber: 0,
}

const PersonalData = ({ userData }) => {

  console.log("in personalData", userData);


  const [values, setValues] = useState({
    email: "",
    first_name: "",
    last_name: "",
    gender: "M",
    group: 0,
    id: 0,
    mobileNumber: "",
    category: "",
    PAN_number: "",
    aadhar: "",
    dob: "",
    homeTown: "",
    fatherOccupation: "",
    motherOccupation: "",
    parentsEmail: "",
    parentsMobileNumber: 0,

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
    if (fieldValues === values)
      return Object.values(temp).every(x => x === "")
  }

  const {
    errors,
    setErrors,
  } = useForm(initialFValues, true, validate);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const [datevalues, setDatevalues] = useState({
    date: new Date()
  })

  const handDateChange = (event) => {
    console.log("date event", new Date(event).toISOString())
    setDatevalues({date: event})
  }

  const handleSubmit = e => {
    console.log(values);
    e.preventDefault()
    console.log("e", e);

    if (validate()) {
      const data = {
        "first_name": values.first_name,
        "last_name": values.last_name,
        "studentProfile": {
        //"user": {
          //"email": values.email,
        //"first_name": values.first_name,
        //"last_name": values.last_name,
        //},
        "gender": values.gender,
        "group": values.group,
        "id": values.id,
        "mobileNumber": values.mobileNumber,
        "category": values.category,
        "PAN_number": values.PAN_number,
        "aadhar": values.aadhar,
        "dob": JSON.stringify(datevalues.date).slice(1,11),
        "homeTown": values.homeTown,
        "fatherOccupation": values.fatherOccupation,
        "motherOccupation": values.motherOccupation,
        "parentsEmail": values.parentsEmail,
        "parentsMobileNumber": values.parentsMobileNumber,
      }
    }
    console.log("data.dob  -===========> ",JSON.stringify(datevalues.date).slice(1,11))
      StudentService.updateStudent(data)
        .then(res => {
          console.log("res", res);
        }).catch(error => {
          console.log(error);
        });
      // setTimeout(window.location.reload(false), 40000);
    }
  }

  useEffect(() => {
    if (userData != null) {
      console.log(userData.dob)
      setDatevalues({
        ...datevalues,
        "date": userData.user && userData.dob ? userData.dob : "",
      })

      setValues({
        ...values,
        "email": userData.user && userData.user.email ? userData.user.email : "",
        "first_name": userData.user && userData.user.first_name ? userData.user.first_name : "",
        "last_name": userData.user && userData.user.last_name ? userData.user.last_name : "",
        "gender": userData.user && userData.gender ? userData.gender : "",
        "group": userData.group,
        "id": userData.id,

        "mobileNumber": userData && userData.mobileNumber ? userData.mobileNumber : "",
        "category": userData && userData.category ? userData.category: "",
        "PAN_number": userData && userData.PAN_number ? userData.PAN_number: "",
        "aadhar": userData && userData.aadhar ? userData.aadhar: "",
        "dob": userData && userData.dob ? userData.dob : "",
        "homeTown": userData && userData.hometown ? userData.homeTown : "",

        "fatherOccupation": userData && userData.fatherOccupation ? userData.fatherOccupation : "",
        "motherOccupation": userData && userData.motherOccupation ? userData.motherOccupation : "",
        "parentsEmail": userData && userData.parentsEmail ? userData.parentsEmail : "",
        "parentsMobileNumber": userData && userData.pparentsMobileNumber ?  userData.pparentsMobileNumber : "",
      })
    }
  }, [userData])

  return (
    <div>
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
            <br />
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
                  label="First Name"
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
                  label="Last Name"
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
                  disabled
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
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
                  label="Phone Number"
                  name="mobileNumber"
                  onChange={handleChange}
                  type="text"
                  value={values.mobileNumber}
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
                  label="Category"
                  name="category"
                  onChange={handleChange}
                  required
                  value={values.category}
                  variant="outlined"
                  select
                >
                  {categoryItems.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.title}
                    </MenuItem>
                  ))} 
              </TextField>
                
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="PAN"
                  name="PAN_number"
                  onChange={handleChange}
                  required
                  value={values.PAN_number}
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
                  label="Aadhar"
                  name="aadhar"
                  onChange={handleChange}
                  required
                  value={values.aadhar}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                <KeyboardDatePicker
                  fullWidth
                  label="Date of Birth"
                  inputVariant="outlined"
                  format="yyyy/MM/dd"
                  value={datevalues.date}
                  onChange={handDateChange}
                  InputLabelProps={{ shrink: true }}
                />
   
              </MuiPickersUtilsProvider>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Home Town"
                  name="homeTown"
                  onChange={handleChange}
                  required
                  value={values.homeTown}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <Controls.RadioGroup
                  name="gender"
                  label="Gender"
                  value={values.gender}
                  onChange={handleChange}
                  items={genderItems}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Father Occupation"
                  name="fatherOccupation"
                  onChange={handleChange}
                  required
                  value={values.fatherOccupation}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Mother Occupation"
                  name="motherOccupation"
                  onChange={handleChange}
                  required
                  value={values.motherOccupation}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Parents Email"
                  name="parentsEmail"
                  onChange={handleChange}
                  required
                  value={values.parentsEmail}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12} >
                <TextField
                  fullWidth
                  label="Parents Mobile Number"
                  name="parentsMobileNumber"
                  onChange={handleChange}
                  required
                  value={values.parentsMobileNumber}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Divider style={{ marginTop: 10 }} />
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
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

export default PersonalData;