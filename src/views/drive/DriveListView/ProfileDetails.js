import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from '../../../components/useForm';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { AllBranches } from '../data';
import Autocomplete from '@material-ui/lab/Autocomplete';
import StudentService from '../../../services/studentService';
import EmployeeService from '../../../services/EmployeeServices';
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
  rounds:[{name:"",number:"", description:"",students:[]}],
  assigned_coordinators:[{id:"",first_name:"",last_name:""}],
  assigned_volunteers:[{id:"",user: [{first_name:"",last_name:""}]}]
}


export default function ProfileDetails(props) {
  
  const [values, setValues] = useState({
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
    rounds:[{name:"",number:"", description:"",students:[]}],
    assigned_coordinators:[{id:"",first_name:"",last_name:""}],
    assigned_volunteers:[{id:"",user: [{first_name:"",last_name:""}]}],
  });

  const { addOrEdit, recordForEdit } = props

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
  } = useForm(initialFValues, true, validate);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) {
      const data = {
        //"id": values.id,
        "eligible_branches": values.eligible_branches,
        "jobtitle": values.jobtitle,
        "date": values.date,
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
        "drive_type": values.drive_type,
        "employment_type": values.employment_type,
        "company": values.company,
        "rounds": values.rounds,
        "assigned_coordinators": values.assigned_coordinators,
        "assigned_volunteers": values.assigned_volunteers,
      }

      addOrEdit(values, resetForm);
      axios.patch("https://tnpvision-cors.herokuapp.com/http://20.37.50.140:8000/api/drive/" + values.id+"/", data)
        .then(res =>{
          console.log("res", res);
        }).catch(error => {
          console.log(error);
          
        });
    }
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
  
  useEffect(() => {
    getAllVolunteers();
    getAllCoordinators();
    if (recordForEdit != null) {
      setValues({
        ...values,
        // 'id': recordForEdit.id,
        // 'jobtitle':recordForEdit.jobtitle,
        // 'drive_location':recordForEdit.drive_location,

        "id": recordForEdit.id,
        "eligible_branches": recordForEdit.eligible_branches,
        "jobtitle": recordForEdit.jobtitle,
        "date": recordForEdit.date,
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
        "drive_type": recordForEdit.drive_type,
        "employment_type": recordForEdit.employment_type,
        "company": recordForEdit.company,
        "rounds": recordForEdit.rounds,
        "assigned_coordinators": recordForEdit.assigned_coordinators,
        "assigned_volunteers": recordForEdit.assigned_volunteers,
      });
      console.log("IN Detaisl : ", values);
      console.log("IN Detaisl : ", recordForEdit);
    }
  }, [recordForEdit])

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
            {/* <Grid
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
            </Grid> */}
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
                helperText="Please specify the Drive Date"
                label="Date"
                name="date"
                onChange={handleChange}
                required
                value={values.date}
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
                label="Drive Loocation"
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
                label="Minimum Salary"
                name="max_salary"
                onChange={handleChange}
                required
                value={values.max_salary}
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
                helperText="Please specify the Tenth Percentage Criteria"
                label="Tenth Percentage Criteria"
                name="tenth"
                onChange={handleChange}
                required
                value={values.tenth}
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
                helperText="Please specify the Twelth Percentage Criteria"
                label="Twelth Percentage Criteria"
                name="twelth"
                onChange={handleChange}
                required
                value={values.twelth}
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
                helperText="Please specify the Diploma Percentage Criteria"
                label="Diploma Percentage Criteria"
                name="diploma"
                onChange={handleChange}
                required
                value={values.diploma}
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
                helperText="Please specify the Live Backlog Criteria"
                label="Live Backlog Criteria"
                name="live_backlog"
                onChange={handleChange}
                required
                value={values.live_backlog}
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
                helperText="Please specify the Dead Backlog Criteria"
                label="Dead Backlog Criteria"
                name="dead_backlog"
                onChange={handleChange}
                required
                value={values.dead_backlog}
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
                helperText="Please specify the Drive Type"
                label="Drive Type"
                name="drive_type"
                onChange={handleChange}
                required
                value={values.drive_type}
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
                label="Drive Location"
                name="drive_location"
                onChange={handleChange}
                required
                value={values.drive_location}
                variant="outlined"
              />
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
