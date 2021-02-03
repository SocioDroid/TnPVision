import React, { useState, useEffect } from 'react'
import {Formik, Form, Field, FieldArray} from 'formik'
import {TextField} from 'formik-material-ui'
import {Card, CardContent, Button, Box, Grid, Typography, MenuItem, Slider } from '@material-ui/core'
import { KeyboardDateTimePicker  } from 'formik-material-ui-pickers'
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Autocomplete} from 'formik-material-ui-lab';
import {top100Films, JobJocation, AllBranches} from '../data';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MuiTextField from '@material-ui/core/TextField';
import MultipleValueTextInput from 'react-multivalue-text-input';
import parse from 'html-react-parser';
import CompanyService from '../../../services/CompanyService';
import { useForm } from '../../../components/useForm';
import StudentService from '../../../services/studentService';
import EmployeeService from '../../../services/EmployeeServices';
import Popup from "../../../components/Popup";
import ProfileDetails from "../CompanyUpload/ProfileDetails"



  const ranges = [
    {
        value: 'none',
        label: 'None',
    },
    {
      value: 'fulltime',
      label: 'Full Time, Permanent',
    },
    {
      value: 'parttime',
      label: 'Part Time',
    },
    {
      value: 'internship',
      label: 'Internship',
    },
  ];

  const departments = [
    {
      value: 'none',
      label: 'None',
    },
    {
      value: 'oncampus',
      label: 'On Campus',
    },
    {
      value: 'online',
      label: 'Online',
    },
    {
      value: 'pool',
      label: 'Pool Campus',
    },
  ];


export default function Basic(props) {

    const [emails, setEmails] = useState([])
    const [drivelocation, setDrivelocation] = useState([])

    const { addOrEdit } = props;
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

    const[ posts, setPosts] = useState([]);
    const getAllCompanies = () => {
        CompanyService.getAllCompanies()
          .then(res => {        
              setPosts(res.data);          
          })
          .catch( err => {
              console.log(err);
          })
    }

    const[ volposts, setVolposts] = useState([]);
    const getAllVolunteers = () => {
        StudentService.getAllStudents()
          .then(res => {        
            setVolposts(res.data);          
          })
          .catch( err => {
              console.log(err);
          })
    }

    const[ corposts, setCorosts] = useState([]);
    const getAllCoordinators = () => {
        EmployeeService.getAllEmployee()
          .then(res => {        
            setCorosts(res.data);          
          })
          .catch( err => {
              console.log(err);
          })
    }

    useEffect((props) => {
    getAllCompanies();
    getAllVolunteers();
    getAllCoordinators();
    }, [])

    const {
        resetForm
    } = useForm(true);
    const [openPopup, setOpenPopup] = useState(false) 
    function openPopupWithExtraData(){
        setOpenPopup(true)
      }

    return(
    <div>
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

                eligiblebranches: [],
                jobtitle:'',
                date: new Date(),
                drive_location: [],
                salary: [],
                tenth: '60',
                twelfth: '60',
                diploma: '60',
                engineering: '60',
                educational_gap:'0',
                year_down:'0',
                live_backlog: '0',
                dead_backlog: '0',
                drive_type: 'none',
                employment_type: 'none', 
                company: {name:''},
                rounds:[{ type: '',description:''}],
                assigned_volunteers: [],
                assigned_coordinators:[],

                description: '',
                hremails: [],
                joblocation: [], 
                
            }}

            onSubmit={async (values) => {
                //console.log("consoling:", parse(value).props)
                values.salary= val;
                values.description= parse(value).props.children;
                values.hremails= emails;
                values.drive_location= drivelocation;
                console.log(values);
                addOrEdit(values, resetForm);
                // await new Promise((r) => setTimeout(r, 500));
                // alert(JSON.stringify(values, null, 2));
            }}
            >  
            {({values, errors}) => (
            <Form>
                <Box margin={1} paddingBottom={2}>
                    <Field fullWidth component={TextField} variant="outlined" name="jobtitle" type="text" label="Job Posting Headline" helperText="Enter Headline"/>    
                </Box>
                {/* <Box margin={1} paddingBottom={2}>
                    <Field fullWidth component={TextField} type="text" name="company" label="Comapny Name" select variant="outlined" helperText="Enter Company Name" margin="normal" InputLabelProps={{ shrink: true,}}>
                        {posts.map(post => (
                            <MenuItem key={post.id} value={post.name}>
                            {post.name}
                            </MenuItem>
                        ))}
                        <MenuItem><Button variant="contained" color="primary" onClick={()=>{openPopupWithExtraData()}}>Add Company</Button></MenuItem>
                    </Field>
                </Box> */}
                <Box margin={1} paddingBottom={2}>
                    <Field
                        name="company"
                        component={Autocomplete}
                        options={posts}
                        getOptionLabel={option => option.name}
                        fullWidth
                        renderInput={(params) => (
                            <MuiTextField
                            {...params}
                            helperText="Add Company"
                            label="Comapny Name"
                            variant="outlined"
                            />
                        )}
                    /> 
                    <br/>
                    <Button variant="contained" color="primary" onClick={()=>{openPopupWithExtraData()}}>Add New Company</Button>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth component={TextField} type="text" name="drive_type" label="Drive Type" select variant="outlined" helperText="Please select Drive Type" margin="normal" InputLabelProps={{ shrink: true,}}>
                                {departments.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </Field>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth component={TextField} variant="outlined" type="text" name="employment_type" label="Employment Type" select helperText="Please select Employment Type" margin="normal" InputLabelProps={{shrink: true,}}>
                            {ranges.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                            </Field>
                        </Box>
                    </Grid>
                </Grid>
                
                <Box margin={1} paddingBottom={2}>
                    <Typography style={{color:"grey"}} >Enter Job Description</Typography>
                    <CKEditor 
                        editor={ClassicEditor}
                        onChange={handleChange}
                    />
                </Box>
                <Box margin={1} paddingBottom={2}>
                    <Field
                            name="eligiblebranches"
                            multiple
                            component={Autocomplete}
                            options={AllBranches}
                            getOptionLabel={(option) => option.branch}
                            fullWidth
                            renderInput={(params) => (
                                <MuiTextField
                                {...params}
                                helperText="Add Eligible Branches"
                                label="Eligible Branches"
                                variant="outlined"
                                />
                            )}
                        />
                </Box>
                <Box margin={1} paddingBottom={2}>
                    <Field
                            name="joblocation"
                            multiple
                            component={Autocomplete}
                            options={JobJocation}
                            getOptionLabel={(option) => option.city}
                            fullWidth
                            renderInput={(params) => (
                                <MuiTextField
                                {...params}
                                helperText="Add Job Locations"
                                label="Job Locations"
                                variant="outlined"
                                />
                            )}
                        />
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Box margin={2} paddingBottom={1} paddingTop={1}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Field variant="outlined" component={KeyboardDateTimePicker } name="date" label="Date Of Drive" format="dd/MM/yyyy HH:mm" helperText="Enter Date Of Drive" fullWidth/>
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
                
                <Grid container spacing={3}>
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
                </Grid>  

                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth variant="outlined" component={TextField} name="tenth" type="text" label="10th Percentage" helperText="Enter 10th Percentage Criteria"/>    
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth variant="outlined" component={TextField} name="twelfth" type="text" label="12th Percentage" helperText="Enter 12th Percentage Criteria"/>    
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth variant="outlined" component={TextField} name="diploma" type="text" label="Diploma Percentage" helperText="Enter Diploma Percentage Criteria"/>    
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth variant="outlined" component={TextField} name="engineering" type="number" label="Engineering Percentage" helperText="Enter Engineering Percentage Criteria"/>    
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth variant="outlined" component={TextField} name="educational_gap" type="number" label="Educational Gap" helperText="Enter Educational Gap Criteria"/>    
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth variant="outlined" component={TextField} name="year_down" type="number" label="Year Down" helperText="Enter Year Down Criteria"/>    
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth variant="outlined" component={TextField} name="live_backlog" type="number" label="Live Backlog" helperText="Enter Live Backlog Count" />    
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                            <Field fullWidth variant="outlined" component={TextField} name="dead_backlog" type="number" label="Dead Backlog" helperText="Enter Dead Backlog Count" />    
                        </Box>
                    </Grid>
                </Grid>
                
                
                <Box margin={1} paddingBottom={2}>
                    <Field
                        name="assigned_volunteers"
                        multiple
                        component={Autocomplete}
                        options={top100Films}
                        getOptionLabel={(option) => option.title}
                        fullWidth
                        renderInput={(params) => (
                            <MuiTextField
                            {...params}
                            helperText="Add Volunteers for Drive Management"
                            label="Volunteers"
                            variant="outlined"
                            />
                        )}
                    />
                </Box>
                <Box margin={1} paddingBottom={2}>
                    <Field
                        name="assigned_coordinators"
                        multiple
                        component={Autocomplete}
                        options={top100Films}
                        getOptionLabel={(option) => option.title}
                        fullWidth
                        renderInput={(params) => (
                            <MuiTextField
                            {...params}
                            helperText="Add Coordinators for Drive Management"
                            label="Coordinators"
                            variant="outlined"
                            />
                        )}
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
                                        {/* <Grid item>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <Field 
                                                name={`rounds[${index}].date`}
                                                component={KeyboardDateTimePicker}
                                                label="Round Date"
                                                inputVariant="outlined"
                                            />
                                            </MuiPickersUtilsProvider>
                                        </Grid> */}
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

            <Popup
                title="Company Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <ProfileDetails addOrEdit={addOrEdit}/>
            </Popup>
    </div>
    );
    }

