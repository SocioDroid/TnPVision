import React, { useState } from 'react'
import {Formik, Form, Field} from 'formik'
import {TextField} from 'formik-material-ui'
import {Card, CardContent, Button, Box, Grid, Typography, MenuItem, CircularProgress, Slider } from '@material-ui/core'
//import { KeyboardDateTimePicker  } from 'formik-material-ui-pickers'
//import {MuiPickersUtilsProvider} from '@material-ui/pickers';
//import DateFnsUtils from '@date-io/date-fns';
import { Autocomplete} from 'formik-material-ui-lab';
import {top100Films, JobJocation} from '../data';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MuiTextField from '@material-ui/core/TextField';
//import 'react-multi-email-custom/style.css';
//import MultipleValueTextInput from 'react-multivalue-text-input';
import parse from 'html-react-parser';

//import MUIRichTextEditor from "mui-rte";
//import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';
//import { ReactMultiEmailCustom } from 'react-multi-email-custom';

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

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));


export default function Basic() {

    const [emails, setEmails] = useState([])
    const [drivelocation, setDrivelocation] = useState([])

    /*const save = (data) => {
        console.log(data);
    };*/

    const [value, setValue] = useState("")
    const handleChange = (e, editor) => {
        const data = editor.getData()
        setValue(data)
        console.log(data)
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
  <div>
    <Grid item container>
        <Grid item xs={false} sm={2}/>
        <Grid item xs={12} sm={8}>
        <Card>   
        <CardContent>
        <Box margin={1} paddingBottom={2}>
            <Typography variant= "h5" color="primary" >Post a Job - Private</Typography>
            <Typography variant= "h6" color="secondary" >Some Text</Typography>
        </Box>
        <Formik
        initialValues={{
            select: 'none', 
            heading:'',
            description: '',
            companyname: '',
            drivelocation: [],
            selectdrivetype: 'none',
            hremails: [],
            joblocation: [],
            tenth: '60',
            twelfth: '60',
            diploma: '60',
            live: '0',
            dead: '0',
            autocomplete: [],
            salary: [],
            date: new Date(),
        }}

        onSubmit={async (values) => {
            //console.log("consoling:", parse(value).props.children)
            values.salary= val;
            values.description= parse(value).props.children;
            values.hremails= emails;
            values.drivelocation= drivelocation;
            console.log(values);
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
        }}
        >  
        <Form>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Box margin={1} paddingBottom={2}>
                        <Field fullWidth component={TextField} variant="outlined" name="heading" type="text" label="Job Posting Headline" helperText="Enter Headline"/>    
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box margin={1} paddingBottom={2}>
                        <Field  fullWidth component={TextField} variant="outlined" name="companyname" type="text" label="Comapny Name" helperText="Enter Company Name"/>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Box margin={1} paddingBottom={2}>
                        <Field fullWidth component={TextField} type="text" name="selectdrivetype" label="Drive Type" select variant="outlined" helperText="Please select Drive Type" margin="normal" InputLabelProps={{ shrink: true,}}>
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
                        <Field fullWidth component={TextField} variant="outlined" type="text" name="select" label="Employment Type" select helperText="Please select Employment Type" margin="normal" InputLabelProps={{shrink: true,}}>
                        {ranges.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                        </Field>
                    </Box>
                </Grid>
            </Grid>
            
            {/*<Box margin={1} paddingTop={1} paddingBottom={1} paddingLeft={2} border= {1} borderColor= "grey.500">
                <Typography style={{color:"grey"}} >Enter Job Description</Typography>
                <br/>
                <MUIRichTextEditor
                    name="description"
                    label="Type something here..."
                    onSave={save}
                    inlineToolbar={true}
                    variant="Outlined"
                />
            </Box>
            <br/>*/}

            <Box margin={1} paddingBottom={2}>
                <Typography style={{color:"grey"}} >Enter Job Description</Typography>
                 <CKEditor 
                    editor={ClassicEditor}
                    onChange={handleChange}
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
                {/* <Grid item xs={6}>
                    <Box margin={2} paddingBottom={1} paddingTop={1}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Field variant="outlined" component={KeyboardDateTimePicker } name="date" label="Date Of Drive" format="dd/MM/yyyy HH:mm" helperText="Enter Date Of Drive" fullWidth/>
                        </MuiPickersUtilsProvider>
                    </Box>
                </Grid> */}
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
                        {/*<FormControl>
                            <ReactMultiEmailCustom style={styles} emails={emails} onChange={_emails => { setEmails(_emails); }}
                            getLabel={(
                                email, index, removeEmail,) => {
                                return (
                                    <div data-tag key={index}>
                                        {email}
                                        <span data-tag-handle onClick={() => removeEmail(index)}> × </span>
                                    </div>
                                );
                                }}
                            />
                            </FormControl>
                            <br/>
                            <FormControl>
                                <label>Enter HR Emails</label>
                            </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box margin={1} paddingBottom={2}>
                        <MultipleValueTextInput
                            style={{height:"50px", color:"grey"}}
                            onItemAdded={(item, allItems) => {setDrivelocation(allItems)}}
                            onItemDeleted={(item, allItems) => {setDrivelocation(allItems)}}
                            label="Drive Locations"
                            name="item-input"
                            placeholder="  Enter Drive Locations"
                        />
                    </Box>
                </Grid>
            </Grid>  */}

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
                <Grid item xs={6}>
                    <Box margin={1} paddingBottom={2}>
                        <Field fullWidth variant="outlined" component={TextField} name="live" type="number" label="Live Backlog" helperText="Enter Live Backlog Count" />    
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box margin={1} paddingBottom={2}>
                        <Field fullWidth variant="outlined" component={TextField} name="dead" type="number" label="Dead Backlog" helperText="Enter Dead Backlog Count" />    
                    </Box>
                </Grid>
            </Grid>
            
            
            <Box margin={1} paddingBottom={2}>
                <Field
                    name="autocomplete"
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
            <Button variant="contained" color="primary" type="submit">
                    Submit
            </Button>
            <br/><br/>
        </Form>
        </Formik>

    </CardContent>
        </Card> 
        </Grid>
        <Grid item xs={false} sm={2}/>
        </Grid>
  </div>
);
}

