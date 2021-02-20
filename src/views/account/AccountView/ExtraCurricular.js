import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Typography } from '@material-ui/core';
import { useForm } from '../../../components/useForm';
import axios from 'axios';
import Auth from '../../../auth';

const initialFValues = {
    "name" : "",
    "date" : "",
    "description" : "",
}

const ExtraCurricular = ({ userData }) => {

    const [values, setValues] = useState({
        "name" : "",
        "date" : "",
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
            const curricular = [{
                "name" : values.name,
                "date" : values.date,
                "description" : values.description
            }]

            axios.put(`http://20.37.50.140:8000/api/student/${userData.id}/curricular/`, curricular, {
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
                        <Typography> ExtraCurricular </Typography> 
                        <Divider style={{marginTop: "5px"}}/>               
                      </Grid>         
                      <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          type="text"
                          label="ExtraCurricular Name"
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
                          label="ExtraCurricular date"
                          name="date"
                          onChange={handleChange}
                          required
                          value={values.date}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          label="ExtraCurricular Description"
                          name="description"
                          onChange={handleChange}
                          required
                          value={values.Description}
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


export default ExtraCurricular;
