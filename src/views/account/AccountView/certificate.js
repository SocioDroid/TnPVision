import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui';
import { Autocomplete } from 'formik-material-ui-lab';
import { Box, Button, List, ListSubheader, ListItem, ListItemText, Divider, Grid, Typography, Avatar, makeStyles } from '@material-ui/core';
import { useForm } from '../../../components/useForm';
import axios from 'axios';
import Auth from '../../../auth';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
    divider: {
        margin: '10px'
    },
    typography: {
        marginLeft: 10
    },
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: "#f5f5f5",
        position: 'relative',
        overflow: 'auto',
        maxHeight: 160,
        marginBottom: 15
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    listItem: {
        paddingBottom: '0px',
        paddingTop: '0px'
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    add: {
        backgroundColor: 'primary',
    },
}));

const Certificates = ({ userData }) => {
    const classes = useStyles();
    const [certificateData, setCertificateData] = useState([])

    useEffect(() => {
        axios.get(`http://20.37.50.140:8000/api/student/certificate/`, {
            headers: {
                "Content-type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "Authorization": "Token " + Auth.getToken()
            }
        })
            .then(res => {
                console.log("cert data", res);
                setCertificateData(res.data)
            })
            .catch(error => {
                console.log(error);

            })
    }, [])

    console.log("after cert data", certificateData);
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                    <Typography variant="h4" className={classes.typography}> Certificates </Typography>
                    <Divider className={classes.divider} />
                </Grid>
            </Grid>
            <List className={classes.root} subheader={<li />}>
                {certificateData.map((data, index) => {
                    return (
                        <li key={`section-${index}`} className={classes.listSection}>
                            <ul className={classes.ul}>
                            <Grid container direction="row">
                                <Grid item md={10} xs={10}>
                                <ListSubheader style={{ fontSize: "18px" }}>{`Certificate Name: ${data.name}`}</ListSubheader>
                                </Grid>
                                <Grid item md={1} xs={1} style={{ textAlign:'end' ,alignSelf: 'flex-end'}}>
                                    <Fab size="small" color="secondary"
                                    >
                                    <EditIcon />
                                    </Fab >
                                </Grid>
                            </Grid>
                                <ListItem key={`${index}`} className={classes.listItem}>
                                    <ListItemText primary={`IssuedDate: ${data.issuedDate}`} />
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <ListItemText primary={`IssuedBy: ${data.issuedBy}`} />
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <ListItemText primary={`Description: ${data.description}`} />
                                </ListItem>
                                <Divider style={{ margin: 5 }} />
                            </ul>
                        </li>
                    )
                })}
            </List>
            <Formik
                initialValues={{
                    certificate: [{
                        index: 1,
                        name: "",
                        issuedBy: "",
                        issuedDate: "",
                        description: "",
                    }]

                }}
                onSubmit={async values => {
                    axios.put(`http://20.37.50.140:8000/api/student/certificate/`, [...certificateData, ...values.certificate], {
                        headers: {
                            "Content-type": "application/json",
                            "X-Requested-With": "XMLHttpRequest",
                            "Authorization": "Token " + Auth.getToken()
                        }
                    })
                        .then(res => {
                            console.log("res", res);
                            setCertificateData(res.data)
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
                                                            fullWidth
                                                            name={`certificate[${index}].name`}
                                                            component={TextField}
                                                            label="Certificate Name"
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item md={5} xs={10}>
                                                        <Field
                                                            fullWidth
                                                            name={`certificate[${index}].issuedBy`}
                                                            component={TextField}
                                                            label="Certificate IssuedBy"
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item md={5} xs={10}>
                                                        <Field
                                                            fullWidth
                                                            name={`certificate[${index}].issuedDate`}
                                                            component={TextField}
                                                            label="Certificate IssuedDate"
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item md={5} xs={10}>
                                                        <Field
                                                            fullWidth
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
                                                <Fab
                                                    size="small"
                                                    color="secondary"
                                                    className={classes.add}
                                                    aria-label="add"
                                                    onClick={() =>
                                                        push({
                                                            index: values.certificate.length + 1,
                                                            name: '',
                                                            description: '',
                                                            issuedBy: '',
                                                            issuedDate: ''
                                                        })
                                                    }
                                                >
                                                    <AddCircleOutlineIcon />
                                                </Fab>
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
