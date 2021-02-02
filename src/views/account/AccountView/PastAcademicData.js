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

  const PastAcademicData =({userData}) => {

    const [values, setValues] = useState({
        "tenthpercentage": "60",
        "tenthboard": "",
        "tenthyear": "",
        "twelfthpercenatge": "60",
        "twelfthboard": "",
        "twelfthyear": "",
        "diplomapercentage": "60",
        "diplomaboard": "",
        "diplomayear": "",
        "enggqualifyyear": "",
        "enggqualifyscore": "",
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
            "tenthpercentage": userData.tenthpercentage,
            "tenthboard": userData.tenthboard,
            "tenthyear": userData.tenthyear,
            "twelfthpercenatge": userData.twelfthpercenatge,
            "twelfthboard": userData.twelfthboard,
            "twelfthyear": userData.twelfthyear,
            "diplomapercentage": userData.diplomapercentage,
            "diplomaboard": userData.diplomaboard,
            "diplomayear": userData.diplomayear,
            "enggqualifyyear": userData.enggqualifyyear,
            "enggqualifyscore": userData.enggqualifyscore,
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
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      type="number"
                      helperText="Please specify the Tenth Percentage"
                      label="Tenth Percentage"
                      name="tenthpercentage"
                      onChange={handleChange}
                      required
                      value={values.tenthpercentage}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      helperText="Please specify the Tenth Board "
                      label="Tenth Board of Examination"
                      name="tenthboard"
                      onChange={handleChange}
                      required
                      value={values.tenthboard}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      helperText="Please specify year of passing"
                      label="Tenth year of Passing"
                      name="tenthyear"
                      onChange={handleChange}
                      required
                      value={values.tenthyear}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      type="number"
                      helperText="Please specify the Twelfth Percentage"
                      label="Twelfth Percentage"
                      name="twelfthpercentage"
                      onChange={handleChange}
                      required
                      value={values.twelfthpercentage}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      helperText="Please specify the Twelfth Board"
                      label="Twelfth Board of Examination"
                      name="twelfthboard"
                      onChange={handleChange}
                      required
                      value={values.twelfthboard}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      helperText="Please specify year of passing"
                      label="Twelfth year of Passing"
                      name="twelfthyear"
                      onChange={handleChange}
                      required
                      value={values.twelfthyear}
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
                      type="number"
                      helperText="Please specify the Diploma Percentage"
                      label="Diploma Percentage"
                      name="diplomapercentage"
                      onChange={handleChange}
                      required
                      value={values.diplomapercentage}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      helperText="Please specify the Diploma Board"
                      label="Diploma Board of Examination"
                      name="diplomaboard"
                      onChange={handleChange}
                      required
                      value={values.diplomaboard}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      helperText="Please specify year of passing"
                      label="Diploma year of Passing"
                      name="diplomapassing"
                      onChange={handleChange}
                      required
                      value={values.diplomapassing}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      helperText="Please specify Engineering Qualifying Exam Year"
                      label="Engineering Qualifying Exam Year"
                      name="enggqualifyingyear"
                      onChange={handleChange}
                      required
                      value={values.enggyear}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      helperText="Please specify Engineering Qualifying Exam Score"
                      label="Engineering Qualifying Exam Score"
                      name="enggqualifyingscore"
                      onChange={handleChange}
                      required
                      value={values.enggqualifyingscore}
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

  export default PastAcademicData;