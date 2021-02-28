import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import EmployeeService from '../../../services/EmployeeServices';
import Popup from "../../../components/controls/Popup";
import ProfileDetails from "./ProfileDetails";
import { Card, makeStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MaterialTable from 'material-table'

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  delete: {
    backgroundColor: "red",
    marginLeft: "5px"
  }
}));

const Results = ({ className, ...rest }) => {

  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const [posts, setPosts] = useState([]);
  const [isEdited, setIsEdited] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const getAllEmployees = () => {
    EmployeeService.getAllEmployee()
      .then(res => {
        setPosts(res.data);
        setIsDataLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }


  useEffect((props) => {
    if(isEdited){
      setIsEdited(false);
      getAllEmployees();      
    }
  }, [isEdited, posts])

  const deleteEmployee = (id) => {
    console.log("employee in func : " + id);
    EmployeeService.deleteEmployee({ id: id })
      .then(res => {
        console.log("in Result  : " + res.data);
        getAllEmployees();
      })
      .catch(err => {
        console.log(err);
      })

  }
  function openPopupWithExtraData(id) {
    console.log("employee in func : " + id);
    EmployeeService.getSingleEmployee({ id: id })
      .then(res => {
        console.log("in Result  : " + res.data);
        openInPopup(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const addOrEdit = (employee, resetForm) => {
    if (employee.id === 0)
      console.log("Inserted");
    else
      console.log("Edited");
    setIsEdited(true);
    resetForm()
    setRecordForEdit(null)
    setOpenPopup(false)
    console.log("From add or edit")
    getAllEmployees();
  }
  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }

  //Pagination
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const [page, setPage] = React.useState(0);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };


  return (
    <div>
    {/* <Box display="flex" justifyContent="flex-end" marginBottom="2%">
        <Button
          color="primary"
          variant="contained"
          onClick={() => {setOpenPopup(true); setIsUpdating(false);}}
        >
          Add Employee
        </Button>
      </Box> */}
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      {/* <Toolbar/> */}
      {/* <PerfectScrollbar>
        <Box minWidth={1050}>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Full Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  College
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {
                posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee) => (
                  <TableRow                  
                    key={employee.id}
                  >
                    <TableCell>
                      {`${employee.user.first_name} ${employee.user.last_name}`}
                    </TableCell>
                    <TableCell>
                      {employee.user.email}
                    </TableCell>
                    <TableCell>
                      {employee.college}
                    </TableCell>
                    <TableCell>
                      <Fab size="small" color="primary" aria-label="edit" onClick={() => { openPopupWithExtraData(employee.id) }}>
                        <EditIcon />
                      </Fab>
                      <Fab size="small" color="secondary" className={classes.delete} aria-label="delete" onClick={() => { deleteEmployee(employee.id) }}>
                        <DeleteIcon />
                      </Fab>
                    </TableCell>
                  </TableRow>
                )

                )}

            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={posts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />

        </Box>
      </PerfectScrollbar> */}
      <PerfectScrollbar>
          <Card>
          <MaterialTable
            style={{
              fontSize: "14px"
            }}
              className = {classes.table}
              title="Employee Details"
              columns={[
                { title: 'Full Name',  
                render: rowData => rowData.user.first_name + " " + rowData.user.last_name , 
                customFilterAndSearch: (term, rowData) => rowData.user.first_name.toLowerCase().includes(term.toLowerCase()) || rowData.user.last_name.toLowerCase().includes(term.toLowerCase()),},
                { title: 'Email', field: 'user.email' },
                { title: 'College', field: 'college', lookup: { 'DYPCOE': 'DYPCOE', 'DYPIEMR': 'DYPIEMR' }},                
                { title: 'Department', field: 'department', lookup: { 'Computer': 'Computer', 'IT': 'IT' }},
                { title: 'Actions', field: 'action', filtering: false, render: rowData => 
                <React.Fragment>
                  <Fab size="small" color="primary" aria-label="edit" onClick={()=>{openPopupWithExtraData(rowData.id); setIsUpdating(true); }}>
                    <EditIcon />
                  </Fab>
                  <Fab size="small" color="secondary"  className={classes.delete} aria-label="delete" onClick={()=>{deleteEmployee(rowData.id)}}>
                    <DeleteIcon />
                  </Fab>
                </React.Fragment>}
              ]}
              data={posts}
              options={{
                emptyRowsWhenPaging: false,
                filtering: true,
                rowStyle: {                 
                  fontFamily : "Roboto, Helvetica , Arial, sans-serif",              
                }
              }}
              isLoading={isDataLoading}
            />
          </Card>
        </PerfectScrollbar>
      <Popup
        title="Employee Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProfileDetails
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
          isUpdating={isUpdating} />
      </Popup>
    </Card>
    </div>
  )
};

Results.propTypes = {
  className: PropTypes.string,  
};

export default Results;