import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Controls from "../../../components/controls/Controls";
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox , Typography , AppBar} from '@material-ui/core';
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
  import { useForm, Form } from '../../../components/useForm';

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

  const PersonalData =({userData}) => {

    const [values, setValues] = useState({
      "email" : "",
      "first_name" : "",
      "last_name" : "",
      "gender" : "M",
      "group" : 0,
      "id" : 0,
  
      "phone" : "",
      "category" : "",
      "pan" : "",
      "aadhar" : "",
      "dob" : "",
      "hometown" : "",
  
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
      console.log(values);
      e.preventDefault()
      console.log("e",e);
      
      if (validate()) {
        const data = {
          "user": {
            "email": values.email,
            "first_name": values.first_name,
            "last_name": values.last_name
          },
          "gender": values.gender,
        }
        // axios.patch("https://tnpvision-cors.herokuapp.com/https://tnpvisionapi.herokuapp.com/api/student/" + values.id, data)
        //   .then(res =>{
        //     console.log("res", res);
        //   }).catch(error => {
        //     console.log(error);   
        //   });
      }
    }
  
    useEffect(() =>{
      if(userData !=null){
        setValues({
          ...values,
          "email" : userData.email,
          "first_name" : userData.first_name,
          "last_name" : userData.last_name,
          "gender" : userData.gender,
          "group" : userData.group,
          "id" : userData.id,
  
          "phone" : userData.phone,
          "category" : userData.category,
          "pan" : userData.pan,
          "aadhar" : userData.aadhar,
          "dob" : userData.dob,
          "hometown" : userData.hometown,
        })
      }
    },[userData])

      return(
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
                        <br/>
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
                                helperText="Please specify the First Name"
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
                                helperText="Please specify the Last Name"
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
                                helperText="Please specify the Email Address"
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
                                helperText="Please specify the Phone Number"
                                label="Phone Number"
                                name="phone"
                                onChange={handleChange}
                                type="number"
                                value={values.phone}
                                variant="outlined"
                                /> 
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
                                <TextField
                                fullWidth
                                helperText="Please specify the Category"
                                label="Category"
                                name="category"
                                onChange={handleChange}
                                required
                                value={values.category}
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
                                helperText="Please specify the PAN"
                                label="PAN"
                                name="pan"
                                onChange={handleChange}
                                required
                                value={values.pan}
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
                                helperText="Please specify the Aadhar Number"
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
                                <TextField
                                fullWidth
                                helperText="Please specify the Date of Birth"
                                label="Date of Birth"
                                name="dob"
                                onChange={handleChange}
                                required
                                value={values.dob}
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
                                helperText="Please specify the Home Town"
                                label="Home Town"
                                name="hometown"
                                onChange={handleChange}
                                required
                                value={values.hometown}
                                variant="outlined"
                                />
                            </Grid>
                        </Grid>
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
                    </CardContent>   
                </Card>
            </form>
          </div>
      )
  }

  export default PersonalData;