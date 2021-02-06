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
  tenthPercentage: 0.0,
  tenthBoardOfExamination: "",
  tenthYearOfPassing: 0,
  twelthPercentage: 0,
  twelfthBoardOfExamination: "",
  twelfthYearOfPassing: 0,
  isDiploma: false,
  diplomaPercentage: 0.0,
  diplomaBoardOfExamination: "",
  diplomaYearOfPassing: 0,
  EnggQualifyingExamYear: 0,
  EnggQualifyingExamScore: 0.0,
  fatherOccupation: "",
  motherOccupation: "",
  parentsEmail: "",
  parentsMobileNumber: 0,
  createdAt: "",
  updatedAt: "",
  isDeleted: false,
  isVolunteer: true,
  isProfileComplete: true,
}

const PastAcademicData = ({ userData }) => {

  const [values, setValues] = useState({
    tenthPercentage: 0.0,
    tenthBoardOfExamination: "",
    tenthYearOfPassing: 0,
    twelthPercentage: 0,
    twelfthBoardOfExamination: "",
    twelfthYearOfPassing: 0,
    isDiploma: false,
    diplomaPercentage: 0.0,
    diplomaBoardOfExamination: "",
    diplomaYearOfPassing: 0,
    EnggQualifyingExamYear: 0,
    EnggQualifyingExamScore: 0.0,
    fatherOccupation: "",
    motherOccupation: "",
    parentsEmail: "",
    parentsMobileNumber: 0,
    createdAt: "",
    updatedAt: "",
    isDeleted: false,
    isVolunteer: true,
    isProfileComplete: true,
  });

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('email' in fieldValues)
      temp.email = (/$^|.+@.+..+/).test(fieldValues.parentsEmail) ? "" : "Email is not valid."
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

  const handleSubmit = e => {
    console.log(values);
    e.preventDefault()
    console.log("e", e);

    if (validate()) {
      const pastAcadData = {
        "tenthPercentage": values.tenthPercentage,
        "tenthBoardOfExamination": values.tenthBoardOfExamination,
        "tenthYearOfPassing": values.tenthYearOfPassing,
        "twelthPercentage": values.twelthPercentage,
        "twelfthBoardOfExamination": values.twelfthBoardOfExamination,
        "twelfthYearOfPassing": values.twelfthYearOfPassing,
        "isDiploma": values.isDiploma,
        "diplomaPercentage": values.diplomaPercentage,
        "diplomaBoardOfExamination": values.diplomaBoardOfExamination,
        "diplomaYearOfPassing": values.diplomaYearOfPassing,
        "EnggQualifyingExamYear": values.EnggQualifyingExamYear,
        "EnggQualifyingExamScore": values.EnggQualifyingExamScore,
        "fatherOccupation": values.fatherOccupation,
        "motherOccupation": values.motherOccupation,
        "parentsEmail": values.parentsEmail,
        "parentsMobileNumber": values.parentsMobileNumber,
        "isDeleted": values.isDeleted,
        "isVolunteer": values.isVolunteer,
        "isProfileComplete": values.isProfileComplete,
      }
      axios.patch("http://20.37.50.140:8000/api/student/" + values.id, pastAcadData)
        .then(res => {
          console.log("res", res);
        }).catch(error => {
          console.log(error);
        });

      setTimeout(window.location.reload(false), 40000);
    }
  }

  useEffect(() => {
    if (userData != null) {
      setValues({
        ...values,
        "tenthPercentage": userData.tenthPercentage,
        "tenthBoardOfExamination": userData.tenthBoardOfExamination,
        "tenthYearOfPassing": userData.tenthYearOfPassing,
        "twelthPercentage": userData.twelthPercentage,
        "twelfthBoardOfExamination": userData.twelfthBoardOfExamination,
        "twelfthYearOfPassing": userData.twelfthYearOfPassing,
        "isDiploma": userData.isDiploma,
        "diplomaPercentage": userData.diplomaPercentage,
        "diplomaBoardOfExamination": userData.diplomaBoardOfExamination,
        "diplomaYearOfPassing": userData.diplomaYearOfPassing,
        "EnggQualifyingExamYear": userData.EnggQualifyingExamYear,
        "EnggQualifyingExamScore": userData.EnggQualifyingExamScore,
        "fatherOccupation": userData.fatherOccupation,
        "motherOccupation": userData.motherOccupation,
        "parentsEmail": userData.parentsEmail,
        "parentsMobileNumber": userData.parentsMobileNumber,
        "isDeleted": userData.isDeleted,
        "isVolunteer": userData.isVolunteer,
        "isProfileComplete": userData.isProfileComplete,
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
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Tenth Percentage"
                  name="tenthPercentage"
                  onChange={handleChange}
                  required
                  value={values.tenthPercentage}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Tenth Board of Examination"
                  name="tenthBoardOfExamination"
                  onChange={handleChange}
                  required
                  value={values.tenthBoardOfExamination}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Tenth year of Passing"
                  name="tenthYearOfPassing"
                  onChange={handleChange}
                  required
                  value={values.tenthYearOfPassing}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Twelfth Percentage"
                  name="twelthPercentage"
                  onChange={handleChange}
                  required
                  value={values.twelthPercentage}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Twelfth Board of Examination"
                  name="twelfthBoardOfExamination"
                  onChange={handleChange}
                  required
                  value={values.twelfthBoardOfExamination}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Twelfth year of Passing"
                  name="twelfthYearOfPassing"
                  onChange={handleChange}
                  required
                  value={values.twelfthYearOfPassing}
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
                  label="Diploma Percentage"
                  name="diplomaPercentage"
                  onChange={handleChange}
                  required
                  value={values.diplomaPercentage}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Diploma Board of Examination"
                  name="diplomaBoardOfExamination"
                  onChange={handleChange}
                  required
                  value={values.diplomaBoardOfExamination}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Diploma year of Passing"
                  name="diplomaYearOfPassing"
                  onChange={handleChange}
                  required
                  value={values.diplomaYearOfPassing}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Engineering Qualifying Exam Year"
                  name="EnggQualifyingExamYear"
                  onChange={handleChange}
                  required
                  value={values.EnggQualifyingExamYear}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Engineering Qualifying Exam Score"
                  name="EnggQualifyingExamScore"
                  onChange={handleChange}
                  required
                  value={values.EnggQualifyingExamScore}
                  variant="outlined"
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
            <Divider style={{marginTop:10}} />
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