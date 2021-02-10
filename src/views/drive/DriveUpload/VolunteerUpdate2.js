import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
  TextField,
  Grid
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DriveService from '../../../services/DriveService';

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

function Results(props) {
  const {studentForEdit, recordForEdit } = props;
  const [students, setStudents] = useState([]);
  const [driveId, setDriveId] = useState();
  const [isUpdated, setUpdated] = useState(Boolean(true));
  const [temp, setTemp] = useState([])

  if (props.studentForEdit !== null){
    setTemp(props.studentForEdit);
  }
  //console.log("student which are passed from other files",studentForEdit);

  const deleteVolunteerForDrive = studentId => {
    DriveService.deleteDriveVolunteers(recordForEdit, studentId)
      .then(res => {
        console.log('Done', res);
        setTemp([...res.data]);
        setUpdated(true)
      })
      .catch(res => {
        console.log(res);
      });
    //console.log('delete clicked')
  };

  const addVolunteerForDrive = (driveId, datavalue) => {
    DriveService.addDriveVolunteers(driveId, datavalue)
      .then(res => {
        console.log('Submition', res);
        setTemp([...res.data]);
        setUpdated(true);
      })
      .catch(res => {
        console.log(res);
      });
  };

  const fixedOptions1 = [];
  const [branchvalue1, setBranchvalue1] = useState([...fixedOptions1]);
  const [options1, setOptions1] = useState([]);
  const [open1, setOpen1] = React.useState(true);
  const loading1 = open1 && options1.length === 0;
  const [volunteers, setVolunteers] = useState([]);
  const [inputValue1, setInputValue1] = useState('');
  const [inputSearch1, setInputSearch1] = useState('');
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
  //   const AllVolunteers = []
  //   function handleResult1() {
  //       for (let i = 0; i < volunteers.length; i++) {
  //           const item = volunteers[i].id;
  //           AllVolunteers[i] = item;
  //       }
  //       //console.log("All Volunteers: ",AllVolunteers)
  //   }
  useEffect(() => {
    let active1 = true;
    (async () => {
      const response = await axios.get(
        'http://20.37.50.140:8000/api/volunteer/search/?q=' + inputValue1
      );

      if (active1) {
        console.log('Response of search value', response.data);
        setOptions1(response.data);
      }
    })();
  }, [inputSearch1, inputValue1]);

  const handleSubmit = () => {
    const data2 = {
      assigned_volunteers: volunteers.length !== 0 ? volunteers : studentForEdit
    };
    const data = {  
      student_id: data2.assigned_volunteers[0].id
    };
    addVolunteerForDrive(driveId, data);
    console.log('Final Volunteers List', data);
  };
  //---------------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if(isUpdated){
      if (recordForEdit !== null && studentForEdit !== null) {
        setStudents([...temp]);
        setDriveId(recordForEdit.id);
        console.log(
          '-----------------------student in useeffect---------------------------',
          students
          );
      }
      else{
        console.log("From updated")
        setStudents([...temp]);
      }
      setUpdated(false);
    }
    //   } else {
    //     console.log('recordforedit or studentforedit is null');
    //   }
    // } else {
    //   //setStudents(studentForEdit)
    //   isUpdated(true);
    // }
  }, [recordForEdit, studentForEdit, students, isUpdated]);

  //---------------------------------------------------------------------------------------------------------------------------------------
  if (studentForEdit == null || recordForEdit == null) {
    return null;
  } else {
    return (
      <Card>
        <PerfectScrollbar>
          <Box minWidth={1050} margin={3} border={1} borderColor="grey.500">
            <Grid container spacing={3}>
              <Grid item md={1} xs={12} />
              <Grid item md={8} xs={12}>
                <br />
                <br />
                <Autocomplete
                  fullWidth
                  multiple
                  filterSelectedOptions
                  value={branchvalue1}
                  onChange={(event, newValue) => {
                    setBranchvalue1([
                      ...fixedOptions1,
                      ...newValue.filter(
                        option => fixedOptions1.indexOf(option) === -1
                      )
                    ]);
                    setVolunteers(newValue);
                    console.log('selected value', studentForEdit);
                  }}
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
                  //disableOpenOnFocus
                  //onSelect={handleResult1}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Search Volunteer"
                      variant="outlined"
                      onChange={event => handleChange1(event.target.value)}
                      fullWidth
                    />
                  )}
                  renderOption={option => {
                    return (
                      <div>{option.first_name + ' ' + option.last_name}</div>
                    );
                  }}
                />
              </Grid>
              <Grid item md={1} xs={12}>
                <br />
                <br />
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Add Volunteers
                </Button>
              </Grid>
              <Grid item md={12} xs={12}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Full Name</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map(student => (
                      <TableRow key={student.id}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>
                          {`${student.first_name} ${student.last_name}`}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => {
                              deleteVolunteerForDrive(student.id);
                            }}
                            //onClick={()=> {console.log("Delete CLicked")}}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Box>
        </PerfectScrollbar>
        {/* 
            <TablePagination
                component="div"
                count={customers.length}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            /> */}
      </Card>
    );
  }
}

export default Results;
