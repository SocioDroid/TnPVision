import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui';
import { Box, Button, List, ListSubheader, ListItem, ListItemText, Divider, Grid, Typography, makeStyles } from '@material-ui/core';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import { KeyboardDatePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import StudentService from '../../../services/StudentService';
import swal from 'sweetalert';

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

const Achievement = () => {
    const classes = useStyles();
    const [achievementData, setAchievementData] = useState([])
    const [open, setOpen] = useState(false);
    const [popupData, setPopupData] = useState({})
    const [selectedDate, handleDateChange] = useState([]);
    const [selectedPopUpDate, handlePopUpDateChange] = useState(new Date("2018-03-02"));

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        StudentService.getAchievement()
            .then(res => {
                console.log("setAchievementData data", res);
                setAchievementData(res.data)
                
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
                    <Typography variant="h4" className={classes.typography}> Achievement </Typography>
                    <Divider className={classes.divider} />
                </Grid>
            </Grid>
            <List className={classes.root} subheader={<li />}>
                {achievementData.map((data, index) => {
                    return (
                        <li key={`section-${index}`} className={classes.listSection}>
                            <ul className={classes.ul}>
                                <Grid container direction="row">
                                    <Grid item md={10} xs={10}>
                                        <ListSubheader style={{ fontSize: "18px" }}>{`Name: ${data.name}`}</ListSubheader>
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
                                    <ListItemText primary={`Date: ${data.date}`} />
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
                    achievement: [{
                        index: 1,
                        name: "",
                        date: "",
                        description: "",
                    }]

                }}
                onSubmit={async values => {
                    values.achievement.map((_, index) => (
                        values.achievement[index].date = new Date(selectedDate[index]).toISOString().split('T')[0]
                    ))
                    StudentService.updateAchievement([...achievementData, ...values.achievement])
                        .then(res => {
                            console.log("", res);
                            setAchievementData(res.data)
                            swal({
                                title: "Thank You!",
                                text: "Achievement Added Successfully!",
                                icon: "success",
                                button: "Close!",
                                timer: 1500
                              });
                        }).catch(error => {
                            console.log(error);
                            swal({
                                title: "Error Occured?",
                                icon: "warning",
                                button: "Close!",
                                timer: 1500
                              })
                        });
                }}
            >
                {({ values, errors }) => (
                    <Form autoComplete="off">
                        <Box margin={1} paddingBottom={2}>
                            <FieldArray name="achievement">
                                {({ push, remove }) => (
                                    <React.Fragment>
                                        {values.achievement.map((_, index) => (
                                            <div key={index}>
                                                <Grid container item spacing={3}>
                                                    <Grid item md={5} xs={10}>
                                                        <Field
                                                            fullWidth
                                                            name={`achievement[${index}].name`}
                                                            component={TextField}
                                                            label="Name"
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item md={5} xs={10}>
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <Field
                                                                variant="outlined"
                                                                component={KeyboardDatePicker}
                                                                name={`achievement[${index}].date`}
                                                                value={selectedDate[index]}
                                                                onChange=
                                                                {(event, newValue) => {
                                                                    let tech = [...selectedDate];
                                                                    tech[index] = newValue;
                                                                    handleDateChange([...tech]);
                                                                    console.log("date", selectedDate);

                                                                }}
                                                                label="Date"
                                                                format="yyyy-MM-dd"
                                                                fullWidth
                                                            />
                                                        </MuiPickersUtilsProvider>
                                                    </Grid>
                                                    <Grid item md={5} xs={10}>
                                                        <Field
                                                            component={TextField}
                                                            fullWidth
                                                            name={`achievement[${index}].description`}
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
                                                            index: values.achievement.length + 1,
                                                            name: '',
                                                            date: "",
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
                    name: popupData.name,
                    date: popupData.date,
                    description: popupData.description,
                }}

                onSubmit={async values => {
                    // { popupData.date = new Date(selectedPopUpDate).toISOString().split('T')[0] }
                    popupData.date = new Date(selectedPopUpDate).toISOString().split('T')[0]
                    StudentService.updateIndividualAchievement(popupData)

                        .then(res => {
                            console.log("res", res);
                            setAchievementData(res.data)
                            setOpen(false);
                        }).catch(error => {
                            console.log(error);
                        });
                }}
            >

                {({ values, errors }) => (

                    <Form autoComplete="off">
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Achievement</DialogTitle>
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
                                                name="name"
                                                label="Name"
                                                value={popupData.name}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Field
                                                    variant="outlined"
                                                    component={KeyboardDatePicker}
                                                    name="date"
                                                    value={popupData.date && selectedPopUpDate}
                                                    onChange={handlePopUpDateChange}
                                                    label="Date"
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

export default Achievement;
