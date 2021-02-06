import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from '../../../components/useForm';
import PropTypes from 'prop-types';
import { Typography, MenuItem } from '@material-ui/core';
import { AllBranches, top100Films } from '../data';
import Autocomplete from '@material-ui/lab/Autocomplete';
import StudentService from '../../../services/studentService';
import EmployeeService from '../../../services/EmployeeServices';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker, DateTimePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';
import { Autocomplete as MaterialUiAutocomplete } from "@material-ui/lab";
import { TextField as MaterialUiTextField } from "@material-ui/core";

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

function debounce(func, wait) {
  let timeout;
  return function (...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args);
      }, wait);
  };
}


const dateformat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

 const initialFValues = {
   id: 0,
//   eligible_branches: [{branch:""}],
//   company: [{id:"",name:"",website:"", industry:""}],
//   isDeleted: false,
   jobtitle: "",
//   date: "",
//   login_time: 30,
//   drive_location: "",
//   min_salary:"",
//   max_salary:"",
//   tenth:60.0,
//   twelth:60.0,
//   diploma:60.0,
//   live_backlog:0,
//   dead_backlog:0,
//   drive_type:"",
//   rounds:[{name:"",number:"", description:"",students:[]}],
//   assigned_coordinators:[{id:"",first_name:"",last_name:""}],
//   assigned_volunteers:[{id:"",user: [{first_name:"",last_name:""}]}]
 }

const initialDValues = {
  date: ""
}
export default function ProfileDetails(props) {

  const { addOrEdit, recordForEdit } = props

  const [volunteers, setVolunteers] = useState([]);

  const [values, setValues] = useState({
    id: 0,
    eligible_branches: [{branch:""}],
    company: [{id:"",name:"",website:"", industry:""}],
    isDeleted: false,
    jobtitle: '',
    //date: new Date(),
    login_time: 0,
    drive_location: '',
    min_salary: 0,
    max_salary: 0,
    tenth: 60.0,
    twelth: 60.0,
    diploma: 60.0,
    engineering: 60.0,
    live_backlog: 0,
    dead_backlog: 0,
    educational_gap: 0,
    year_down: 0,
    drive_type: 'ON',
    rounds:[{name:"", number: 1, description:"",students:[]}],
    assigned_coordinators:[{id:"",first_name:"",last_name:""}],
    assigned_volunteers:[{id:"",user: [{first_name:"",last_name:""}]}],
  });

  const [datevalues, setDatevalues] = useState({
    date: ""
  })
  

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    setErrors({
      ...temp
    })

    if (fieldValues === values)
      return Object.values(temp).every(x => x === "")
  }
  const {
    errors,
    setErrors,
    resetForm
  } = useForm(initialFValues, validate, initialDValues ,true);

  const handleChange = (event) => {
    console.log("event value: ",event.target.value)
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handDateChange = (event) => {
    console.log("date event", new Date(event).toISOString())
    setDatevalues(new Date(event).toISOString())
  }
  const handleSubmit = e => {
    e.preventDefault()
    //values.date = new Date(selectedDate).toISOString();
    if (validate()) {
      const data = {
        "id": values.id,
        
        "jobtitle": values.jobtitle,
        "login_time": values.login_time,
        "drive_location": values.drive_location,
        "min_salary": values.min_salary,
        "max_salary": values.max_salary,
        "tenth": values.tenth,
        "twelth": values.twelth,
        "diploma": values.diploma,
        "engineering": values.engineering,
        "educational_gap": values.educational_gap,
        "year_down": values.year_down,
        "live_backlog": values.live_backlog,
        "dead_backlog": values.dead_backlog,
        "company": values.company,
        
        "date": datevalues,
        "eligible_branches": values.eligible_branches,
        "drive_type": values.drive_type,
        "employment_type": values.employment_type,
        "rounds": values.rounds,
        "assigned_coordinators": values.assigned_coordinators,
        "assigned_volunteers": values.assigned_volunteers,
      }

      addOrEdit(values, resetForm);
      // axios.patch("https://tnpvision-cors.herokuapp.com/http://20.37.50.140:8000/api/drive/" + values.id+"/", data)
      //   .then(res =>{
      //     console.log("res", res);
      //   }).catch(error => {
      //     console.log(error);
          
      //   });

        console.log("updated values",data)
    }
  }

  
  useEffect(() => {

    if (recordForEdit != null) {
      
      console.log("record to be edited", recordForEdit.assigned_volunteers);
      
      setVolunteers(values.assigned_volunteers)
      
      setDatevalues({
        ...datevalues,
        "date": recordForEdit.date,
      })
      
      setValues({
        ...values,
        "id": recordForEdit.id,
        "jobtitle": recordForEdit.jobtitle,
        "login_time": recordForEdit.login_time,
        "drive_location": recordForEdit.drive_location,
        "min_salary": recordForEdit.min_salary,
        "max_salary": recordForEdit.max_salary,
        "tenth": recordForEdit.tenth,
        "twelth": recordForEdit.twelth,
        "diploma": recordForEdit.diploma,
        "engineering": recordForEdit.engineering,
        "educational_gap": recordForEdit.educational_gap,
        "year_down": recordForEdit.year_down,
        "live_backlog": recordForEdit.live_backlog,
        "dead_backlog": recordForEdit.dead_backlog,
        "company": recordForEdit.company,
        "eligible_branches": recordForEdit.eligible_branches,
        "date": recordForEdit.date,
        "drive_type": recordForEdit.drive_type,
        "employment_type": recordForEdit.employment_type, 
        "rounds": recordForEdit.rounds,
        "assigned_coordinators": recordForEdit.assigned_coordinators,
        "assigned_volunteers": recordForEdit.assigned_volunteers,
      });
       //console.log("IN Detaisl values: ", values);
       //console.log("IN Detaisl record: ", recordForEdit);
    }
  }, [recordForEdit])

  //---------------------------------------------------Volunteers Search--------------------------------------------------------------------------
  const [options1, setOptions1] = useState([]);
  const [open1, setOpen1] = React.useState(false);
  const loading1 = open1 && options1.length === 0;
  const [volunteers1, setVolunteers1] = useState([]);
  const [inputValue1, setInputValue1] = useState("");
  const [inputSearch1, setInputSearch1] = useState("");
  const debounceOnChange = React.useCallback(
      debounce(value => {
          setInputSearch1(value);
      }, 400),
      []
  );

  function handleChange1(value) {
      setInputValue1(value);
      debounceOnChange(value);
  }
  const AllVolunteers = []
  function handleResult1() {
      for (let i = 0; i < volunteers1.length; i++) {
          const item = volunteers1[i].id;
          AllVolunteers[i] = item;
      }
      //console.log("All Volunteers: ",AllVolunteers)
  }
  useEffect(() => {
      let active1 = true;
      (async () => {
          const response = await axios.get(
              "http://20.37.50.140:8000/api/volunteer/search/?q=" + inputValue1
          );

          if (active1) {
              setOptions1(response.data);
          }
      })();
  }, [inputSearch1]);

  //------------------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Drive Details"
        />
        <Divider />
        <CardContent>
        <Typography variant="h6">Drive ID: {values.id}</Typography><br/><br/>

        <Grid
          item
          md={6}
          xs={12}
        >
        <MaterialUiAutocomplete
          multiple
          filterSelectedOptions
          options={options1}
          getOptionLabel={option => option.first_name + " " + option.last_name}
          values={volunteers}
          open={open1}
          onOpen={() => {
              setOpen1(true);
          }}
          onClose={() => {
              setOpen1(false);
              handleChange1('');
          }}
          autoComplete
          loading={loading1}
          inputValue={inputValue1}
          includeInputInList
          //disableOpenOnFocus
          onChange={(event, newValue) => { setVolunteers1(newValue) }}
          onSelect={handleResult1}
          renderInput={params => (
              <MaterialUiTextField
                  {...params}
                  label="Search Volunteer"
                  variant="outlined"
                  onChange={event => handleChange1(event.target.value)}
                  fullWidth
              />
          )}
          renderOption={option => {
              return <div>{option.first_name + " " + option.last_name}</div>;
          }}
      />
      <br/><br/>
      </Grid>













          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <Autocomplete
                multiple
                options={AllBranches}
                getOptionLabel={(option) => option.branch}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Eligible Branches" variant="outlined" />}
                value={values.eligible_branches}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the Company"
                label="Company"
                name="company"
                onChange={handleChange}
                required
                value={values.company.name}
                variant="outlined"
              />
            </Grid>
            
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the Drive Date"
                //label="Date"
                name="date"
                type="datetime-local"
                onChange={handDateChange}
                required
                //value={moment (new Date(values.date)).format("DD/MM/YYYY hh:mm a")}
                defaultValue={datevalues.date}
                variant="outlined"
              />
            </Grid> */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid 
                item
                md={6}
                xs={12}
              >
                <KeyboardDateTimePicker
                  //name="date"
                  inputVariant="outlined"
                  format="yyyy/MM/dd HH:mm"
                  value={datevalues.date}
                  onChange={handDateChange}  
                />
              </Grid>
              </MuiPickersUtilsProvider>
              <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the Job Title"
                label="Job Title"
                name="jobtitle"
                onChange={handleChange}
                required
                value={values.jobtitle}
                variant="outlined"
              />
            </Grid> 
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the Login Time"
                label="Login Time"
                name="login_time"
                onChange={handleChange}
                required
                value={values.login_time}
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the Drive Location"
                label="Drive Location"
                name="drive_location"
                onChange={handleChange}
                required
                value={values.drive_location}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the Minimum Salary"
                label="Minimum Salary"
                name="min_salary"
                onChange={handleChange}
                required
                value={values.min_salary}
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the Maximum Salary"
                label="Maximum Salary"
                name="max_salary"
                onChange={handleChange}
                required
                value={values.max_salary}
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the Tenth Percentage Criteria"
                label="Tenth Percentage Criteria"
                name="tenth"
                onChange={handleChange}
                required
                value={values.tenth}
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the Twelth Percentage Criteria"
                label="Twelth Percentage Criteria"
                name="twelth"
                onChange={handleChange}
                required
                value={values.twelth}
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the Diploma Percentage Criteria"
                label="Diploma Percentage Criteria"
                name="diploma"
                onChange={handleChange}
                required
                value={values.diploma}
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the Engineering Percentage Criteria"
                label="Engineering Percentage Criteria"
                name="engineering"
                onChange={handleChange}
                required
                value={values.engineering}
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the Educational Gap Criteria"
                label="Educational Gap Criteria"
                name="educational_gap"
                onChange={handleChange}
                required
                value={values.educational_gap}
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the Year Down Criteria"
                label="Year Down Criteria"
                name="year_down"
                onChange={handleChange}
                required
                value={values.year_down}
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the Live Backlog Criteria"
                label="Live Backlog Criteria"
                name="live_backlog"
                onChange={handleChange}
                required
                value={values.live_backlog}
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the Dead Backlog Criteria"
                label="Dead Backlog Criteria"
                name="dead_backlog"
                onChange={handleChange}
                required
                value={values.dead_backlog}
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the Drive Type"
                label="Drive Type"
                name="drive_type"
                onChange={handleChange}
                required
                value={values.drive_type}
                variant="outlined"
                select
              >
              {driveType.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
              ))}
              </TextField>
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Employment Type"
                name="employee_type"
                onChange={handleChange}
                required
                value={values.employee_type}
                variant="outlined"
                select
              >
              {employee_type.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
              ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
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
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};
