import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui';
import { Box, Button, List, ListSubheader, ListItem, ListItemText, Divider, Grid, Typography, makeStyles } from '@material-ui/core';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import axios from 'axios';
import Auth from '../../../auth';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import { KeyboardDatePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import StudentService from '../../../services/StudentService';

const useStyles = makeStyles(theme => ({
    divider: {
        margin: '10px'
    },
    typography: {
        marginLeft: 10
    },
    root: {
        width: '100%',
        backgroundColor: "#f5f5f5",
        position: 'relative',
        overflow: 'auto',
        maxHeight: 220,
        marginBottom: 20
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

const Workexperience = () => {
    const classes = useStyles();
    const [experienceData, setExperienceData] = useState([])
    const [open, setOpen] = useState(false);
    const [popupData, setPopupData] = useState({})
    const [selectedStartDate, handleStartDateChange] = useState([]);
    const [selectedEndDate, handleEndDateChange] = useState([]);
    const [selectedPopUpStartDate, handlePopUpStartDateChange] = useState(new Date("2018-03-02"));
    const [selectedPopUpEndDate, handlePopUpEndDateChange] = useState(new Date("2018-03-02"));

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        StudentService.getExperience()
            .then(res => {
                console.log("setExperienceData data", res);
                setExperienceData(res.data)
            })
            .catch(error => {
                console.log(error);

            })
    }, [])

    const handleChange = (e) => {
        setPopupData({
            ...popupData,
            [e.target.name]: e.target.value
        });

    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                    <Typography variant="h4" className={classes.typography}> Work experience </Typography>
                    <Divider className={classes.divider} />
                </Grid>
            </Grid>
            <List className={classes.root} subheader={<li />}>
                {experienceData.map((data, index) => {
                    return (
                        <li key={`section-${index}`} className={classes.listSection}>
                            <ul className={classes.ul}>
                                <Grid container direction="row">
                                    <Grid item md={10} xs={10}>
                                        <ListSubheader style={{ fontSize: "18px" }}>{`Company Name: ${data.companyName}`}</ListSubheader>
                                    </Grid>
                                    <Grid item md={1} xs={1} style={{ textAlign: 'end', alignSelf: 'flex-end' }}>
                                        <Fab size="small" color="secondary"
                                            onClick={() => {
                                                setOpen(true);
                                                setPopupData({ ...data, index: index })
                                            }}
                                        >
                                            <EditIcon />
                                        </Fab >
                                    </Grid>
                                </Grid>
                                <ListItem key={`${index}`} className={classes.listItem}>
                                    <ListItemText primary={`Position: ${data.position}`} />
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <ListItemText primary={`Start Date: ${data.startDate} End Date: ${data.endDate}`} />
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
                    experience: [{
                        index: 1,
                        companyName: "",
                        position: "",
                        startDate: "",
                        endDate: "",
                        description: "",
                    }]

                }}
                onSubmit={async values => {
                    values.experience.map((_, index) => (
                        values.experience[index].startDate = new Date(selectedStartDate[index]).toISOString().split('T')[0]
                    ))
                    values.experience.map((_, index) => (
                        values.experience[index].endDate = new Date(selectedEndDate[index]).toISOString().split('T')[0]
                    ))

                    StudentService.updateExperience([...experienceData, ...values.experience])
                        .then(res => {
                            console.log("res", res);
                            setExperienceData(res.data)
                        }).catch(error => {
                            console.log(error);
                        });
                }}
            >
                {({ values, errors }) => (
                    <Form autoComplete="off">
                        <Box margin={1} paddingBottom={2}>
                            <FieldArray name="experience">
                                {({ push, remove }) => (
                                    <React.Fragment>
                                        {values.experience.map((_, index) => (
                                            <div key={index}>
                                                <Grid container item spacing={3}>
                                                    <Grid item md={5} xs={10}>
                                                        <Field
                                                            fullWidth
                                                            name={`experience[${index}].companyName`}
                                                            component={TextField}
                                                            label="Company Name"
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item md={5} xs={10}>
                                                        <Field
                                                            fullWidth
                                                            name={`experience[${index}].position`}
                                                            component={TextField}
                                                            label="Position"
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item md={5} xs={10}>
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <Field
                                                                variant="outlined"
                                                                component={KeyboardDatePicker}
                                                                name={`experience[${index}].startDate`}
                                                                value={selectedStartDate[index]}
                                                                onChange=
                                                                {(event, newValue) => {
                                                                    let tech = [...selectedStartDate];
                                                                    tech[index] = newValue;
                                                                    handleStartDateChange([...tech]);
                                                                    console.log("date", selectedStartDate);

                                                                }}
                                                                label="Start Date"
                                                                format="yyyy-MM-dd"
                                                                fullWidth
                                                            />
                                                        </MuiPickersUtilsProvider>
                                                    </Grid>
                                                    <Grid item md={5} xs={10}>
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <Field
                                                                variant="outlined"
                                                                component={KeyboardDatePicker}
                                                                name={`experience[${index}].endDate`}
                                                                value={selectedEndDate[index]}
                                                                onChange=
                                                                {(event, newValue) => {
                                                                    let tech = [...selectedEndDate];
                                                                    tech[index] = newValue;
                                                                    handleEndDateChange([...tech]);
                                                                    console.log("date", selectedEndDate);

                                                                }}
                                                                label="End Date"
                                                                format="yyyy-MM-dd"
                                                                fullWidth
                                                            />
                                                        </MuiPickersUtilsProvider>
                                                    </Grid>
                                                    <Grid item md={5} xs={10}>
                                                        <Field
                                                            component={TextField}
                                                            fullWidth
                                                            name={`experience[${index}].description`}
                                                            label="Description"
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
                                                            index: values.experience.length + 1,
                                                            compnayName: '',
                                                            position: "",
                                                            startDate: "",
                                                            endDate: "",
                                                            description: "",
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


            <Formik
                initialValues={{
                    index: 0,
                    companyName: popupData.companyName,
                    position: popupData.position,
                    startDate: popupData.startDate,
                    endDate: popupData.endDate,
                    description: popupData.description,
                }}

                onSubmit={async values => {
                    { popupData.startDate = new Date(selectedPopUpStartDate).toISOString().split('T')[0] }
                    { popupData.endDate = new Date(selectedPopUpEndDate).toISOString().split('T')[0] }

                    StudentService.updateIndividualExperience(popupData)
                        .then(res => {
                            console.log("res", res);
                            setExperienceData(res.data)
                            setOpen(false);
                        }).catch(error => {
                            console.log(error);
                        });
                }}
            >

                {({ values, errors }) => (

                    <Form autoComplete="off">
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">experience</DialogTitle>
                            <Divider className={classes.divider} />
                            <DialogContent>
                                <form
                                    autoComplete="off"
                                    noValidate
                                >
                                    <Grid container spacing={3}>
                                        <Grid item md={6} xs={12}>
                                            <Field
                                                fullWidth
                                                variant="outlined"
                                                component={TextField}
                                                name="companyName"
                                                label="Company Name"
                                                value={popupData.companyName}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <Field
                                                fullWidth
                                                variant="outlined"
                                                component={TextField}
                                                name="position"
                                                label="Position"
                                                value={popupData.position}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Field
                                                    variant="outlined"
                                                    component={KeyboardDatePicker}
                                                    name="startDate"
                                                    value={popupData.startDate && selectedPopUpStartDate}
                                                    onChange={handlePopUpStartDateChange}
                                                    label="Start Date"
                                                    format="yyyy-MM-dd"
                                                    fullWidth
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Field
                                                    variant="outlined"
                                                    component={KeyboardDatePicker}
                                                    name="startDate"
                                                    value={popupData.endDate && selectedPopUpEndDate}
                                                    onChange={handlePopUpEndDateChange}
                                                    label="End Date"
                                                    format="yyyy-MM-dd"
                                                    fullWidth
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <Field
                                                fullWidth
                                                variant="outlined"
                                                component={TextField}
                                                name="description"
                                                label="Description"
                                                value={popupData.description}
                                                onChange={handleChange}
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
                                            type="submit"
                                            style={{ marginRight: 5 }}
                                        >
                                            Save details
                                        </Button>
                                        <Button onClick={handleClose} color="primary">
                                            Cancel
                                        </Button>
                                    </Box>
                                </form>

                            </DialogContent>
                        </Dialog>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Workexperience;
