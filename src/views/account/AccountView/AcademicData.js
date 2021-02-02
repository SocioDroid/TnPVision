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

  const AcademicData =({userData}) => {

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
            "college": userData.college,
            "branch": userData.branch,
            "yearofstudy": userData.yearofstudy,
            "prn": userData.prn,
            "sem1sgpa": userData.sem1sgpa,
            "sem1percentage": userData.sem1percentage,
            "sem2sgpa":userData.sem2sgpa,
            "sem2percentage": userData.sem2percentage,
            "sem3sgpa": userData.sem3sgpa,
            "sem3percentage": userData.sem3percentage,
            "sem4sgpa": userData.sem4sgpa,
            "sem4percentage": userData.sem4percentage,
            "sem5sgpa": userData.sem5sgpa,
            "sem5percentage": userData.sem5percentage,
            "enggaggregateper": userData.enggaggregateper,
            "enggaggregatesgpa": userData.enggaggregatesgpa,
            "live": userData.live,
            "dead": userData.dead,
            "gaps": userData.gaps,
            "yd": userData.yd,
        })
      }
    },[userData])

      return(
          <div>
              <form onSubmit={handleSubmit} autoComplete="off" noValidate>
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
                        helperText="Please specify your college"
                        label="College"
                        name="college"
                        onChange={handleChange}
                        required
                        value={values.college}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify your branch"
                        label="Branch"
                        name="branch"
                        onChange={handleChange}
                        required
                        value={values.branch}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify your year of study"
                        label="Year of Study"
                        name="yearofstudy"
                        onChange={handleChange}
                        required
                        value={values.yearofstudy}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify your permanent registration number"
                        label="PRN"
                        name="prn"
                        onChange={handleChange}
                        required
                        value={values.prn}
                        variant="outlined"
                      />
                    </Grid>      
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify Semester 1 SGPA"
                        label="Sem 1 SGPA"
                        name="sem1sgpa"
                        onChange={handleChange}
                        required
                        value={values.sem1sgpa}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify Semester 1 Percentage"
                        label="Sem 1 Percentage"
                        name="sem1percentage"
                        onChange={handleChange}
                        required
                        value={values.sem1percentage}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify Semester 2 SGPA"
                        label="Sem 2 SGPA"
                        name="sem2sgpa"
                        onChange={handleChange}
                        required
                        value={values.sem2sgpa}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify Semester 2 Percentage"
                        label="Sem 2 Percentage"
                        name="sem2percentage"
                        onChange={handleChange}
                        required
                        value={values.sem2percentage}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify Semester 3 SGPA"
                        label="Sem 3 SGPA"
                        name="sem3sgpa"
                        onChange={handleChange}
                        required
                        value={values.sem3sgpa}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify Semester 3 Percentage"
                        label="Sem 3 Percentage"
                        name="sem3percentage"
                        onChange={handleChange}
                        required
                        value={values.sem3percentage}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify Semester 4 SGPA"
                        label="Sem 4 SGPA"
                        name="sem4sgpa"
                        onChange={handleChange}
                        required
                        value={values.sem4sgpa}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify Semester 4 Percentage"
                        label="Sem 4 Percentage"
                        name="sem4percentage"
                        onChange={handleChange}
                        required
                        value={values.sem4percentage}
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
                        helperText="Please specify Semester 5 SGPA"
                        label="Sem 5 SGPA"
                        name="sem5sgpa"
                        onChange={handleChange}
                        required
                        value={values.sem5sgpa}
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
                        helperText="Please specify Semester 5 Percentage"
                        label="Sem 5 Percentage"
                        name="sem5percentage"
                        onChange={handleChange}
                        required
                        value={values.sem5percentage}
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
                        helperText="Please specify Engineering Aggregate SGPA"
                        label="Engineering Aggregate SGPA"
                        name="enggaggregatesgpa"
                        onChange={handleChange}
                        required
                        value={values.enggaggregatesgpa}
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
                        helperText="Please Engineering Aggregate Percentage"
                        label="Engineering Aggregate Percentage"
                        name="enggaggregateper"
                        onChange={handleChange}
                        required
                        value={values.enggaggregateper}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify Live Backlogs"
                        label="Live Backlogs"
                        name="live"
                        onChange={handleChange}
                        required
                        value={values.live}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify Dead Backlogs"
                        label="Dead Backlogs"
                        name="dead"
                        onChange={handleChange}
                        required
                        value={values.dead}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify the first name"
                        label="Educational Gaps"
                        name="gaps"
                        onChange={handleChange}
                        required
                        value={values.gaps}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify Year Downs"
                        label="Year down"
                        name="yd"
                        onChange={handleChange}
                        required
                        value={values.yd}
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

  export default AcademicData;