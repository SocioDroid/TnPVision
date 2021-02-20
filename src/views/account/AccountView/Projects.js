import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, TextField, Typography } from '@material-ui/core';
import { useForm } from '../../../components/useForm';
import axios from 'axios';
import Auth from '../../../auth';

const initialFValues = {
    "name" : "",
    "startDate" : "",
    "endDate" : "",
    "url" : "",
    "description" : "",
    "groupCount" : ""
}

const Projects = ({ userData }) => {

    const [values, setValues] = useState({
        "name" : "",
        "startDate" : "",
        "endDate" : "",
        "url" : "",
        "description" : "",
        "groupCount" : ""
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
            const project = [{
                "name" : values.name,
                "startDate" : values.startDate,
                "endDate" : values.endDate,
                "url" : values.url,
                "description" : values.description,
                "groupCount" : values.groupCount
            }]

            axios.put(`http://20.37.50.140:8000/api/student/${userData.id}/project/`, project, {
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
                        <Typography> Projects </Typography> 
                        <Divider style={{marginTop: "5px"}}/>               
                      </Grid>         
                      <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Project Name"
                          name="name"
                          onChange={handleChange}
                          required
                          value={values.name}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Project Start Date"
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
                          type="text"
                          label="Project End Date"
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
                          type="text"
                          label="Project URL"
                          name="url"
                          onChange={handleChange}
                          required
                          value={values.url}
                          variant="outlined"
                        />
                      </Grid><Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Project Group Count"
                          name="groupCount"
                          onChange={handleChange}
                          required
                          value={values.groupCount}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Project Description"
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


export default Projects;
