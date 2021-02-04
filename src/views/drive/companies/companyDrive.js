import React, { useState } from 'react'
import {Formik, Form, Field, FieldArray} from 'formik'
import {TextField} from 'formik-material-ui'
import {Card, CardContent, Button, Box, Grid, Typography, MenuItem, Slider, makeStyles } from '@material-ui/core'
import { KeyboardDateTimePicker  } from 'formik-material-ui-pickers'
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Autocomplete} from 'formik-material-ui-lab';
import {top100Films, JobJocation} from '../data';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MuiTextField from '@material-ui/core/TextField';
import MultipleValueTextInput from 'react-multivalue-text-input';
import parse from 'html-react-parser';
import DriveService from '../../../services/DriveServices';
import axios from 'axios'
import Auth from '../../../auth';
import MomentUtils from "@date-io/moment";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
  }));

  const employee_type = [
    {
      value: 'Full Time',
      label: 'Full Time',
    },
    {
      value: 'Internship',
      label: 'Internship',
    },
  ];

  const driveType = [
    {
      value: 'ON',
      label: 'ON Campus',
    },
    {
      value: 'OFF',
      label: 'OFF Campus',
    },
    {
      value: 'POOL',
      label: 'Pool Campus',
    },
  ];

export default function Basic(props) {
    const classes = useStyles();
    //const [emails, setEmails] = useState([])
    const [volunteers, setVolunteers] = useState([])
    const [coordinators, setCoordinators] = useState([])
    //const [drivelocation, setDrivelocation] = useState("")
    const [selectedDate, handleDateChange] = useState(new Date("2018-01-01T00:00:00.000Z"));

    const [value, setValue] = useState("")
    const handleChange = (e, editor) => {
        const data = editor.getData()
        setValue(data)
    }

    const [val, setVal] = useState([0,50])
    const updateRange= (e, data) =>{
        setVal(data);
    }
    const mark = [
        {
            value: 0,
            label: "0 CTC"
        },
        {
            value: 50,
            label: "50 CTC"
        }
    ]
    return(
    <div className={classes.root}>
        <Grid item container>
            <Grid item xs={false} sm={1}/>
            <Grid item xs={12} sm={10}>
            <Card>   
            <CardContent>
            <Box margin={1} paddingBottom={2}>
                <Typography variant= "h2" color="primary" >Post a Job - Private</Typography>
            </Box>
            <Formik
            initialValues={{
                eligible_branches: [],
                jobtitle:'',
                date: '',
                login_time: 0,
                drive_location: '',
                min_salary: 0,
                max_salary: 0,
                tenth: 60,
                twelth: 60,
                diploma: 60,
                engineering: 60,
                educational_gap: 0,                
                year_down: 0,
                live_backlog: 0,
                dead_backlog: 0,
                drive_type: 'ON',
                //autocomplete: [],
                employment_type: 'Full Time', 
                company: '',
                rounds:[],
                assigned_coordinators: [],
                assigned_volunteers: [],
                //description: '',
                //hremails: [],
                //joblocation: [],
            }}

            onSubmit={async (values) => {
                values.assigned_volunteers = volunteers;
                values.assigned_coordinators = coordinators;
                values.min_salary = val[0]
                values.max_salary = val[1]
                values.date = new Date(selectedDate).toISOString()
                console.log("salary", val);
                console.log("date", selectedDate);
                
                // axios.post("https://tnpvision-cors.herokuapp.com/http://20.37.50.140:8000/api/drive", values,{
                //     headers: {
                //         "Content-type": "application/json",
                //         "X-Requested-With": "XMLHttpRequest",
                //         "Authorization": "Token " + Auth.getToken() 
                //       }
                // })
                // // DriveService.addDrive(values)
                // .then((result) => {    
                //     console.log(result);
                // })
                // .catch((error) =>{
                //     console.log(error);
                // });
                console.log(values);
            }}
            >  
            {({values, errors}) => (
            <Form>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth component={TextField} variant="outlined" name="jobtitle" type="text" label="Job Title" />  
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth component={TextField} variant="outlined" name="company" type="text" label="Company Name"  />
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth component={TextField} type="text" name="drive_type" label="Drive Type" select variant="outlined" margin="normal" InputLabelProps={{ shrink: true,}}>
                                {driveType.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </Field>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth component={TextField} variant="outlined" type="text" name="employment_type" label="Employment Type" select margin="normal" InputLabelProps={{shrink: true,}}>
                            {employee_type.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                            </Field>
                        </Box>
                    </Grid>
                </Grid>
                
                {/* <Box margin={1} paddingBottom={2}>
                    <Typography style={{color:"grey"}} >Enter Job Description</Typography>
                    <CKEditor 
                        editor={ClassicEditor}
                        onChange={handleChange}
                    />
                </Box> */}

                {/* <Box margin={1} paddingBottom={2}>
                    <Field
                            name="job_location"
                            multiple
                            component={Autocomplete}
                            options={JobJocation}
                            getOptionLabel={(option) => option.city}
                            fullWidth
                            renderInput={(params) => (
                                <MuiTextField
                                {...params}
                                label="Job Locations"
                                variant="outlined"
                                />
                            )}
                        />
                </Box> */}
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth variant="outlined" component={TextField} name="login_time" type="number" label="Login Time" />    
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Box margin={2} paddingBottom={1} paddingTop={1}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Field variant="outlined" component={KeyboardDateTimePicker } name="date" value={selectedDate} onChange={handleDateChange} label="Date Of Drive" format="yyyy/MM/dd HH:mm" fullWidth/>
                            </MuiPickersUtilsProvider>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box margin={2} paddingBottom={1} paddingTop={1}>
                            <Typography style={{color:"grey"}} >Salary Range</Typography>
                            <Field component={Slider}
                                name="salary"
                                value={val}
                                onChange={updateRange}
                                marks = {mark}
                                step = {0.1}
                                max = {50}
                                valueLabelDisplay = "auto">   
                            </Field>         
                        </Box>
                    </Grid>
                </Grid> 
                
                {/* <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                            <MultipleValueTextInput
                                style={{height:"50px", color:"grey"}}
                                onItemAdded={(item, allItems) => {setEmails(allItems)}}
                                onItemDeleted={(item, allItems) => {setEmails(allItems)}}
                                label="HR Emails"
                                name="emails"
                                placeholder="  Enter HR Emails"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                            <MultipleValueTextInput
                                style={{height:"50px", color:"grey"}}
                                onItemAdded={(item, allItems) => {setDrivelocation(allItems)}}
                                onItemDeleted={(item, allItems) => {setDrivelocation(allItems)}}
                                label="Drive Locations"
                                name="drive_location"
                                placeholder="  Enter Drive Locations"
                            />
                            
                        </Box>
                    </Grid>
                </Grid>   */}
                
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth variant="outlined" component={TextField} name="drive_location" type="text" label="Drive Location" />    
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth variant="outlined" component={TextField} name="tenth" type="text" label="10th Percentage" />    
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth variant="outlined" component={TextField} name="twelth" type="text" label="12th Percentage" />    
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth variant="outlined" component={TextField} name="diploma" type="text" label="Diploma Percentage" />    
                        </Box>
                    </Grid>
                </Grid>
                
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth variant="outlined" component={TextField} name="engineering" type="number" label="Engineering Percentage" />    
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth variant="outlined" component={TextField} name="educational_gap" type="number" label="Educational Gap" />    
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth variant="outlined" component={TextField} name="year_down" type="number" label="Year Down" />    
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth variant="outlined" component={TextField} name="live_backlog" type="number" label="Live Backlog" />    
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth variant="outlined" component={TextField} name="dead_backlog" type="number" label="Dead Backlog" />    
                        </Box>
                    </Grid>
                </Grid>
                
                
                <Box margin={1} paddingBottom={2}>
                        <MultipleValueTextInput
                                style={{height:"50px", color:"grey"}}
                                onItemAdded={(item, allItems) => {setVolunteers(allItems)}}
                                onItemDeleted={(item, allItems) => {setVolunteers(allItems)}}
                                label="Volunteers"
                                name="assigned_volunteers"
                                placeholder="  Enter Volunteers"
                        />
                </Box>
                <Box margin={1} paddingBottom={2}>
                        <MultipleValueTextInput
                                style={{height:"50px", color:"grey"}}
                                onItemAdded={(item, allItems) => {setCoordinators(allItems)}}
                                onItemDeleted={(item, allItems) => {setCoordinators(allItems)}}
                                label="Coordinators"
                                name="assigned_coordinators"
                                placeholder="  Enter Coordinators"
                        />
                </Box>
                <Box margin={1} >
                    <Typography variant= "body1" >Enter Rounds Information</Typography>
                </Box>
                <Box margin={1} paddingBottom={2}>
                    <FieldArray name="rounds">
                        {({push, remove,})=>(
                            <React.Fragment>
                                {values.rounds.map((_,index) => (
                                    <div key={index}>
                                    <Grid container item spacing={3}>                                        
                                        <Grid item>
                                            <Field 
                                                name={`rounds[${index}].type`}
                                                component={TextField}
                                                label="Round Type"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Field 
                                                name={`rounds[${index}].description`}
                                                component={TextField}
                                                label="Round Description"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" color="primary" onClick={() => remove(index)}>Delete Round</Button>
                                        </Grid>
                                    </Grid>
                                    </div>
                                ))}
                                <Grid container item spacing={3}>
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={() => push({type:'', description:''})}>Add Round</Button>
                                </Grid>
                                </Grid>
                            </React.Fragment>
                        )}
                    </FieldArray>
                </Box>
                <Button variant="contained" color="primary" type="submit">
                        Submit
                </Button>
                <br/><br/>
            </Form>
            )}
            </Formik>

        </CardContent>
            </Card> 
            </Grid>
            <Grid item xs={false} sm={1}/>
            </Grid>
    </div>
    );
    }

