import React, { useState, useEffect } from 'react';
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


const initialFValues = {
  collegeName: "",
  branch: "",
  prn: "",
  sem1SGPA: 0,
  sem1Percentage: 0.0,
  sem2SGPA: 0,
  sem2Percentage: 0.0,
  sem3SGPA: 0,
  sem3Percentage: 0.0,
  sem4SGPA: 0,
  sem4Percentage: 0.0,
  sem5SGPA: 0,
  sem5Percentage: 0.0,
  enggAggCGPA: 0,
  enggAggPercentage: 0.0,
  liveBacklogs: 0,
  deadBacklogs: 0,
  educationalGap: 0,
  yearDown: 0,

}

const AcademicData = ({ userData }) => {

  const [values, setValues] = useState({
    collegeName: "",
    branch: "",
    prn: "",
    sem1SGPA: 0,
    sem1Percentage: 0.0,
    sem2SGPA: 0,
    sem2Percentage: 0.0,
    sem3SGPA: 0,
    sem3Percentage: 0.0,
    sem4SGPA: 0,
    sem4Percentage: 0.0,
    sem5SGPA: 0,
    sem5Percentage: 0.0,
    enggAggCGPA: 0,
    enggAggPercentage: 0.0,
    liveBacklogs: 0,
    deadBacklogs: 0,
    educationalGap: 0,
    yearDown: 0,
  });

  // const validate = (fieldValues = values) => {
  //   let temp = { ...errors }
  //   if ('first_name' in fieldValues)
  //     temp.first_name = fieldValues.first_name ? "" : "This field is required."
  //   if ('last_name' in fieldValues)
  //     temp.last_name = fieldValues.last_name ? "" : "This field is required."
  //   if ('email' in fieldValues)
  //     temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
  //   setErrors({
  //     ...temp
  //   })
  //   if (fieldValues === values)
  //     return Object.values(temp).every(x => x === "")
  // }

  // const {
  //   errors,
  //   setErrors,
  // } = useForm(initialFValues, true, validate);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = e => {
    console.log(values);
    e.preventDefault()
    console.log("e", e);

      const acadData = {
        "collegeName": values.collegeName,
        "branch": values.branch,
        "prn": values.prn,
        "sem1SGPA": values.sem1SGPA,
        "sem1Percentage": values.sem1Percentage,
        "sem2SGPA": values.sem2SGPA,
        "sem2Percentage": values.sem2Percentage,
        "sem3SGPA": values.sem3SGPA,
        "sem3Percentage": values.sem3Percentage,
        "sem4SGPA": values.sem4SGPA,
        "sem4Percentage": values.sem4Percentage,
        "sem5SGPA": values.sem5SGPA,
        "sem5Percentage": values.sem5Percentage,
        "enggAggCGPA": values.enggAggCGPA,
        "enggAggPercentage": values.enggAggPercentage,
        "liveBacklogs": values.liveBacklogs,
        "deadBacklogs": values.deadBacklogs,
        "educationalGap": values.educationalGap,
        "yearDown": values.yearDown,
      }
      axios.patch("http://20.37.50.140:8000/api/student/" + values.id, acadData)
        .then(res => {
          console.log("res", res);
        }).catch(error => {
          console.log(error);
        });

      setTimeout(window.location.reload(false), 40000);
  }

  useEffect(() => {
    if (userData != null) {
      setValues({
        ...values,
        "collegeName": userData.collegeName,
        "branch": userData.branch,
        "prn": userData.prn,
        "sem1SGPA": userData.sem1SGPA,
        "sem1Percentage": userData.sem1Percentage,
        "sem2SGPA": userData.sem2SGPA,
        "sem2Percentage": userData.sem2Percentage,
        "sem3SGPA": userData.sem3SGPA,
        "sem3Percentage": userData.sem3Percentage,
        "sem4SGPA": userData.sem4SGPA,
        "sem4Percentage": userData.sem4Percentage,
        "sem5SGPA": userData.sem5SGPA,
        "sem5Percentage": userData.sem5Percentage,
        "enggAggCGPA": userData.enggAggCGPA,
        "enggAggPercentage": userData.enggAggPercentage,
        "liveBacklogs": userData.liveBacklogs,
        "deadBacklogs": userData.deadBacklogs,
        "educationalGap": userData.educationalGap,
        "yearDown": userData.yearDown,
      })
    }
  }, [userData])

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off" noValidate>
        <Card>
          <CardHeader
            subheader="The information can be edited"
            title="Student Profile"
          />
          <Divider />
          <CardContent>
            <br />
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="College"
                  name="collegeName"
                  onChange={handleChange}
                  required
                  value={values.collegeName}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
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
                  label="Sem 1 SGPA"
                  name="sem1SGPA"
                  onChange={handleChange}
                  required
                  value={values.sem1SGPA}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Sem 1 Percentage"
                  name="sem1Percentage"
                  onChange={handleChange}
                  required
                  value={values.sem1Percentage}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Sem 2 SGPA"
                  name="sem2SGPA"
                  onChange={handleChange}
                  required
                  value={values.sem2SGPA}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Sem 2 Percentage"
                  name="sem2Percentage"
                  onChange={handleChange}
                  required
                  value={values.sem2Percentage}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Sem 3 SGPA"
                  name="sem3SGPA"
                  onChange={handleChange}
                  required
                  value={values.sem3SGPA}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Sem 3 Percentage"
                  name="sem3Percentage"
                  onChange={handleChange}
                  required
                  value={values.sem3Percentage}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Sem 4 SGPA"
                  name="sem4SGPA"
                  onChange={handleChange}
                  required
                  value={values.sem4SGPA}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Sem 4 Percentage"
                  name="sem4Percentage"
                  onChange={handleChange}
                  required
                  value={values.sem4Percentage}
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
                  label="Sem 5 SGPA"
                  name="sem5SGPA"
                  onChange={handleChange}
                  required
                  value={values.sem5SGPA}
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
                  label="Sem 5 Percentage"
                  name="sem5Percentage"
                  onChange={handleChange}
                  required
                  value={values.sem5Percentage}
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
                  label="Engineering Aggregate SGPA"
                  name="enggAggSGPA"
                  onChange={handleChange}
                  required
                  value={values.enggAggSGPA}
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
                  label="Engineering Aggregate Percentage"
                  name="enggAggPercentage"
                  onChange={handleChange}
                  required
                  value={values.enggAggPercentage}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Live Backlogs"
                  name="liveBacklogs"
                  onChange={handleChange}
                  required
                  value={values.liveBacklogs}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Dead Backlogs"
                  name="deadBacklogs"
                  onChange={handleChange}
                  required
                  value={values.deadBacklogs}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Educational Gaps"
                  name="educationalGap"
                  onChange={handleChange}
                  required
                  value={values.educationalGap}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Year down"
                  name="yearDown"
                  onChange={handleChange}
                  required
                  value={values.yearDown}
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

export default AcademicData;