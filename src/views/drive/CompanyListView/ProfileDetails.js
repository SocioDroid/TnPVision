import React, { useState, useEffect } from 'react';
import { useForm } from '../../../components/useForm';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import CompanyService from '../../../services/CompanyService';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';

const initialFValues = {
  id: 0,
  name: "",
  website: "",
  industry: "",
}

export default function ProfileDetails(props) {
  
  const [values, setValues] = useState({
    id: 0,
    name: "",
    website: "",
    industry: "",
  });

  const { addOrEdit, recordForEdit } = props
  
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    setErrors({
      ...temp
    })

    if (fieldValues === values)
      return Object.values(temp).every(x => x === "")
  }

  const {
    errors,
    setErrors,
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
        //"id": values.id,
        "name": values.name,
        "website": values.website,
        "industry": values.industry
      }

      addOrEdit(values, resetForm);
      CompanyService.editSingleCompany(values,data);
      // axios.patch("https://tnpvision-cors.herokuapp.com/http://20.37.50.140:8000/api/company/" + values.id+"/", data)
      //   .then(res =>{
      //     console.log("res", res);
      //   }).catch(error => {
      //     console.log(error);     
      //   });
    }
  }

  
  useEffect(() => {

    if (recordForEdit != null) {
      setValues({
        ...values,
        'id': recordForEdit.id,
        'name':recordForEdit.name,
        'website':recordForEdit.website,
        'industry':recordForEdit.industry,
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
          title="Company Profile"
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
              <Typography variant="h6">Company ID: {values.id}</Typography>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the name"
                label="Name"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
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
                label="Website"
                name="website"
                onChange={handleChange}
                required
                value={values.website}
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
                label="Industry"
                name="industry"
                onChange={handleChange}
                required
                value={values.industry}
                variant="outlined"
              />
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
