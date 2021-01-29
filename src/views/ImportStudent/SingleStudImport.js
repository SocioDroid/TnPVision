import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, MenuItem, Grid, Box, makeStyles, Button, Divider, Typography, Checkbox, FormControlLabel } from '@material-ui/core';
import {DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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

const college=[
	{
		value: 'none',
		label: 'None',
	},
	{
		value: 'dypcoe',
		label: 'DYPCOE',
	},
	{
		value: 'dypiemr',
		label: 'DYPIEMR',
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
    {
        value: 'instrumentation',
        label: 'Instrumentation Engineering',
    },
    {
        value: 'production',
        label: 'Production Engineering',
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

const useStyles = makeStyles({
    img:{
        backgroundColor:'#ffffff',
        height: '120px',
        width: '120px',
    },
    button:{
        marginTop: '15px',
    },
    typography:{
        color: '#9e9e9e',
        marginTop: '10px',
        
    },
    divider:{
        marginBottom: '10px',
    },
    outerBox:{
        borderColor: "grey.500",
        borderRadius: '5px',
        //margin: '10px',
        marginBottom: '15px',
        overflowY: 'scroll',
        height: '70vh',
        
    }
})

export default function PersonalData(){
    const classes = useStyles();
    const [isDataSubmitted, setDataSubmitted] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    //Gender
    const [gender, setGender] = React.useState('none');
    const handleGender = (event) => {
        setGender(event.target.value);
    };

    const formik = useFormik({
        initialValues:{
            firstname: '',
            middlename: '',
            lastname: '',

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
            dob: new Date(),

            sem1: '',
            sem2: '',
            sem3: '',
            sem4: '',
            sem5: '',
            sem6: '',
            sem7: '',
            sem8: '',
            aggregate: '',
            sem1percent: '',
            sem2percent: '',
            sem3percent: '',
            sem4percent: '',
            sem5percent: '',
            sem6percent: '',
            sem7percent: '',
            sem8percent: '',
            peraggregate:'',

            college: 'none',
            selectdepartment: 'none', 
            prn: '',
            selectarea: 'none', 
            jruniversity:'',
            jryearofpassing:'',
            jrscore:'',
            schooluniversity:'', 
            yearofpassing:'',
            schoolscore: '',
            liveback:'0',
            deadback:'0',
            educationalgap: '0',
            placed: false,

        },
        onSubmit: (values, { setSubmitting}) => {
            setSubmitting(true);
            console.log("Form Data", values);
            setDataSubmitted(true);
            
        },
        validationSchema: Yup.object({
            firstname: Yup.string().required('Required'),
            middlename: Yup.string().required('Required'),
            lastname: Yup.string().required('Required'),

            email: Yup.string().email('Invalid Email').required('Required'),
            phone: Yup.string().matches(/^[0]?[789]\d{9}$/, 'Invalid Phone Number').required('Required'),
            fatheroccupation: Yup.string().required('Required'),
            motheroccupation: Yup.string().required('Required'),
            studentphone: Yup.string().matches(/^[0]?[789]\d{9}$/, 'Invalid Phone Number').required('Required'),
            peraddress: Yup.string().required('Required'),
            curaddress: Yup.string().required('Required'),
            pan: Yup.string().matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN Number').required('Required'),
            aadhar: Yup.string().matches(/^[0-9]{12}$/, 'Invalid Aadhar Number').required('Required'),
            dob: Yup.date().nullable().required('Required'),
            gender: Yup.string().required('Required'),

            sem1: Yup.string().matches(/^(10|\d)(\.\d{1,2})?$/, 'Invalid SGPA').required('Required'),
            sem2: Yup.string().matches(/^(10|\d)(\.\d{1,2})?$/, 'Invalid SGPA').required('Required'),
            sem3: Yup.string().matches(/^(10|\d)(\.\d{1,2})?$/, 'Invalid SGPA').required('Required'),
            sem4: Yup.string().matches(/^(10|\d)(\.\d{1,2})?$/, 'Invalid SGPA').required('Required'),
            sem5: Yup.string().matches(/^(10|\d)(\.\d{1,2})?$/, 'Invalid SGPA').required('Required'),
            sem6: Yup.string().matches(/^(10|\d)(\.\d{1,2})?$/, 'Invalid SGPA'),
            sem7: Yup.string().matches(/^(10|\d)(\.\d{1,2})?$/, 'Invalid SGPA'),
            sem8: Yup.string().matches(/^(10|\d)(\.\d{1,2})?$/, 'Invalid SGPA'),
            aggregate: Yup.string().matches(/^(10|\d)(\.\d{1,2})?$/, 'Invalid SGPA').required('Required'),
            sem1percent: Yup.string().matches(/^(100|\d|\d{2})(\.\d{1,2})?$/, 'Invalid Percentage').required('Required'),
            sem2percent: Yup.string().matches(/^(100|\d|\d{2})(\.\d{1,2})?$/, 'Invalid Percentage').required('Required'),
            sem3percent: Yup.string().matches(/^(100|\d|\d{2})(\.\d{1,2})?$/, 'Invalid Percentage').required('Required'),
            sem4percent: Yup.string().matches(/^(100|\d|\d{2})(\.\d{1,2})?$/, 'Invalid Percentage').required('Required'),
            sem5percent: Yup.string().matches(/^(100|\d|\d{2})(\.\d{1,2})?$/, 'Invalid Percentage').required('Required'),
            sem6percent: Yup.string().matches(/^(100|\d|\d{2})(\.\d{1,2})?$/, 'Invalid Percentage'),
            sem7percent: Yup.string().matches(/^(100|\d|\d{2})(\.\d{1,2})?$/, 'Invalid Percentage'),
            sem8percent: Yup.string().matches(/^(100|\d|\d{2})(\.\d{1,2})?$/, 'Invalid Percentage'),
            peraggregate: Yup.string().matches(/^(100|\d|\d{2})(\.\d{1,2})?$/, 'Invalid Percentage').required('Required'),

            college: Yup.string().required('Required'),
            selectdepartment: Yup.string().required('Required'),
            prn: Yup.string().matches(/^[0-9]{8}[A-Z]{1}$/, 'Invalid PRN Number').required('Required'),
            selectarea: Yup.string().required('Required'),
            schooluniversity: Yup.string().required('Required'),
            yearofpassing: Yup.date().nullable(),
            schoolscore: Yup.string().matches(/^(100|\d|\d{2})(\.\d{1,2})?$/, 'Invalid Percentage').required('Required'),
            jruniversity: Yup.string().required('Required'),
            jryearofpassing: Yup.date(),
            jrscore: Yup.string().matches(/^(100|\d|\d{2})(\.\d{1,2})?$/, 'Invalid Percentage').required('Required'),
            liveback: Yup.number().min(0).max(10).required('Required'),
            deadback: Yup.number().min(0).max(10).required('Required'),
            educationalgap: Yup.number().min(0).max(10).required('Required'),
            placed: Yup.boolean().oneOf([true, false]),
        })
    });

    return(
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Box border= {1} className={classes.outerBox} >
            {!isDataSubmitted && <React.Fragment>
                <div label="Personal Data">
                        <Grid container >
                            <Grid item xs={false} sm={1} />
                            <Grid item xs={12} sm={10} >
                            <form onSubmit={formik.handleSubmit} >
                                    <Box border= {1} borderColor= "grey.500" margin='10px' borderRadius= '5px' padding= '20px'>
                                    <Typography variant= "h5" style={{color: '#9e9e9e'}} >Personal Details</Typography>
                                    <Divider className={classes.divider} style={{width:'176px'}} />
                                    <Grid container >
                                    <Grid item xs={12} sm={6} style={{paddingRight: '25px'}}>
                                        <TextField
                                            margin="dense"
                                            id="firstname"
                                            name="firstname"
                                            label="Student First Name"
                                            type="text"
                                            variant="standard"
                                            fullWidth
                                            onChange={formik.handleChange}
                                            onBlur= {formik.handleBlur}
                                            error={formik.errors.firstname && formik.touched.firstname}
                                            helperText= {(formik.errors.firstname && formik.touched.firstname) && formik.errors.firstname}
                                            value={formik.values.firstname}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{paddingRight: '25px'}}>
                                        <TextField
                                            margin="dense"
                                            id="middlename"
                                            name="middlename"
                                            label="Student Middle Name"
                                            type="text"
                                            variant="standard"
                                            fullWidth
                                            onChange={formik.handleChange}
                                            onBlur= {formik.handleBlur}
                                            error={formik.errors.middlename && formik.touched.middlename}
                                            helperText= {(formik.errors.middlename && formik.touched.middlename) && formik.errors.middlename}
                                            value={formik.values.middlename}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{paddingRight: '25px'}}>
                                        <TextField
                                            margin="dense"
                                            id="lastname"
                                            name="lastname"
                                            label="Student Last Name"
                                            type="text"
                                            variant="standard"
                                            fullWidth
                                            onChange={formik.handleChange}
                                            onBlur= {formik.handleBlur}
                                            error={formik.errors.lastname && formik.touched.lastname}
                                            helperText= {(formik.errors.lastname && formik.touched.lastname) && formik.errors.lastname}
                                            value={formik.values.lastname}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{paddingRight: '25px'}}>
                                        <TextField
                                            margin="dense"
                                            id="studentphone"
                                            name="studentphone"
                                            label="Student Phone Number"
                                            type="number"
                                            variant="standard"
                                            fullWidth
                                            onChange={formik.handleChange}
                                            onBlur= {formik.handleBlur}
                                            error={formik.errors.studentphone && formik.touched.studentphone}
                                            helperText= {(formik.errors.studentphone && formik.touched.studentphone) && formik.errors.studentphone}
                                            value={formik.values.studentphone}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{paddingRight: '25px'}}>
                                        <TextField
                                            margin="dense"
                                            id="fatheroccupation"
                                            name="fatheroccupation"
                                            label="Father's Occupation"
                                            type="text"
                                            variant="standard"
                                            fullWidth
                                            onChange={formik.handleChange}
                                            onBlur= {formik.handleBlur}
                                            error={formik.errors.fatheroccupation && formik.touched.fatheroccupation}
                                            helperText= {(formik.errors.fatheroccupation && formik.touched.fatheroccupation) && formik.errors.fatheroccupation}
                                            value={formik.values.fatheroccupation}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{paddingRight: '25px'}}>
                                        <TextField
                                            margin="dense"
                                            id="motheroccupation"
                                            name="motheroccupation"
                                            label="Mother's Occupation"
                                            type="text"
                                            variant="standard"
                                            fullWidth
                                            onChange={formik.handleChange}
                                            onBlur= {formik.handleBlur}
                                            error={formik.errors.motheroccupation && formik.touched.motheroccupation}
                                            helperText= {(formik.errors.motheroccupation && formik.touched.motheroccupation) && formik.errors.motheroccupation}
                                            value={formik.values.motheroccupation}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{paddingRight: '25px'}}>
                                        <TextField
                                            margin="dense"
                                            id="phone"
                                            name="phone"
                                            label="Parent's Phone Number"
                                            type="number"
                                            variant="standard"
                                            fullWidth
                                            onChange={formik.handleChange}
                                            onBlur= {formik.handleBlur}
                                            error= {formik.errors.phone && formik.touched.phone}
                                            helperText= {(formik.errors.phone && formik.touched.phone) && formik.errors.phone}
                                            value={formik.values.phone}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{paddingRight: '25px'}}>
                                        <TextField
                                            margin="dense"
                                            id="email"
                                            name="email"
                                            label="Parent's Email ID"
                                            type="text"
                                            variant="standard"
                                            fullWidth
                                            onChange={formik.handleChange}
                                            onBlur= {formik.handleBlur}
                                            error={formik.errors.email && formik.touched.email}
                                            helperText= {(formik.errors.email && formik.touched.email) && formik.errors.email}
                                            value={formik.values.email}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{paddingRight: '25px'}}>
                                        <TextField
                                            margin="dense"
                                            id=""
                                            name="curaddress"
                                            label="Current Address"
                                            type="text"
                                            variant="standard"
                                            fullWidth
                                            onChange={formik.handleChange}
                                            onBlur= {formik.handleBlur}
                                            error= {formik.errors.curaddress && formik.touched.curaddress}
                                            helperText= {(formik.errors.curaddress && formik.touched.curaddress) && formik.errors.curaddress}
                                            value={formik.values.curaddress}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{paddingRight: '25px'}}>
                                        <TextField
                                            margin="dense"
                                            id=""
                                            name="peraddress"
                                            label="Permenant Address"
                                            type="text"
                                            variant="standard"
                                            fullWidth
                                            onChange={formik.handleChange}
                                            onBlur= {formik.handleBlur}
                                            error= {formik.errors.peraddress && formik.touched.peraddress}
                                            helperText= {(formik.errors.peraddress && formik.touched.peraddress) && formik.errors.peraddress}
                                            value={formik.values.peraddress}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{paddingRight: '25px'}}>
                                        <TextField
                                            margin="dense"
                                            id=""
                                            name="pan"
                                            label="PAN Number"
                                            type="text"
                                            variant="standard"
                                            fullWidth
                                            onChange={formik.handleChange}
                                            onBlur= {formik.handleBlur}
                                            error= {formik.errors.pan && formik.touched.pan}
                                            helperText= {(formik.errors.pan && formik.touched.pan) && formik.errors.pan}
                                            value={formik.values.pan}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{paddingRight: '25px'}}>
                                        <TextField
                                            margin="dense"
                                            id="aadhar"
                                            name="aadhar"
                                            label="Aadhar Number"
                                            type="text"
                                            variant="standard"
                                            fullWidth
                                            onChange={formik.handleChange}
                                            onBlur= {formik.handleBlur}
                                            error= {formik.errors.aadhar && formik.touched.aadhar}
                                            helperText= {(formik.errors.aadhar && formik.touched.aadhar) && formik.errors.aadhar}
                                            value={formik.values.aadhar}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{paddingRight: '25px'}}>
                                        <DatePicker
                                            disableFuture
                                            margin="normal"
                                            id= 'dob'
                                            format="dd/MM/yyyy"
                                            label="Date of Birth"
                                            name= 'dob'
                                            fullWidth
                                            views={["year", "month", "date"]}
                                            onChange={formik.handleChange && handleDateChange}
                                            onBlur= {formik.handleBlur}
                                            error={formik.errors.dob }
                                            helperText= {(formik.errors.dob && formik.touched.dob) && formik.errors.dob}
                                            value={formik.values.dob && selectedDate}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{paddingRight: '25px'}}>
                                        <TextField
                                            margin="dense"
                                            id="select"
                                            name="select"
                                            label="Gender"
                                            select
                                            variant='standard'
                                            fullWidth
                                            onChange={formik.handleChange && handleGender}
                                            onBlur= {formik.handleBlur}
                                            error={formik.errors.select }
                                            helperText= {(formik.errors.select && formik.touched.select) && formik.errors.select}
                                            value={formik.values.select && gender}
                                            InputLabelProps={{shrink: true,}}>
                                                {ranges.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                    </MenuItem>
                                                ))}
                                        </TextField>
                                    </Grid>
                                    </Grid>
                                        {/* <Button className={classes.button} type="submit" color="primary" variant='contained' disabled={formik.isSubmitting}>Save {'&'} Next</Button>         */}


                                    <Typography variant= "h5" className={classes.typography} >Current/Ongoing Course</Typography>
                                    <Divider className={classes.divider} style={{width:'262px'}} />
                                    <Grid container spacing={3} >
                                        <Grid item xs={12} sm={6} >
                                            <TextField
                                                margin="dense"
                                                id="college"
                                                name="college"
                                                label="College Name"
                                                select
                                                variant="standard"
                                                fullWidth
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.college && formik.touched.college}
                                                helperText= {(formik.errors.college && formik.touched.college) && formik.errors.college}
                                                value={formik.values.college}
                                                InputLabelProps={{shrink: true,}}>
                                                    {college.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                        </MenuItem>
                                                    ))}
                                            </TextField>
                                            <TextField
                                                margin="dense"
                                                id="prn"
                                                name="prn"
                                                label="PRN"
                                                type="text"
                                                variant="standard"
                                                fullWidth
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.prn && formik.touched.prn}
                                                helperText= {(formik.errors.prn && formik.touched.prn) && formik.errors.prn}
                                                value={formik.values.prn}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            <TextField
                                                margin="dense"
                                                id="selectdepartment"
                                                name="selectdepartment"
                                                label="Department"
                                                select
                                                variant="standard"
                                                fullWidth
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.selectdepartment && formik.touched.selectdepartment}
                                                helperText= {(formik.errors.selectdepartment && formik.touched.selectdepartment) && formik.errors.selectdepartment}
                                                value={formik.values.selectdepartment}
                                                InputLabelProps={{shrink: true,}}>
                                                    {departments.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                        </MenuItem>
                                                    ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Typography variant= "h5" className={classes.typography}>X Details</Typography>
                                    <Divider className={classes.divider} style={{width:'96px'}} />
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                margin="dense"
                                                id="schooluniversity"
                                                name="schooluniversity"
                                                label="X University / Board"
                                                type="text"
                                                variant="standard"
                                                fullWidth
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.schooluniversity && formik.touched.schooluniversity}
                                                helperText= {(formik.errors.schooluniversity && formik.touched.schooluniversity) && formik.errors.schooluniversity}
                                                value={formik.values.schooluniversity}
                                            />
                                            <DatePicker
                                                disableFuture
                                                label="Year of Passing"
                                                name= 'yearofpassing'
                                                views={["year"]}
                                                fullWidth
                                                onChange={formik.handleChange && handleDateChange }
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.yearofpassing && formik.touched.yearofpassing}
                                                helperText= {(formik.errors.yearofpassing && formik.touched.yearofpassing) && formik.errors.yearofpassing}
                                                value={formik.values.yearofpassing && selectedDate }
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                margin="dense"
                                                id="schoolscore"
                                                name="schoolscore"
                                                label="X Percentage"
                                                type="text"
                                                variant="standard"
                                                fullWidth
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.schoolscore && formik.touched.schoolscore}
                                                helperText= {(formik.errors.schoolscore && formik.touched.schoolscore) && formik.errors.schoolscore}
                                                value={formik.values.schoolscore}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Typography variant= "h5" className={classes.typography} >XII / Diploma Details</Typography>
                                    <Divider className={classes.divider} style={{width:'218px'}} />
                                    <Grid container spacing={3} >
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                margin="dense"
                                                id="selectarea"
                                                name="selectarea"
                                                label="XII / Diploma"
                                                select
                                                variant="standard"
                                                fullWidth
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.selectarea && formik.touched.selectarea}
                                                helperText= {(formik.errors.selectarea && formik.touched.selectarea) && formik.errors.selectarea}
                                                value={formik.values.selectarea}
                                                InputLabelProps={{ shrink: true,}}>
                                                    {after10th.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                        </MenuItem>
                                                    ))}
                                            </TextField>
                                            <TextField
                                                margin="dense"
                                                id="jruniversity"
                                                name="jruniversity"
                                                label="XII University / Board"
                                                type="text"
                                                variant="standard"
                                                fullWidth
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.jruniversity && formik.touched.jruniversity}
                                                helperText= {(formik.errors.jruniversity && formik.touched.jruniversity) && formik.errors.jruniversity}
                                                value={formik.values.jruniversity}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <DatePicker
                                                disableFuture
                                                label="Year of Passing"
                                                name= 'yearofpassing'
                                                views={["year"]}
                                                fullWidth
                                                onChange={formik.handleChange && handleDateChange }
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.jryearofpassing && formik.touched.jryearofpassing}
                                                helperText= {(formik.errors.jryearofpassing && formik.touched.jryearofpassing) && formik.errors.jryearofpassing}
                                                value={formik.values.jryearofpassing && selectedDate}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="jrscore"
                                                name="jrscore"
                                                label="XII Percentage"
                                                type="text"
                                                variant="standard"
                                                fullWidth
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.jrscore && formik.touched.jrscore}
                                                helperText= {(formik.errors.jrscore && formik.touched.jrscore) && formik.errors.jrscore}
                                                value={formik.values.jrscore}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Typography variant= "h5" className={classes.typography} >Engg. Details</Typography>
                                    <Divider className={classes.divider} style={{width:'144px'}} />
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                margin="dense"
                                                id="sem1"
                                                name="sem1"
                                                label="Semester 1 SGPA"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.sem1 && formik.touched.sem1}
                                                helperText= {(formik.errors.sem1 && formik.touched.sem1) && formik.errors.sem1}
                                                value={formik.values.sem1}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="sem2"
                                                name="sem2"
                                                label="Semester 2 SGPA"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.sem2 && formik.touched.sem2}
                                                helperText= {(formik.errors.sem2 && formik.touched.sem2) && formik.errors.sem2}
                                                value={formik.values.sem2}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="sem3"
                                                name="sem3"
                                                label="Semester 3 SGPA"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.sem3 && formik.touched.sem3}
                                                helperText= {(formik.errors.sem3 && formik.touched.sem3) && formik.errors.sem3}
                                                value={formik.values.sem3}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="sem4"
                                                name="sem4"
                                                label="Semester 4 SGPA"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.sem4 && formik.touched.sem4}
                                                helperText= {(formik.errors.sem4 && formik.touched.sem4) && formik.errors.sem4}
                                                value={formik.values.sem4}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="sem5"
                                                name="sem5"
                                                label="Semester 5 SGPA"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.sem5 && formik.touched.sem5}
                                                helperText= {(formik.errors.sem5 && formik.touched.sem5) && formik.errors.sem5}
                                                value={formik.values.sem5}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="sem6"
                                                name="sem6"
                                                label="Semester 6 SGPA"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.sem6 && formik.touched.sem6}
                                                helperText= {(formik.errors.sem6 && formik.touched.sem6) && formik.errors.sem6}
                                                value={formik.values.sem6}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="sem7"
                                                name="sem7"
                                                label="Semester 7 SGPA"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.sem7 && formik.touched.sem7}
                                                helperText= {(formik.errors.sem7 && formik.touched.sem7) && formik.errors.sem7}
                                                value={formik.values.sem7}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="sem8"
                                                name="sem8"
                                                label="Semester 8 SGPA"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.sem8 && formik.touched.sem8}
                                                helperText= {(formik.errors.sem8 && formik.touched.sem8) && formik.errors.sem8}
                                                value={formik.values.sem8}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="aggregate"
                                                name="aggregate"
                                                label="Engg. Aggregate CGPA"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.aggregate && formik.touched.aggregate}
                                                helperText= {(formik.errors.aggregate && formik.touched.aggregate) && formik.errors.aggregate}
                                                value={formik.values.aggregate}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                margin="dense"
                                                id="sem1percent"
                                                name="sem1percent"
                                                label="Semester 1 Percentage"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.sem1percent && formik.touched.sem1percent}
                                                helperText= {(formik.errors.sem1percent && formik.touched.sem1percent) && formik.errors.sem1percent}
                                                value={formik.values.sem1percent}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="sem2percent"
                                                name="sem2percent"
                                                label="Semester 1 Percentage"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.sem2percent && formik.touched.sem2percent}
                                                helperText= {(formik.errors.sem2percent && formik.touched.sem2percent) && formik.errors.sem2percent}
                                                value={formik.values.sem2percent}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="sem3percent"
                                                name="sem3percent"
                                                label="Semester 3 Percentage"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.sem3percent && formik.touched.sem3percent}
                                                helperText= {(formik.errors.sem3percent && formik.touched.sem3percent) && formik.errors.sem3percent}
                                                value={formik.values.sem3percent}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="sem4percent"
                                                name="sem4percent"
                                                label="Semester 4 Percentage"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.sem4percent && formik.touched.sem4percent}
                                                helperText= {(formik.errors.sem4percent && formik.touched.sem4percent) && formik.errors.sem4percent}
                                                value={formik.values.sem4percent}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="sem5percent"
                                                name="sem5percent"
                                                label="Semester 5 Percentage"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.sem5percent && formik.touched.sem5percent}
                                                helperText= {(formik.errors.sem5percent && formik.touched.sem5percent) && formik.errors.sem5percent}
                                                value={formik.values.sem5percent}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="sem6percent"
                                                name="sem6percent"
                                                label="Semester 6 Percentage"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.sem6percent && formik.touched.sem6percent}
                                                helperText= {(formik.errors.sem6percent && formik.touched.sem6percent) && formik.errors.sem6percent}
                                                value={formik.values.sem6percent}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="sem7percent"
                                                name="sem7percent"
                                                label="Semester 7 Percentage"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.sem7percent && formik.touched.sem7percent}
                                                helperText= {(formik.errors.sem7percent && formik.touched.sem7percent) && formik.errors.sem7percent}
                                                value={formik.values.sem7percent}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="sem8percent"
                                                name="sem8percent"
                                                label="Semester 8 Percentage"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.sem8percent && formik.touched.sem8percent}
                                                helperText= {(formik.errors.sem8percent && formik.touched.sem8percent) && formik.errors.sem8percent}
                                                value={formik.values.sem8percent}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="peraggregate"
                                                name="peraggregate"
                                                label="Engg. Aggregate Percentage"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.peraggregate && formik.touched.peraggregate}
                                                helperText= {(formik.errors.peraggregate && formik.touched.peraggregate) && formik.errors.peraggregate}
                                                value={formik.values.peraggregate}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Typography variant= "h5" className={classes.typography} >Extra Details</Typography>
                                    <Divider className={classes.divider} style={{width:'140px'}} />
                                    <Grid container spacing={3} >
                                        <Grid item xs={12} sm={6} >
                                            <TextField
                                                margin="dense"
                                                id="liveback"
                                                name="liveback"
                                                label="No. Of Live Backlogs"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.liveback && formik.touched.liveback}
                                                helperText= {(formik.errors.liveback && formik.touched.liveback) && formik.errors.liveback}
                                                value={formik.values.liveback}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="deadback"
                                                name="deadback"
                                                label="No. Of Dead Backlogs"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.deadback && formik.touched.deadback}
                                                helperText= {(formik.errors.deadback && formik.touched.deadback) && formik.errors.deadback}
                                                value={formik.values.deadback}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            <TextField
                                                margin="dense"
                                                id="educationalgap"
                                                name="educationalgap"
                                                label="Educational Gap"
                                                type="number"
                                                variant="standard"
                                                fullWidth
                                                onChange={formik.handleChange}
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.educationalgap && formik.touched.educationalgap}
                                                helperText= {(formik.errors.educationalgap && formik.touched.educationalgap) && formik.errors.educationalgap}
                                                value={formik.values.educationalgap}
                                            />
                                            <FormControlLabel style={{alignItems: 'center'}}
                                                control={<Checkbox  color='default' onChange={formik.handleChange} name="placed" />}
                                                label="Placed"
                                                onBlur= {formik.handleBlur}
                                                error={formik.errors.placed && formik.touched.placed}
                                                value={formik.values.placed}
                                            />
                                        </Grid>
                                    </Grid> 
                                    <Button className={classes.button} type="submit" color="primary" variant='contained' disabled={formik.isSubmitting}>Submit</Button>
                                    </Box>
                                </form>
                            </Grid> 
                            <Grid item xs={false} sm={1} />
                            </Grid>
                    </div>
                    </React.Fragment>
				}
                </Box>
            </MuiPickersUtilsProvider>
        </div>
    )
}