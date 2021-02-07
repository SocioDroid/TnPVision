import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from '../../../components/useForm';
import PropTypes from 'prop-types';
import { Typography, MenuItem, Avatar } from '@material-ui/core';
import { AllBranches } from '../data';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker} from '@material-ui/pickers';
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
import { Formik, Form, Field, FieldArray } from 'formik';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

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



//const dateformat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

 const initialFValues = {
    id: 0,
    eligible_branches: [{branch:""}],
    company: [{id:"",name:"",website:"", industry:""}],
    isDeleted: false,
    jobtitle: "",
    date: "",
    login_time: 30,
    drive_location: "",
    min_salary:"",
    max_salary:"",
    tenth:60.0,
    twelth:60.0,
    diploma:60.0,
    live_backlog:0,
    dead_backlog:0,
    drive_type:"",
    rounds:[{name:"",number:"", description:""}],
 }

const initialDValues = {
  date: ""
}
export default function ProfileDetails(props) {

  const { addOrEdit, recordForEdit } = props

  //--------------------------------------------------------------Company------------------------------------------------------------------------------------
  const [inputValue, setInputValue] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [open, setOpen] = React.useState(false);
  const loading = open && options.length === 0;
  const [company3, setCompany3] = useState({});

  const debounceOnChange = React.useCallback(
    debounce(value => {
      setInputSearch(value);
    }, 400),
    []
  );
  
  function handleCompanyChange(comp) {
    setInputValue(comp);
    debounceOnChange(comp);
  }
  var AllComapnies = ''
  function handleResult() {
      AllComapnies = company3.id;
  }
  useEffect(() => {
    let active = true;

    (async () => {
      const response = await axios.get(
        "http://20.37.50.140:8000/api/company/search/?q="+inputValue
      );

      if (active) {
        console.log(response.data);
        setOptions(response.data);
      }
    })();
  }, [inputSearch]);

  // const opt = {
  //   id:1,
  //   website:"www.test.com",
  //   industry:"test",
  //   name:"TestCompany"
  // }
  // const [companyarray, setCompanyarray] = React.useState(opt);
  const [companyvalue, setCompanyvalue] = useState({id:'0',website:'www.test2.com',industry:'test2',name:'TestCompany2'});
  
  //---------------------------------------------------Eligible Branches-----------------------------------------------------------------------------------------------

  const [eligibleBranches, setEligiblebranches] = useState([{}]);
  const fixedOptions = [];
  const [branchvalue, setBranchvalue] = useState([]);
  
  //------------------------------------------------------Date----------------------------------------------------------------------------------------------------------
  const [datevalues, setDatevalues] = useState({
    date: ""
  })

  const handDateChange = (event) => {
    console.log("date event", new Date(event).toISOString())
    setDatevalues({date: event})
  }

  // //------------------------------------------------------Values-------------------------------------------------------------------------------------------------------------
  
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
    employment_type: 'Internship',
    rounds:[{name:"", number: 1, description:"",students:[]}],
  });
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

  //--------------------------------------------------------general----------------------------------------------------------------------------------------------------------
  const handleSubmit = e => {
    e.preventDefault()
    //console.log(company3)
    //console.log("branch:", eligibleBranches)
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
        "eligible_branches": branchvalue,
        "drive_type": values.drive_type,
        "employment_type": values.employment_type,
        "company": company3.id ? company3.id : values.company.id,
        "date": new Date(datevalues.date).toISOString(),

        //"rounds": values.rounds,
      }

      addOrEdit(values, resetForm);
      axios.patch("http://20.37.50.140:8000/api/drive/" + values.id+"/", data)
        .then(res =>{
          console.log("res", res);
        }).catch(error => {
          console.log(error);
        });

        console.log("updated values",data)
    }
  }
  useEffect(() => {

    if (recordForEdit != null) {
      
      console.log("record to be edited", recordForEdit.rounds);
      
      setDatevalues({
        ...datevalues,
        "date": recordForEdit.date,
      })
      
      setEligiblebranches({
        ...eligibleBranches,
        "branch": recordForEdit.eligible_branches
      })

      setBranchvalue(recordForEdit.eligible_branches)
      setCompanyvalue(recordForEdit.company)
      
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
    }
  }, [recordForEdit])

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
            container
            spacing={3}
          >    
         
            <Grid
              item
              md={6}
              xs={12}
            >

            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid 
                item
                md={6}
                xs={12}
              >
                <KeyboardDateTimePicker
                  inputVariant="outlined"
                  format="yyyy/MM/dd HH:mm"
                  value={datevalues.date}
                  onChange={handDateChange} 
                />
              </Grid>
              </MuiPickersUtilsProvider>

             

{/*=====================================================Everything works fine below this========================================================= */}
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
                value={branchvalue}
                onChange={(event, newValue) => {
                  setBranchvalue([
                    //...fixedOptions,
                    ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
                  ]); 
                }}
              />
            </Grid>
            <Grid 
             item
             md={6}
             xs={12}
             >
                <Autocomplete
                  options={options}
                  value={companyvalue}
                  getOptionLabel={option => option.name}
                  open={open}
                  onOpen={() => {
                    setOpen(true);
                  }}
                  onClose={() => {
                    setOpen(false);
                    handleCompanyChange('');
                  }}
                  loading={loading}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  onChange={(event, newValue) => {console.log("selected value", newValue);
                                                  setCompanyvalue(newValue);
                                                  setCompany3(newValue);                                      
                                                }}
                  fullWidth
                  renderInput={(params) => 
                    <TextField
                      {...params} 
                      label="Search Company"
                      variant="outlined"
                      onChange={event => handleCompanyChange(event.target.value)}
                      fullWidth
                      inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password',
                      }}
                    />
                  }
                  renderOption={option => {
                    return <div>{option.name}</div>;
                  }}
                />
             </Grid>
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
                name="employment_type"
                onChange={handleChange}
                required
                value={values.employment_type}
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
