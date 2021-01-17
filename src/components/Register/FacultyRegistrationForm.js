import React, { Children } from 'react'
import {Formik, Form, Field} from 'formik'
import {TextField, Switch} from 'formik-material-ui'
import {Card, CardContent, Button, Box, Grid, Typography, MenuItem, CircularProgress, FormControlLabel} from '@material-ui/core'
import { KeyboardDatePicker } from 'formik-material-ui-pickers'
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {object} from 'yup'
import HeaderForRegistration from './HeaderForRegistration'

const ranges = [
    {
        value: 'none',
        label: 'None',
      },
    {
      value: 'female',
      label: 'Female',
    },
    {
      value: 'male',
      label: 'Male',
    },
    {
      value: 'notsay',
      label: 'Prefer Not To Say',
    },
  ];
const departments = [
    {
        value: 'none',
        label: 'None',
    },
    {
      value: 'computer',
      label: 'Computer Engineering',
    },
    {
      value: 'it',
      label: 'Information Technology',
    },
    {
      value: 'entc',
      label: 'Electronics and Telecommunication',
    },
    {
      value: 'mechanical',
      label: 'Mechanical Engineering',
    },
    {
      value: 'civil',
      label: 'Civil Engineering',
    },
  ];


const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

export default function FacultyRegistration(){
    return(
        <Card>
            <HeaderForRegistration/>
        <CardContent>
        <FormikStepper 
        validationSchema={
            object({
                //email : string().required(),
                //email : string().email()
                //fatheroccupation : string().required()
        })}
        initialValues={{
            select: 'none', 
            phone: '', 
            peraddress: '', 
            curaddress:'',
            pan:'',
            aadhar:'',
            permament:'',
            description:'',

            selectdepartment: 'none', 
            college: '', 
            prn: '', 
            designation:'',
            declaration:''
        }} 
        onSubmit={async (values) => {
            await sleep(3000);
            console.log('Values',values)
        }}
        >           

                <div label="Personal Data">
                    <Grid container direction="column">
                    <Grid item container>
                    <Grid item xs={false} sm={1}/>
                    <Grid item xs={12} sm={10}> 

                    <Box margin={1} paddingBottom={2}>
                        <Typography variant= "h5" color="primary" >About Section</Typography>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field component={KeyboardDatePicker} name="date" label="Date Of Birth" format="dd/MM/yyyy" helperText="Enter Date Of Birth" fullWidth/>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field fullWidth component={TextField} type="text" name="select" label="Gender" select variant="standard" helperText="Please select Gender" margin="normal" InputLabelProps={{shrink: true,}}>
                        {ranges.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                        </Field>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field fullWidth component={TextField} name="pan" type="text" label="PAN Number" helperText="Enter your PAN Number"/>    
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field fullWidth component={TextField} name="aadhar" type="text" label="Aadhar Number" helperText="Enter your Aadhar Number"/>    
                    </Box>
                    <br/>
                    <Box margin={1} paddingBottom={2}>
                        <Typography variant= "h5" color="primary" >Contact Section</Typography>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field fullWidth component={TextField} name="phone" type="number" label="Phone Number" helperText="Enter your Phone Number"/>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field fullWidth component={TextField} name="peraddress" type="text" label="Permanent Address" helperText="Enter your Permanent Address"/>    
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field fullWidth component={TextField} name="curaddress" type="text" label="Current Address" helperText="Enter your Current Address"/>    
                    </Box>   
                    <Box margin={1} paddingBottom={2}>
                        <Typography variant= "h5" color="primary" >Current/Ongoing Positon</Typography>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field fullWidth component={TextField} type="text" name="selectdepartment" label="Department" select variant="standard" helperText="Please select your Department" margin="normal" InputLabelProps={{ shrink: true,}}>
                            {departments.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </Field>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field fullWidth component={TextField} name="college" type="text" label="College Name" helperText="Enter your College Name" />    
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field fullWidth component={TextField} name="designation" type="text" label="Designation" helperText="Enter your Designation" />    
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field fullWidth component={TextField} name="prn" type="text" label="Permanent Registration Number" helperText="Enter your PRN"/>    
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <FormControlLabel
                            control={
                                <Field component={Switch} type="checkbox" name="permament" />
                            }
                            label="Permanent"
                        />
                    </Box>
                    </Grid> 
                    <Grid item xs={false} sm={1}/>
                    </Grid>
                </Grid>
                </div> 
        </FormikStepper>
        </CardContent>
        </Card> 
    )
}


export function FormikStepper({children, ...props}){
    const childrenArray = Children.toArray(children);
    
    return(
        <Formik {...props}>
        {({isSubmitting}) => (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Form autoComplete="off">
                {childrenArray}
                <br/>
                <Grid container direction="column">
                    <Grid item container>
                    <Grid item xs={false} sm={1}/>
                    <Grid item xs={12} sm={10}> 
                    <Button startIcon={isSubmitting? <CircularProgress size= "1rem"/>:null} disabled={isSubmitting} variant="contained" color="primary" type="submit">
                        {isSubmitting? 'Submitting' :  'Submit'}
                    </Button>
                    </Grid> 
                    <Grid item xs={false} sm={1}/>
                    </Grid>
                </Grid>
            </Form>
            </MuiPickersUtilsProvider>
        )}
        </Formik>
    )
}