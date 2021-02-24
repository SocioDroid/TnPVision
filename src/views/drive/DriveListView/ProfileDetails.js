import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from '../../../components/useForm';
import PropTypes from 'prop-types';
import { Typography, MenuItem, Avatar } from '@material-ui/core';
import { AllBranches } from '../data';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
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
import CustomSnackbar from '../../../components/Snackbar/CustomSnackbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import CompanyService from '../../../services/CompanyService';

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
    label: 'ON Campus'
  },
  {
    value: 'OFF',
    label: 'OFF Campus'
  },
  {
    value: 'POOL',
    label: 'Pool Campus'
  }
];

const employee_type = [
  {
    value: 'Full Time',
    label: 'Full Time'
  },
  {
    value: 'Internship',
    label: 'Internship'
  }
];

//const dateformat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const initialFValues = {
  id: 0,
  eligible_branches: [{ branch: '' }],
  company: [{ id: '', name: '', website: '', industry: '' }],
  isDeleted: false,
  jobtitle: '',
  date: '',
  login_time: 30,
  drive_location: '',
  min_salary: '',
  max_salary: '',
  tenth: 60.0,
  twelth: 60.0,
  diploma: 60.0,
  live_backlog: 0,
  dead_backlog: 0,
  drive_type: '',
  rounds: [{ name: '', number: '', description: '' }]
};

const initialDValues = {
  date: ''
};
export default function ProfileDetails(props) {
  const { addOrEdit, recordForEdit } = props;

  //--------------------------------------------------------------Company------------------------------------------------------------------------------------
  const [inputValue, setInputValue] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [options, setOptions] = useState([]);
  const [open, setOpen] = React.useState(false);
  const loading = open && options.length === 0;
  const [company3, setCompany3] = useState({});
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [salaryHideChange, setSalaryHideChange] = useState(false);

  const handleSalaryHideChange = event => {
    setSalaryHideChange(!salaryHideChange);
  };
  const changeError = () => {
    setIsError(!isError);
  };
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
  useEffect(() => {
    let active = true;

    (async () => {
      const response = await CompanyService.searchCompany(inputValue)
      if (active) {
        console.log(response.data);
        setOptions(response.data);
      }
    })();
  }, [inputSearch]);

  const [companyvalue, setCompanyvalue] = useState({
    id: '0',
    website: 'www.test2.com',
    industry: 'test2',
    name: 'TestCompany2'
  });

  //---------------------------------------------------Eligible Branches-----------------------------------------------------------------------------------------------

  const [eligibleBranches, setEligiblebranches] = useState([{}]);
  const fixedOptions = [];
  const [branchvalue, setBranchvalue] = useState([]);

  //------------------------------------------------------Rounds-------------------------------------------------------------------------------------------------------
  const [roundDetails, setRoundDetails] = useState([
    { number: '', name: '', description: '' }
  ]);

  const handleRoundChange = (event, roundNumber) => {
    let newArr = [...roundDetails]; // copying the old datas array
    let item = newArr[roundNumber];
    item = { ...item, [event.target.name]: event.target.value };
    newArr[roundNumber] = item;
    setRoundDetails(newArr);
  };
  //------------------------------------------------------Date----------------------------------------------------------------------------------------------------------
  const [datevalues, setDatevalues] = useState({
    date: ''
  });

  const handDateChange = event => {
    console.log('date event', new Date(event).toISOString());
    setDatevalues({ date: event });
  };

  // //------------------------------------------------------Values-------------------------------------------------------------------------------------------------------------

  const [values, setValues] = useState({
    id: 0,
    eligible_branches: [{ branch: '' }],
    company: [{ id: '', name: '', website: '', industry: '' }],
    isDeleted: false,
    jobtitle: '',
    //date: new Date(),
    login_time: 0,
    drive_location: '',
    min_salary: 0,
    max_salary: 0,
    hideSalary: false,
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
    rounds: [{ name: '', number: 1, description: '', students: [] }]
  });

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('login_time' in fieldValues)
      temp.login_time = /^[0-9\b]+$/.test(fieldValues.login_time)
        ? ''
        : 'Login Time is not valid.';
    if ('min_salary' in fieldValues)
      temp.min_salary = /^[0-9\b]+$/.test(fieldValues.min_salary)
        ? ''
        : 'Login Time is not valid.';
    if ('max_salary' in fieldValues)
      temp.max_salary = /^[0-9\b]+$/.test(fieldValues.max_salary)
        ? ''
        : 'Login Time is not valid.';
    if ('tenth' in fieldValues)
      temp.tenth = /^[0-9\b]+$/.test(fieldValues.tenth)
        ? ''
        : 'Login Time is not valid.';
    if ('twelth' in fieldValues)
      temp.twelth = /^[0-9\b]+$/.test(fieldValues.twelth)
        ? ''
        : 'Login Time is not valid.';
    if ('diploma' in fieldValues)
      temp.diploma = /^[0-9\b]+$/.test(fieldValues.diploma)
        ? ''
        : 'Login Time is not valid.';
    if ('engineering' in fieldValues)
      temp.engineering = /^[0-9\b]+$/.test(fieldValues.engineering)
        ? ''
        : 'Login Time is not valid.';
    if ('educational_gap' in fieldValues)
      temp.educational_gap = /^[0-9\b]+$/.test(fieldValues.educational_gap)
        ? ''
        : 'Login Time is not valid.';
    if ('year_down' in fieldValues)
      temp.year_down = /^[0-9\b]+$/.test(fieldValues.year_down)
        ? ''
        : 'Login Time is not valid.';
    if ('live_backlog' in fieldValues)
      temp.login_time = /^[0-9\b]+$/.test(fieldValues.login_time)
        ? ''
        : 'Login Time is not valid.';
    if ('dead_backlog' in fieldValues)
      temp.login_time = /^[0-9\b]+$/.test(fieldValues.login_time)
        ? ''
        : 'Login Time is not valid.';

    setErrors({
      ...temp
    });

    if (fieldValues === values) return Object.values(temp).every(x => x === '');
  };
  const { errors, setErrors, resetForm } = useForm(
    initialFValues,
    true,
    validate,
    initialDValues
  );

  const handleChange = event => {
    console.log('event value: ', event.target.value);
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  //--------------------------------------------------------general----------------------------------------------------------------------------------------------------------
  const handleSubmit = e => {
    e.preventDefault();
    //console.log(company3)
    //console.log("branch:", eligibleBranches)
    //values.date = new Date(selectedDate).toISOString();
    if (validate()) {
      const data = {
        id: values.id,
        jobtitle: values.jobtitle,
        login_time: values.login_time,
        drive_location: values.drive_location,
        min_salary: values.min_salary,
        max_salary: values.max_salary,
        hideSalary: salaryHideChange,
        tenth: values.tenth,
        twelth: values.twelth,
        diploma: values.diploma,
        engineering: values.engineering,
        educational_gap: values.educational_gap,
        year_down: values.year_down,
        live_backlog: values.live_backlog,
        dead_backlog: values.dead_backlog,
        eligible_branches: branchvalue,
        drive_type: values.drive_type,
        employment_type: values.employment_type,
        company: company3.id ? company3.id : values.company.id,
        date: new Date(datevalues.date).toISOString(),
        rounds: roundDetails
      };

      
      axios
      .patch('http://20.37.50.140:8000/api/drive/' + values.id + '/', data)
      .then(res => {
          console.log('res', res);
          addOrEdit(values, resetForm);
          alert('Drive Updated Sucessfully');
          // setTimeout(window.location.reload(false), 5000);
        })
        .catch(error => {
          const data = error.response.data
            ? JSON.stringify(error.response.data)
            : 'Error!';
          const statuscode = error.response.status;

          switch (statuscode) {
            case 400:
              console.log(data);
              setErrorMessage(data);
              console.log('400 ERRORRR');
              break;
            case 401:
              setErrorMessage(
                'Unauthenticated ! Please login to continue ' + data
              );
              console.log('401 ERRORRR');
              navigate('/login', { replace: true });
              break;
            case 403:
              console.log('403 error! ' + data);
              setErrorMessage('403 Error. Please try again ' + data);
              break;
            case 500:
              console.log('500 ERROR ' + data);
              setErrorMessage('Server Error. Please try again ' + data);
              break;
            default:
              console.log('Navin Error ' + data);
              setErrorMessage('New Error, add it to catch block ' + data);
          }
          setIsError(true);
        });

      console.log('updated values', data);
    }
  };
  useEffect(() => {
    if (recordForEdit != null) {
      console.log('record to be edited', recordForEdit.rounds);

      setDatevalues({
        ...datevalues,
        date: recordForEdit.date
      });

      setEligiblebranches({
        ...eligibleBranches,
        branch: recordForEdit.eligible_branches
      });
      setRoundDetails([
        // ...roundschange,
        ...recordForEdit.rounds
      ]);

      setBranchvalue(recordForEdit.eligible_branches);
      setCompanyvalue(recordForEdit.company);
      setSalaryHideChange(recordForEdit.hideSalary);
      setValues({
        ...values,
        id: recordForEdit.id,
        jobtitle: recordForEdit.jobtitle,
        login_time: recordForEdit.login_time,
        drive_location: recordForEdit.drive_location,
        min_salary: recordForEdit.min_salary,
        max_salary: recordForEdit.max_salary,
        tenth: recordForEdit.tenth,
        twelth: recordForEdit.twelth,
        diploma: recordForEdit.diploma,
        engineering: recordForEdit.engineering,
        educational_gap: recordForEdit.educational_gap,
        year_down: recordForEdit.year_down,
        live_backlog: recordForEdit.live_backlog,
        dead_backlog: recordForEdit.dead_backlog,
        hideSalary: recordForEdit.hideSalary,
        company: recordForEdit.company,
        eligible_branches: recordForEdit.eligible_branches,
        date: recordForEdit.date,
        drive_type: recordForEdit.drive_type,
        employment_type: recordForEdit.employment_type,
        rounds: recordForEdit.rounds,
        assigned_coordinators: recordForEdit.assigned_coordinators,
        assigned_volunteers: recordForEdit.assigned_volunteers
      });
    }
  }, [recordForEdit]);

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off" noValidate>
        <Card>
          <CardHeader
            subheader="The information can be edited"
            title="Drive Details"
          />
          <Divider />
          <CardContent>
            <Typography variant="h6">Drive ID: {values.id}</Typography>
            <br />
            <br />

            <Grid container spacing={3}>
              {/*=====================================================Everything works fine below this========================================================= */}

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="jobtitle"
                  onChange={handleChange}
                  required
                  value={values.jobtitle}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
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
                  onChange={(event, newValue) => {
                    console.log('selected value', newValue);
                    setCompanyvalue(newValue);
                    setCompany3(newValue);
                  }}
                  fullWidth
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Search Company"
                      variant="outlined"
                      onChange={event =>
                        handleCompanyChange(event.target.value)
                      }
                      fullWidth
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password'
                      }}
                    />
                  )}
                  renderOption={option => {
                    return <div>{option.name}</div>;
                  }}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  error={errors.login_time}
                  label="Login Time"
                  name="login_time"
                  onChange={handleChange}
                  required
                  value={values.login_time}
                  variant="outlined"
                  type="number"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Drive Location"
                  name="drive_location"
                  onChange={handleChange}
                  required
                  value={values.drive_location}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
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
                  {driveType.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
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
                  {employee_type.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  error={errors.min_salary}
                  label="Minimum Salary"
                  name="min_salary"
                  onChange={handleChange}
                  required
                  value={values.min_salary}
                  variant="outlined"
                  type="number"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  fullWidth
                  error={errors.max_salary}
                  label="Maximum Salary"
                  name="max_salary"
                  onChange={handleChange}
                  required
                  value={values.max_salary}
                  variant="outlined"
                  type="number"
                />
              </Grid>
              <Grid item xs={2}>
                <Box>
                  <Tooltip title="Students won't be able to see salary details">
                    <FormControlLabel
                      size="small"
                      value="top"
                      control={
                        <Switch
                          color="primary"
                          checked={salaryHideChange}
                          onChange={handleSalaryHideChange}
                        />
                      }
                      label="Hide salary details"
                      labelPlacement="end"
                    />
                  </Tooltip>
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  error={errors.tenth}
                  label="Tenth Percentage Criteria"
                  name="tenth"
                  onChange={handleChange}
                  required
                  value={values.tenth}
                  variant="outlined"
                  type="number"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  error={errors.twelth}
                  label="Twelth Percentage Criteria"
                  name="twelth"
                  onChange={handleChange}
                  required
                  value={values.twelth}
                  variant="outlined"
                  type="number"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  error={errors.diploma}
                  label="Diploma Percentage Criteria"
                  name="diploma"
                  onChange={handleChange}
                  required
                  value={values.diploma}
                  variant="outlined"
                  type="number"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  error={errors.engineering}
                  label="Engineering Percentage Criteria"
                  name="engineering"
                  onChange={handleChange}
                  required
                  value={values.engineering}
                  variant="outlined"
                  type="number"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  error={errors.educational_gap}
                  label="Educational Gap Criteria"
                  name="educational_gap"
                  onChange={handleChange}
                  required
                  value={values.educational_gap}
                  variant="outlined"
                  type="number"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  error={errors.year_down}
                  fullWidth
                  label="Year Down Criteria"
                  name="year_down"
                  onChange={handleChange}
                  required
                  value={values.year_down}
                  variant="outlined"
                  type="number"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  error={errors.live_backlog}
                  label="Live Backlog Criteria"
                  name="live_backlog"
                  onChange={handleChange}
                  required
                  value={values.live_backlog}
                  variant="outlined"
                  type="number"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  error={errors.dead_backlog}
                  label="Dead Backlog Criteria"
                  name="dead_backlog"
                  onChange={handleChange}
                  required
                  value={values.dead_backlog}
                  variant="outlined"
                  type="number"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Autocomplete
                  multiple
                  options={AllBranches}
                  getOptionLabel={option => option.branch}
                  fullWidth
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Eligible Branches"
                      variant="outlined"
                    />
                  )}
                  value={branchvalue}
                  onChange={(event, newValue) => {
                    setBranchvalue([
                      //...fixedOptions,
                      ...newValue.filter(
                        option => fixedOptions.indexOf(option) === -1
                      )
                    ]);
                  }}
                />
              </Grid>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item md={6} xs={12}>
                  <KeyboardDateTimePicker
                    fullWidth
                    label="Date of Drive"
                    inputVariant="outlined"
                    format="yyyy/MM/dd HH:mm"
                    value={datevalues.date}
                    onChange={handDateChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item md={12} xs={12}>
              {roundDetails.map((_, index) => (
                <div key={index} style={{ padding: 20 }}>
                  <Grid container item spacing={5}>
                    <Grid item>
                      {/* <Typography>{index + 1}</Typography> */}
                      <Avatar>{index + 1}</Avatar>
                    </Grid>
                    <Grid item>
                      <TextField
                        name="name"
                        value={roundDetails[index].name}
                        InputLabelProps={{ shrink: true }}
                        label="Round Name"
                        onChange={event => {
                          handleRoundChange(event, index);
                        }}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        name="description"
                        value={roundDetails[index].description}
                        InputLabelProps={{ shrink: true }}
                        label="Round Description"
                        onChange={event => {
                          handleRoundChange(event, index);
                        }}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </div>
              ))}
            </Grid>
          </CardContent>
          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button color="primary" variant="contained" type="submit">
              Save details
            </Button>
          </Box>
        </Card>
      </form>
      <div>
        {isError && (
          <CustomSnackbar
            changeError={changeError}
            severity="error"
            message={errorMessage}
          />
        )}
      </div>
    </div>
  );
}

ProfileDetails.propTypes = {
  className: PropTypes.string
};
