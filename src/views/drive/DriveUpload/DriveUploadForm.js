import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Button,
  Box,
  Grid,
  Typography,
  MenuItem,
  Slider,
  makeStyles,
  Tooltip,
  IconButton,
  Avatar
} from '@material-ui/core';
import { KeyboardDateTimePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Autocomplete } from 'formik-material-ui-lab';
import { AllBranches } from '../data';
import CompanyService from '../../../services/CompanyService';
import MuiTextField from '@material-ui/core/TextField';
import DriveService from '../../../services/DriveService';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import { Autocomplete as MaterialUiAutocomplete } from '@material-ui/lab';
import { TextField as MaterialUiTextField } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ReactMultiEmail } from 'react-multi-email';
import StudentService from '../../../services/StudentService';
import 'react-multi-email/style.css';
import EmployeeServices from '../../../services/EmployeeServices';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { config } from '@fortawesome/fontawesome-svg-core';
import Popup from '../../../components/controls/Popup';
import ProfileDetails from '../CompanyListView/ProfileDetails';
import { setEmitFlags } from 'typescript';
import Editor from './Editor';
import { grey } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  delete: {
    backgroundColor: 'red',
    marginLeft: '5px'
  },
  divider: {
    margin: '10px'
  },
  gridCenter: {
    alignSelf: 'center'
  }
}));

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

export default function Basic(props) {
  const navigate = useNavigate();
  const classes = useStyles();
  const [interviewerEmails, setInterviewerEmails] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [coordinators, setCoordinators] = useState([]);

  const [txt, setTxt] = useState('');

  const [selectedDate, handleDateChange] = useState(
    new Date('2018-01-01T00:00:00.000Z')
  );
  //const [value, setValue] = useState('');
  const [val, setVal] = useState([0, 50]);
  const [posts, setPosts] = useState([]);

  const [salaryHideChange, setSalaryHideChange] = useState(false);
  const [flag, setFlag] = useState(true);

  const handleSalaryHideChange = event => {
    setSalaryHideChange(!salaryHideChange);
  };

  const updateRange = (e, data) => {
    setVal(data);
  };
  const mark = [
    {
      value: 0,
      label: '0 CTC'
    },
    {
      value: 50,
      label: '50 CTC'
    }
  ];

  const getAllCompanies = () => {
    CompanyService.getAllCompanies()
      .then(res => {
        setFlag(false);
        setPosts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(
    props => {
      if (flag) {
        console.log('in if of get companies');
        getAllCompanies();
      }
    },
    [flag]
  );

  //---------------------------------------------------Volunteers Search--------------------------------------------------------------------------
  const [options1, setOptions1] = useState([]);
  const [open1, setOpen1] = React.useState(false);
  const loading1 = open1 && options1.length === 0;
  const [volunteers1, setVolunteers1] = useState([]);
  const [inputValue1, setInputValue1] = useState('');
  const [inputSearch1, setInputSearch1] = useState('');
  const debounceOnChange = React.useCallback(
    debounce(value => {
      setInputSearch1(value);
    }, 400),
    []
  );

  const debounceOnChange2 = React.useCallback(
    debounce(value => {
      setInputSearch2(value);
    }, 400),
    []
  );

  const debounceOnChange3 = React.useCallback(
    debounce(value => {
      setInputSearch3(value);
    }, 400),
    []
  );

  function handleChange1(value) {
    setInputValue1(value);
    debounceOnChange(value);
  }
  const AllVolunteers = [];
  function handleResult1() {
    for (let i = 0; i < volunteers1.length; i++) {
      const item = volunteers1[i].id;
      AllVolunteers[i] = item;
    }
  }
  useEffect(() => {
    let active1 = true;
    (async () => {
      const response = await StudentService.volunteerSearch(inputValue1);
      if (active1) {
        setOptions1(response.data);
      }
    })();
  }, [inputSearch1, inputValue1]);

  //---------------------------------------------------------Coordinator Search--------------------------------------------------------------------

  const [inputValue2, setInputValue2] = useState('');
  const [inputSearch2, setInputSearch2] = useState('');
  const [options2, setOptions2] = useState([]);
  const [open2, setOpen2] = React.useState(false);
  const loading2 = open2 && options2.length === 0;
  const [coordinators2, setCoordinators2] = useState([]);
  function handleChange2(value) {
    setInputValue2(value);
    debounceOnChange2(value);
  }
  const AllCoordinators = [];
  function handleResult2() {
    for (let i = 0; i < coordinators2.length; i++) {
      const item = coordinators2[i].id;
      AllCoordinators[i] = item;
    }
  }
  useEffect(() => {
    let active2 = true;
    (async () => {
      const response = await EmployeeServices.searchEmployee(inputValue2);

      if (active2) {
        setOptions2(response.data);
      }
    })();
  }, [inputSearch2, inputValue2]);
  //---------------------------------------------------------Company Add-----------------------------------------------------------------------
  const [openPopup, setOpenPopup] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [jd, setJd] = useState("");

  const addOrEdit = (company, resetForm) => {
    if (company.id === 0) console.log('Inserted');
    else console.log('Edited');
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    console.log('From add or edit');
    setFlag(true);
    // getAllCompanies();
  };
  const openInPopup = item => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  //---------------------------------------------------------Company Search--------------------------------------------------------------------
  const [inputValue3, setInputValue3] = useState('');
  const [inputSearch3, setInputSearch3] = useState('');
  const [options3, setOptions3] = useState([]);
  const [open3, setOpen3] = React.useState(false);
  const loading3 = open3 && options3.length === 0;
  const [company3, setCompany3] = useState({});

  function handleChange3(value) {
    setInputValue3(value);
    debounceOnChange3(value);
  }

  var AllComapnies = '';
  function handleResult3() {
    AllComapnies = company3.id;
  }
  useEffect(() => {
    let active3 = true;

    (async () => {
      const response = await await CompanyService.searchCompany(inputValue3);
      if (active3) {
        setOptions3(response.data);
      }
    })();
  }, [inputSearch3, inputValue3, flag]);

  //-----------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className={classes.root}>
      <Grid item container>
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} sm={10}>
          <Card>
            <CardContent>
              <Box margin={1} paddingBottom={2}>
                <Typography variant="h2" color="primary">
                  Post a Job - Private
                </Typography>
              </Box>
              <Formik
                initialValues={{
                  eligible_branches: [],
                  jobtitle: '',
                  date: '',
                  login_time: 0,
                  drive_location: '',
                  min_salary: 0,
                  max_salary: 0,
                  tenth: 60.0,
                  twelth: 60.0,
                  diploma: 60.0,
                  engineering: 60.0,
                  educational_gap: 0,
                  year_down: 0,
                  live_backlog: 0,
                  dead_backlog: 0,
                  drive_type: 'ON',
                  employment_type: 'Full Time',
                  company: 8,
                  hideSalary: false,
                  rounds: [
                    {
                      name: '',
                      number: 1,
                      description: ''
                    }
                  ],
                  assigned_coordinators: [3],
                  assigned_volunteers: [4],
                  interviewers: [],
                  description: ''
                }}
                onSubmit={async values => {
                  handleResult1();
                  handleResult2();
                  handleResult3();
                  values.assigned_volunteers = volunteers;
                  values.assigned_coordinators = coordinators;
                  values.interviewers = interviewerEmails;

                  values.min_salary = val[0];
                  values.max_salary = val[1];
                  values.hideSalary = salaryHideChange;
                  values.date = new Date(selectedDate).toISOString();
                  values.assigned_volunteers = [...AllVolunteers];
                  values.assigned_coordinators = [...AllCoordinators];
                  values.company = AllComapnies;
                  values.description = txt;

                  DriveService.addSingleDrive(values)
                    .then(result => {
                      console.log('Data Added:', result);
                      alert('Drive Added Sucessfully');
                      //navigate('/employee/alldrives', {inplace:true});
                    })
                    .catch(error => {
                      console.log(error);
                      alert('Operation Failed');
                    });
                }}
              >
                {({ values, errors }) => (
                  <Form autoComplete="off">
                    <Box margin={1} paddingBottom={2}>
                      <Field
                        fullWidth
                        component={TextField}
                        variant="outlined"
                        name="jobtitle"
                        type="text"
                        label="Job Title"
                      />
                    </Box>

                    <Grid container spacing={3}>
                      <Grid item xs={5}>
                        <Box margin={1}>
                          <MaterialUiAutocomplete
                            id="combo-box-demo"
                            options={options3}
                            getOptionLabel={option => option.name}
                            open={open3}
                            onOpen={() => {
                              setOpen3(true);
                            }}
                            onClose={() => {
                              setOpen3(false);
                              handleChange3('');
                            }}
                            loading={loading3}
                            onChange={(event, newValue) => {
                              console.log('selected value', newValue);
                              setCompany3(newValue);
                            }}
                            renderInput={params => (
                              <MaterialUiTextField
                                {...params}
                                variant="outlined"
                                label="Search Company"
                                onChange={event =>
                                  handleChange3(event.target.value)
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
                          <br />
                        </Box>
                      </Grid>
                      <Grid item xs={1} spacing={0}>
                        <Tooltip title="Add Company">
                          <Box margin={1} paddingTop={1.5}>
                            <IconButton
                              onClick={() => {
                                setOpenPopup(true);
                                setIsUpdating(false);
                              }}
                              size={'small'}
                              color="primary"
                              aria-label="add"
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                          <Field
                            name="eligible_branches"
                            multiple
                            component={Autocomplete}
                            options={AllBranches}
                            getOptionLabel={option => option.branch}
                            fullWidth
                            renderInput={params => (
                              <MuiTextField
                                {...params}
                                label="Eligible Branches"
                                variant="outlined"
                              />
                            )}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    {/* <CKEditor
                        editor={ ClassicEditor }
                        data=""                                                           
                        onChange={ ( event, editor ) => {
                            config.fillEmptyBlocks = false;
                            const data = editor.getData();
                            setTxt(data);                            
                        } }                      
                    />     
                    <CKEditor
                      editor={ClassicEditor}
                      data="<p>Hello from CKEditor 5!</p>"
                      onInit={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log("Editor is ready to use!", editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                      }}
                    />            */}
                    <Box
                      margin={1}
                      paddingBottom={2}
                      border={1}
                      borderColor={'#C1C1C1'}
                      borderRadius={5}
                    >
                      <Editor jd={jd} setJd={setJd} />
                    </Box>

                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                          <Field
                            fullWidth
                            component={TextField}
                            type="text"
                            name="drive_type"
                            label="Drive Type"
                            select
                            variant="outlined"
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                          >
                            {driveType.map(option => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                          <Field
                            fullWidth
                            component={TextField}
                            variant="outlined"
                            type="text"
                            name="employment_type"
                            label="Employment Type"
                            select
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                          >
                            {employee_type.map(option => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                          <Field
                            fullWidth
                            variant="outlined"
                            component={TextField}
                            name="login_time"
                            type="number"
                            label="Login Time"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                          <Field
                            fullWidth
                            variant="outlined"
                            component={TextField}
                            name="drive_location"
                            type="text"
                            label="Drive Location"
                          />
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Box margin={2} paddingBottom={1} paddingTop={1}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Field
                              variant="outlined"
                              component={KeyboardDateTimePicker}
                              name="date"
                              value={selectedDate}
                              onChange={handleDateChange}
                              label="Date Of Drive"
                              format="yyyy/MM/dd HH:mm"
                              fullWidth
                            />
                          </MuiPickersUtilsProvider>
                        </Box>
                      </Grid>

                      {/* <Grid item xs={4}>
                        <Box
                          margin={2}
                          paddingBottom={1}
                          paddingLeft={2}
                          paddingTop={1}
                        >
                          <Typography style={{ color: 'grey' }}>
                            Salary Range
                          </Typography>
                          <Field
                            component={Slider}
                            name="salary"
                            value={val}
                            onChange={updateRange}
                            marks={mark}
                            step={0.1}
                            max={50}
                            valueLabelDisplay="auto"
                          ></Field>
                        </Box>
                      </Grid> */}
                      <Grid item xs={2}>
                        <Box margin={1} paddingBottom={0} paddingTop={2}>
                          <Field
                            fullWidth
                            variant="outlined"
                            component={TextField}
                            name="min_salary"
                            type="number"
                            label="Min Salary"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={2}>
                        <Box margin={1} paddingBottom={0} paddingTop={2}>
                          <Field
                            fullWidth
                            variant="outlined"
                            component={TextField}
                            name="max_salary"
                            type="number"
                            label="Max Salary"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={2}>
                        <Box margin={2} paddingBottom={1} paddingTop={1}>
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
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                          <Field
                            fullWidth
                            variant="outlined"
                            component={TextField}
                            name="engineering"
                            type="number"
                            label="Engineering Percentage"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                          <Field
                            fullWidth
                            variant="outlined"
                            component={TextField}
                            name="tenth"
                            type="text"
                            label="10th Percentage"
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                          <Field
                            fullWidth
                            variant="outlined"
                            component={TextField}
                            name="twelth"
                            type="text"
                            label="12th Percentage"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                          <Field
                            fullWidth
                            variant="outlined"
                            component={TextField}
                            name="diploma"
                            type="text"
                            label="Diploma Percentage"
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                          <Field
                            fullWidth
                            variant="outlined"
                            component={TextField}
                            name="educational_gap"
                            type="number"
                            label="Educational Gap"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                          <Field
                            fullWidth
                            variant="outlined"
                            component={TextField}
                            name="year_down"
                            type="number"
                            label="Year Down"
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                          <Field
                            fullWidth
                            variant="outlined"
                            component={TextField}
                            name="live_backlog"
                            type="number"
                            label="Live Backlog"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                          <Field
                            fullWidth
                            variant="outlined"
                            component={TextField}
                            name="dead_backlog"
                            type="number"
                            label="Dead Backlog"
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                          <MaterialUiAutocomplete
                            multiple
                            filterSelectedOptions
                            options={options1}
                            getOptionLabel={option =>
                              option.first_name + ' ' + option.last_name
                            }
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
                            onChange={(event, newValue) => {
                              setVolunteers1(newValue);
                            }}
                            onSelect={handleResult1}
                            renderInput={params => (
                              <MaterialUiTextField
                                {...params}
                                label="Search Volunteer"
                                variant="outlined"
                                onChange={event =>
                                  handleChange1(event.target.value)
                                }
                                fullWidth
                              />
                            )}
                            renderOption={option => {
                              return (
                                <div>
                                  {option.first_name + ' ' + option.last_name}
                                </div>
                              );
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box margin={1} paddingBottom={2}>
                          <MaterialUiAutocomplete
                            multiple
                            filterSelectedOptions
                            options={options2}
                            getOptionLabel={option =>
                              option.first_name + ' ' + option.last_name
                            }
                            open={open2}
                            onOpen={() => {
                              setOpen2(true);
                            }}
                            onClose={() => {
                              setOpen2(false);
                              handleChange2('');
                            }}
                            autoComplete
                            loading={loading2}
                            inputValue={inputValue2}
                            includeInputInList
                            onChange={(event, newValue) => {
                              setCoordinators2(newValue);
                              console.log(newValue);
                            }}
                            onSelect={handleResult2}
                            renderInput={params => (
                              <MaterialUiTextField
                                {...params}
                                label="Search Coordinator"
                                variant="outlined"
                                onChange={event =>
                                  handleChange2(event.target.value)
                                }
                                fullWidth
                                inputProps={{
                                  ...params.inputProps,
                                  autoComplete: 'new-password'
                                }}
                              />
                            )}
                            renderOption={option => {
                              return (
                                <div>
                                  {option.first_name + ' ' + option.last_name}
                                </div>
                              );
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box margin={1} paddingBottom={2}>
                          <ReactMultiEmail
                            placeholder="Input Interviewer's Email Addresses"
                            emails={interviewerEmails}
                            onChange={_emails => {
                              setInterviewerEmails(_emails);
                            }}
                            getLabel={(
                              email: string,
                              index: number,
                              removeEmail: (index: number) => void
                            ) => {
                              return (
                                <div data-tag key={index}>
                                  {email}
                                  <span
                                    data-tag-handle
                                    onClick={() => removeEmail(index)}
                                  >
                                    ×
                                  </span>
                                  <br />
                                </div>
                              );
                            }}
                          />
                          {/* <h4>react-multi-email value</h4>
                          <p>{interviewerEmails.join(', ') || 'empty'}</p> */}
                        </Box>
                      </Grid>
                    </Grid>
                    <Box margin={1}>
                      <Typography variant="body1">
                        Enter Rounds Information
                      </Typography>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                      <FieldArray name="rounds">
                        {({ push, remove }) => (
                          <React.Fragment>
                            {values.rounds.map((_, index) => (
                              <div key={index}>
                                <Grid container item spacing={3}>
                                  <Grid item>
                                    {/* <Typography>{index + 1}</Typography> */}
                                    <Avatar>{index + 1}</Avatar>
                                  </Grid>
                                  <Grid item>
                                    <Field
                                      name={`rounds[${index}].name`}
                                      component={TextField}
                                      label="Round Name"
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
                                    <Fab
                                      size="small"
                                      color="secondary"
                                      className={classes.delete}
                                      aria-label="delete"
                                      onClick={() => {
                                        remove(index);
                                      }}
                                    >
                                      <DeleteIcon />
                                    </Fab>
                                  </Grid>
                                </Grid>
                                <Divider className={classes.divider} />
                              </div>
                            ))}

                            <Grid container item spacing={3}>
                              <Grid item>
                                <br />
                                <Button
                                  variant="contained"
                                  style={{ color: 'black' }}
                                  onClick={() =>
                                    push({
                                      name: '',
                                      number: values.rounds.length + 1,
                                      description: ''
                                    })
                                  }
                                >
                                  Add Round
                                </Button>
                              </Grid>
                            </Grid>
                          </React.Fragment>
                        )}
                      </FieldArray>
                    </Box>
                    <Box margin={1} paddingBottom={2}>
                      <Button variant="contained" color="primary" type="submit">
                        Submit
                      </Button>
                    </Box>
                    <br />
                    <br />
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={false} sm={1} />
      </Grid>
      <Popup
        title="Company Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProfileDetails
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
          isUpdating={isUpdating}
        />
      </Popup>
    </div>
  );
}
