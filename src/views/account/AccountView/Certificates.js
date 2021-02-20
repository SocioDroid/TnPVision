import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Typography } from '@material-ui/core';
import { useForm } from '../../../components/useForm';
import axios from 'axios';
import Auth from '../../../auth';

const initialFValues = {
        "name": "",
        "issuedBy": "",
        "issuedDate": "",
        "description": ""
}

const Certificates = ({ userData }) => {

    const [values, setValues] = useState({
            "name": "",
            "issuedBy": "",
            "issuedDate": "",
            "description": ""
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
            const certificate = [{
                "name": values.name,
                "issuedBy": values.issuedBy,
                "issuedDate": values.issuedDate,
                "description": values.description,
            }]

            axios.put(`http://20.37.50.140:8000/api/student/${userData.id}/certificate/`, certificate, {
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
                  <CardHeader
                    subheader="The information can be edited"
                    title="Student Profile"
                  />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>  
                      <Grid item md={12} xs={12}>
                        <Typography> Certificate </Typography> 
                        <Divider style={{marginTop: "5px"}}/>               
                      </Grid>         
                      <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Certificate Name"
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
                          label="Certificate IssuedBy"
                          name="issuedBy"
                          onChange={handleChange}
                          required
                          value={values.issuedBy}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          label="Certificate IssuedDate"
                          name="issuedDate"
                          onChange={handleChange}
                          required
                          value={values.issuedDate}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          label="Certificate Description"
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


export default Certificates;
