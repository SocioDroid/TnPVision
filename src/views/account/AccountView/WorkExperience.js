import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, TextField, Typography } from '@material-ui/core';
import { useForm } from '../../../components/useForm';
import axios from 'axios';
import Auth from '../../../auth';

const initialFValues = {

    "position" : "",
    "companyName" : "", 
    "startDate" : "", 
    "endDate" : "",
    "description" : "",
}

const WorkExperience = ({ userData }) => {

    const [values, setValues] = useState({
        "position" : "",
        "companyName" : "", 
        "startDate" : "", 
        "endDate" : "",
        "description" : "",
    });

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
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
            const experience = [{
                "position" : values.position,
                "companyName" : values.companyName, 
                "startDate" : values.startDate, 
                "endDate" : values.endDate,
                "description" : values.description,
            }]

            axios.put(`http://20.37.50.140:8000/api/student/${userData.id}/experience/`, experience, {
                headers: {
                    "Content-type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization": "Token " + Auth.getToken()
                }
            })
            .then(res => {
                console.log("res", res);
            }).catch(error => {
                console.log(error);
            });
        }
    }

    return (
            <div>
              <form
                onSubmit={handleSubmit}
                autoComplete="off"
                noValidate
              >
                <Card>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>  
                      <Grid item md={12} xs={12}>
                        <Typography> Work Experience </Typography> 
                        <Divider style={{marginTop: "5px"}}/>               
                      </Grid>         
                      <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Position"
                          name="position"
                          onChange={handleChange}
                          required
                          value={values.position}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          label="Company Name"
                          name="companyName"
                          onChange={handleChange}
                          required
                          value={values.companyName}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          label="Start Date"
                          name="startDate"
                          onChange={handleChange}
                          required
                          value={values.startDate}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          label="End Date"
                          name="endDate"
                          onChange={handleChange}
                          required
                          value={values.endDate}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          label="Description"
                          name="description"
                          onChange={handleChange}
                          required
                          value={values.description}
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


export default WorkExperience;
