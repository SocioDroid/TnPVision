import React, { Children } from 'react'
import {Formik, Form, Field} from 'formik'
import {CheckboxWithLabel, TextField, Switch} from 'formik-material-ui'
import {Card, CardContent, Button, Box, Step, StepLabel, Stepper, Grid, Typography, MenuItem, CircularProgress, FormControlLabel} from '@material-ui/core'
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

const after10th = [
    {
        value: 'none',
        label: 'None',
    },
    {
      value: '12th',
      label: '12th Standard',
    },
    {
      value: 'diploma',
      label: 'Diploma',
    },
  ];

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

export default function Home(){
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
            email: '', 
            select: 'none', 
            fatheroccupation: '', 
            motheroccupation: '',
            studentphone: '', 
            phone: '', 
            peraddress: '', 
            curaddress:'',
            pan:'',
            aadhar:'',
            placed:'',
            description:'',

            sem1: '',
            sem2: '',
            sem3: '',
            sem4: '',
            sem5: '',
            sem6: '',
            sem1percent: '',
            sem2percent: '',
            sem3percent: '',
            sem4percent: '',
            sem5percent: '',
            sem6percent: '',

            selectdepartment: 'none', 
            college: '', 
            prn: '', 
            aggregate: '', 
            peraggregate:'',
            liveback:'0',
            deadback:'0',
            educationalgap: '',
            selectarea: 'none', 
            jrcollege:'',
            jruniversity:'', 
            jrscore:'', 
            school:'',
            schooluniversity:'', 
            schoolscore: '',
            declaration:''
        }} 
        onSubmit={async (values) => {
            await sleep(3000);
            console.log('Values',values)
        }}
        >

    {/*////////////////////////////////////////////////////////Personal Data/////////////////////////////////////////////////////////////////////////*/}        
                <div label="Personal Data">
                <Grid container direction="column">
                    <Grid item container>
                    <Grid item xs={false} sm={1}/>
                    <Grid item xs={12} sm={10}>
                    
                    <Box margin={1} paddingBottom={2}>
                        <Typography variant= "h5" style={{color: "#f50057"}} >About Section</Typography>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required component={KeyboardDatePicker} name="date" label="Date Of Birth" format="dd/MM/yyyy" helperText="Enter Date Of Birth" fullWidth/>
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
                        <Field required fullWidth component={TextField} name="fatheroccupation" type="text" label="Father's Occupation" helperText="Enter your Father's Occupation"/>    
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="motheroccupation" type="text" label="Mother's Occupation" helperText="Enter your Mother's Occupation" />    
                    </Box>
                    <br/>
                    <Box margin={1} paddingBottom={2}>
                        <Typography variant= "h5" style={{color: "#f50057"}} >Contact Section</Typography>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="studentphone" type="number" label="Student Phone Number" helperText="Enter your Phone Number"/>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="email" type="email" label="Parents Email Address" helperText="Enter your Parent's Email ID"/>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="phone" type="number" label="Parents Phone Number" helperText="Enter your Parent's Phone Number"/>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="peraddress" type="text" label="Permanent Address" helperText="Enter your Permanent Address"/>    
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="curaddress" type="text" label="Current Address" helperText="Enter your Current Address"/>    
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="pan" type="text" label="PAN Number" helperText="Enter your PAN Number"/>    
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="aadhar" type="text" label="Aadhar Number" helperText="Enter your Aadhar Number"/>    
                    </Box>
                    </Grid> 
                    <Grid item xs={false} sm={1}/>
                    </Grid>
                </Grid>   
                </div>
    {/*////////////////////////////////////////////////////////Academic Data/////////////////////////////////////////////////////////////////////////*/}
                <div label="Academic Data">
                <Grid container direction="column">
                    <Grid item container>
                    <Grid item xs={false} sm={1}/>
                    <Grid item xs={12} sm={10}>
                    <Box margin={1} paddingBottom={2}>
                        <Typography variant= "h5" style={{color: "#f50057"}} >Current/Ongoing Course</Typography>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} type="text" name="selectdepartment" label="Department" select variant="standard" helperText="Please select your Department" margin="normal" InputLabelProps={{ shrink: true,}}>
                            {departments.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </Field>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="college" type="text" label="College Name" helperText="Enter your College Name" />    
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="prn" type="text" label="Permanent Registration Number" helperText="Enter your PRN"/>    
                    </Box>
                    
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="sem1" type="number" label="Semester 1 SGPA" helperText="Enter your Semester 1 SGPA"/>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="sem2" type="number" label="Semester 2 SGPA" helperText="Enter your Semester 2 SGPA"/>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="sem3" type="number" label="Semester 3 SGPA" helperText="Enter your Semester 3 SGPA"/>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="sem4" type="number" label="Semester 4 SGPA" helperText="Enter your Semester 4 SGPA"/>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="sem5" type="number" label="Semester 5 SGPA" helperText="Enter your Semester 5 SGPA"/>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="sem6" type="number" label="Semester 6 SGPA" helperText="Enter your Semester 6 SGPA"/>
                    </Box>

                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="sem1percent" type="number" label="Semester 1 Percentage" helperText="Enter your Semester 1 Percentage"/>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="sem2percent" type="number" label="Semester 2 Percentage" helperText="Enter your Semester 2 Percentage"/>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="sem3percent" type="number" label="Semester 3 Percentage" helperText="Enter your Semester 3 Percentage"/>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="sem4percent" type="number" label="Semester 4 Percentage" helperText="Enter your Semester 4 Percentage"/>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="sem5percent" type="number" label="Semester 5 Percentage" helperText="Enter your Semester 5 Percentage"/>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="sem6percent" type="number" label="Semester 6 Percentage" helperText="Enter your Semester 6 Percentage"/>
                    </Box>

                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="aggregate" type="text" label="Engineering Aggregate" helperText="Enter your Engineering Aggregate in CGPA"/>    
                    </Box>          
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="peraggregate" type="text" label="Engineering Percentage" helperText="Enter your Engineering Aggregate in Percentage"/>    
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required component={KeyboardDatePicker} name="date" label="Date Of Graduation/Expected Graduation" format="MM/yyyy" helperText="Enter Date Of Completion" fullWidth/>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <FormControlLabel 
                            control={
                                <Field component={Switch} style={{color: "#f50057"}} type="checkbox" name="placed" />
                            }
                            label="Placed"
                        />
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Typography variant= "h5" color="primary" >12th / Diploma Details</Typography>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} type="text"  name="selectarea" label="Area" select variant="standard" helperText="Please select your area" margin="normal" InputLabelProps={{ shrink: true,}}>
                            {after10th.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </Field>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="jrcollege" type="text" label="College Name" helperText="Enter your College Name" />    
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="jruniversity" type="text" label="University/Board" helperText="Enter your Board"/>    
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="liveback" type="number" label="No. Of Live Backlogs" helperText="Enter your Live Backlogs"/>    
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="deadback" type="number" label="No. Of Dead Backlogs" helperText="Enter your Dead Backlogs"/>    
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="educationalgap" type="number" label="Educational Gap" helperText="Enter your no. of Educational Gaps"/>    
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required component={KeyboardDatePicker} name="datejr" label="Date Of Passing" format="MM/yyyy" helperText="Enter Date Of Passing" fullWidth/>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="jrscore" type="text" label="12th/ Diploma Percentage" helperText="Enter your 12th/Diploma Percentage"/>    
                    </Box>          
                    <Box margin={1} paddingBottom={2}>
                        <Typography variant= "h5" color="primary" >10th Details</Typography>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="school" type="text" label="College Name" helperText="Enter your School Name"/>    
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="schooluniversity" type="text" label="University/Board" helperText="Enter your Board"/>    
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required component={KeyboardDatePicker} name="dateschool" label="Date Of Passing" format="MM/yyyy" helperText="Enter Date Of Passing" fullWidth/>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field required fullWidth component={TextField} name="schoolscore" type="text" label="10thPercentage" helperText="Enter your 10th Percentage"/>    
                    </Box>
                    </Grid> 
                    <Grid item xs={false} sm={1}/>
                    </Grid>
                </Grid> 
                </div>
    {/*////////////////////////////////////////////////////////////Self Declaration/////////////////////////////////////////////////////////////////////*/}
                <div label="Self Declaration">
                <Grid container direction="column">
                    <Grid item container>
                    <Grid item xs={false} sm={1}/>
                    <Grid item xs={12} sm={10}>
                    <Box margin={1} paddingBottom={2}>
                        <Field name="declaration" type="checkbox" component={CheckboxWithLabel} Label= {{label : 'I agree to all the terms and conditions and declare that the information provided by me is correct for any miss leading or incorrect information, I and aware that I will be responsible'}}/>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                        <Field fullWidth name="description" component={TextField} label="Any other information you would like us to tell?"/>
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


export function FormikStep({children}){
    return <>{children}</>
}

export function FormikStepper({children, ...props}){
    
    const childrenArray = Children.toArray(children);
    const [step, setStep] = React.useState(0);
    const [completed, setCompleted] = React.useState(false);
    const currentChild = childrenArray[step];

    function isLastStep(){
        return step === childrenArray.length - 1;
    }

    return(
        <Formik {...props} onSubmit={async (values, helpers) => {
            if(isLastStep()){
                await props.onSubmit(values, helpers);
                setCompleted(true);
            }
            else{
                setStep(s => s+1);
            }
        }
        }>
        {({isSubmitting}) => (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Form autoComplete="off">
            <Stepper alternativeLabel activeStep={step}>  
                {childrenArray.map((child, index) => (
                <Step key={child.props.label} completed={step > index || completed}>
                    <StepLabel>{child.props.label}</StepLabel>
                </Step>
                ))}
            </Stepper>
                {currentChild}
                <br/>
                <Grid container direction="column">
                    <Grid item container>
                    <Grid item xs={false} sm={1}/>
                    <Grid container spacing={2} item xs={12} sm={10}>
                    <Grid item>
                            {step > 0 ? <Button variant="contained" disabled={isSubmitting} onClick={() => setStep(s=> s-1)}>Back</Button> : null}
                    </Grid>
                    <Grid item>
                            <Button startIcon={isSubmitting? <CircularProgress size= "1rem"/>:null} disabled={isSubmitting} variant="contained" color="primary" type="submit">
                                {isSubmitting? 'Submitting' : isLastStep() ? 'Submit': 'Next'}
                            </Button>
                    </Grid> 
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