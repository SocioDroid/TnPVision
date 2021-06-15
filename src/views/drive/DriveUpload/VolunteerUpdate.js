import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  // Box,
  // Table,
  // TableBody,
  // TableCell,
  // TableHead,
  // TableRow,
  // IconButton,
  // TablePagination,
  TextField,
  Card,
  Button,
  Grid,
  makeStyles,
  Divider
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DriveService from '../../../services/DriveService';
import StudentService from '../../../services/StudentService';
import MaterialTable from 'material-table';
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

const useStyles = makeStyles(theme => ({
  root: {},
  delete: {
    backgroundColor: 'red',
    marginLeft: '5px'
  }
}));
function VolunteerUpdate(props) {
  const {studentForEdit, setStudentForEdit, recordForEdit } = props;
  const classes = useStyles();

  const deleteVolunteerForDrive = studentId => {
    DriveService.deleteDriveVolunteers(recordForEdit, studentId)
      .then(res => {
        console.log('Done', res);
        setStudentForEdit(res.data);
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
        setStudentForEdit(res.data);
      })
      .catch(res => {
        console.log(res);
      });
  };

  const fixedOptions1 = [];
  const [branchvalue1, setBranchvalue1] = useState([...fixedOptions1]);
  const [options1, setOptions1] = useState([]);
  const [open1, setOpen1] = React.useState(false);
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
 
  useEffect(() => {
    let active1 = true;
    (async () => {
      const response = await StudentService.volunteerSearch(inputValue1);

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

    addVolunteerForDrive(recordForEdit.id, [data2.assigned_volunteers[0].id]);
    // console.log('Final Volunteers List', data);
  };

    // const [rowsPerPage, setRowsPerPage] = React.useState(5);
    // const [page, setPage] = React.useState(0);
    // const handleChangePage = (event, newPage) => {
    //   setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //   setRowsPerPage(parseInt(event.target.value, 10));
    //   setPage(0);
    // };
  //---------------------------------------------------------------------------------------------------------------------------------------
    return (
      <Card  style={{ minWidth: '100%' }}>
        <PerfectScrollbar>
          <Card >
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
              </Grid>
              <br/><br/>
              <Divider/>
            <MaterialTable
            style={{
              fontSize: "14px"
            }}
              className={classes.table}
              title="Volunteer Details"
              columns={[
                {
                  title: 'ID',
                  tableLayout: 'auto',
                  field: 'id',
                  //filtering: false
                },
                { title: 'First Name', field: 'first_name' }, 
                { title: 'Last Name', field: 'last_name' },                              
                {
                  title: 'Actions',
                  field: 'action',
                  filtering: false,
                  render: rowData => (
                    <React.Fragment>                
                      <Fab
                        size="small"
                        color="secondary"
                        className={classes.delete}
                        aria-label="delete"
                        onClick={() => {
                          deleteVolunteerForDrive(rowData.id);
                        }}
                      >
                        <DeleteIcon />
                      </Fab>
                    </React.Fragment>
                  )
                }
              ]}
              data={studentForEdit}
              options={{
                emptyRowsWhenPaging: false,
                filtering: true,
                rowStyle: {
                  fontFamily: 'Roboto, Helvetica , Arial, sans-serif'
                }
              }}
              //isLoading={isDataLoading}
            />
          </Card>
        </PerfectScrollbar>

            
      </Card>
    );
  }

export default VolunteerUpdate;
