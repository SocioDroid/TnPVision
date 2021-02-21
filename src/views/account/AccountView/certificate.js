import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui';
import { Autocomplete } from 'formik-material-ui-lab';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, Typography, Avatar, makeStyles } from '@material-ui/core';
import { useForm } from '../../../components/useForm';
import axios from 'axios';
import Auth from '../../../auth';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
    divider: {
        margin: '10px'
    }
}));

const Certificates = ({ userData }) => {
    const classes = useStyles();
    const [certificateData, setCertificateData] = useState([])

    useEffect(() => {
        axios.get(`http://20.37.50.140:8000/api/student/${userData.id}/certificate/`)
        .then(res=>{
            console.log("cert data",res);
            setCertificateData(res.data)
        })
        .catch(error =>{
            console.log(error);
            
        })
    }, [])

console.log("after cert data",certificateData);
    return (
        <div>
            {certificateData.map(data=>{
                <Typography
                color="textSecondary"
                gutterBottom
                variant="h6"
              >{data.name}</Typography>
            })}
        <Formik
            initialValues={{
                certificate: [{
                    name: "",
                    issuedBy: "",
                    issuedDate: "",
                    description: "",
                }]

            }}
            onSubmit={async values => {
                axios.put(`http://20.37.50.140:8000/api/student/${userData.id}/certificate/`, values.certificate, {
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
            }}
        >
            
                
            {({ values, errors }) => (
                <Form autoComplete="off">
                    <Box margin={1} paddingBottom={2}>
                        <FieldArray name="certificate">
                            {({ push, remove }) => (
                                <React.Fragment>
                                    {values.certificate.map((_, index) => (
                                        <div key={index}>
                                            <Grid container item spacing={3}>
                                                <Grid item md={5} xs={10}>
                                                    <Field
                                                        name={`certificate[${index}].name`}
                                                        component={TextField}
                                                        label="Certificate Name"
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item md={5} xs={10}>
                                                    <Field
                                                        name={`certificate[${index}].issuedBy`}
                                                        component={TextField}
                                                        label="Certificate IssuedBy"
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item md={5} xs={10}>
                                                    <Field
                                                        name={`certificate[${index}].issuedDate`}
                                                        component={TextField}
                                                        label="Certificate IssuedDate"
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item md={5} xs={10}>
                                                    <Field
                                                        name={`certificate[${index}].description`}
                                                        component={TextField}
                                                        label="Certificate Description"
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Fab
                                                        size="small"
                                                        color="secondary"
                                                        className={classes.delete}
                                                        aria-label="delete"
                                                        onClick={() => {
                                                            remove(index);
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </Fab>
                                                </Grid>
                                            </Grid>
                                            <Divider className={classes.divider} />
                                        </div>
                                    ))}

                                    <Grid container item spacing={3}>
                                        <Grid item>
                                            <br />
                                            <Button
                                                variant="contained"
                                                style={{ color: 'black' }}
                                                onClick={() =>
                                                    push({
                                                        name: '',
                                                        description: '',
                                                        issuedBy: '',
                                                        issuedDate: ''
                                                    })
                                                }
                                            >
                                                Add Certificate
                                </Button>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            )}
                        </FieldArray>
                    </Box>

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
                </Form>
            )} 
        </Formik>
        </div>
    )
}

export default Certificates;
