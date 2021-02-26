import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Typography} from '@material-ui/core';
import { useForm } from '../../../components/controls/useForm';
import StudentService from '../../../services/StudentService';

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
        "studentProfile": {
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
        
        "isDeleted": values.isDeleted,
        "isVolunteer": values.isVolunteer,
        "isProfileComplete": values.isProfileComplete,
      }
    }
    StudentService.updateStudent(pastAcadData)
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
      setValues({
        ...values,
        "tenthPercentage": userData && userData.tenthPercentage ? userData.tenthPercentage :"",
        "tenthBoardOfExamination": userData && userData.tenthBoardOfExamination ? userData.tenthBoardOfExamination: "",
        "tenthYearOfPassing": userData && userData.tenthYearOfPassing ? userData.tenthYearOfPassing: "",
        "twelthPercentage": userData && userData.twelthPercentage ? userData.twelthPercentage : "",
        "twelfthBoardOfExamination": userData && userData.twelfthBoardOfExamination ? userData.twelfthBoardOfExamination: "",
        "twelfthYearOfPassing": userData && userData.twelfthYearOfPassing ? userData.twelfthYearOfPassing : "",
        "isDiploma": userData && userData.isDiploma ? userData.isDiploma: "",
        "diplomaPercentage": userData && userData.diplomaPercentage ? userData.diplomaPercentage: "",
        "diplomaBoardOfExamination": userData && userData.diplomaBoardOfExamination ? userData.diplomaBoardOfExamination: "",
        "diplomaYearOfPassing": userData && userData.diplomaYearOfPassing ? userData.diplomaYearOfPassing: "",
        "EnggQualifyingExamYear": userData && userData.EnggQualifyingExamYear ? userData.EnggQualifyingExamYear: "",
        "EnggQualifyingExamScore": userData && userData.EnggQualifyingExamScore ? userData.EnggQualifyingExamScore: "",
        "isDeleted": userData && userData.isDeleted ? userData.isDeleted: "",
        "isVolunteer": userData && userData.isVolunteer ? userData.isVolunteer: "",
        "isProfileComplete": userData && userData.isProfileComplete ? userData.isProfileComplete: "",
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
            
            <Grid container spacing={3}>  
              <Grid item md={12} xs={12}>
                <Typography> Tenth </Typography> 
                <Divider style={{marginTop: "5px"}}/>               
              </Grid>         
              <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Percentage"
                  name="tenthPercentage"
                  onChange={handleChange}
                  required
                  value={values.tenthPercentage}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  label="Examination Board"
                  name="tenthBoardOfExamination"
                  onChange={handleChange}
                  required
                  value={values.tenthBoardOfExamination}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  label="Year of Passing"
                  name="tenthYearOfPassing"
                  onChange={handleChange}
                  required
                  value={values.tenthYearOfPassing}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Typography> Twelth </Typography> 
                <Divider style={{marginTop: "5px"}}/>               
              </Grid> 
              <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Percentage"
                  name="twelthPercentage"
                  onChange={handleChange}
                  required
                  value={values.twelthPercentage}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  label="Examination Board"
                  name="twelfthBoardOfExamination"
                  onChange={handleChange}
                  required
                  value={values.twelfthBoardOfExamination}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  label="Year of Passing"
                  name="twelfthYearOfPassing"
                  onChange={handleChange}
                  required
                  value={values.twelfthYearOfPassing}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Typography> Diploma </Typography> 
                <Divider style={{marginTop: "5px"}}/>               
              </Grid> 
              <Grid
                item
                md={4}
                xs={12}
              >
                <TextField
                  fullWidth
                  type="number"
                  label="Percentage"
                  name="diplomaPercentage"
                  onChange={handleChange}
                  required
                  value={values.diplomaPercentage}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  label="Examination Board"
                  name="diplomaBoardOfExamination"
                  onChange={handleChange}
                  required
                  value={values.diplomaBoardOfExamination}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  label="Year of Passing"
                  name="diplomaYearOfPassing"
                  onChange={handleChange}
                  required
                  value={values.diplomaYearOfPassing}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Typography> Engineering </Typography> 
                <Divider style={{marginTop: "5px"}}/>               
              </Grid> 
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Qualifying Exam Year"
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
                  label="Qualifying Exam Score"
                  name="EnggQualifyingExamScore"
                  onChange={handleChange}
                  required
                  value={values.EnggQualifyingExamScore}
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