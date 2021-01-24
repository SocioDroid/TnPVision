import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import EmployeeService from '../../../services/EmployeeServices';
import useTable from "../../../components/useTable";
import Popup from "../../../components/Popup";
import ProfileDetails from "./ProfileDetails"
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import getInitials from '../../../utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  delete:{
    backgroundColor: "red",
    marginLeft: "5px"
  }
}));

const Results = ({ className, customers, ...rest }) => {

  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);



  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const[ posts, setPosts] = useState([]);

  const getAllEmployees = () => {
    EmployeeService.getAllEmployee()
      .then(res => {        
          setPosts(res.data);          
      })
      .catch( err => {
          console.log(err);
      })
  }

    
    useEffect((props) => {
      getAllEmployees();
    }, [])

    const deleteEmployee = (id) => {
      console.log("employee in func : "+ id);
      EmployeeService.deleteEmployee({id: id})
      .then(res => {
          console.log("in Result  : "+res.data);
          getAllEmployees();                
      })
      .catch( err => {
          console.log(err);
      })

    }
    function openPopupWithExtraData(id){
      console.log("employee in func : "+ id);
      EmployeeService.getSingleEmployee({id: id})
      .then(res => {
          console.log("in Result  : "+res.data);                
          openInPopup(res.data);
      })
      .catch( err => {
          console.log(err);
      })
    }

    const addOrEdit = (employee, resetForm) => {
      if (employee.id == 0)
          // StudentService.insertstudent(employee)
          console.log("Inserted");
      else
          console.log("Edited");
          // StudentService.updatestudent(employee)
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

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      
        <PerfectScrollbar>
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
                posts.map((employee) => (
                <TableRow
                  //hover
                  key={employee.id}
                  //selected={selectedstudentIds.indexOf(employee.id) !== -1}
                >
                  <TableCell>
                       {`${employee.user.first_name} ${employee.user.last_name}`}
                  </TableCell>
                  <TableCell>
                    {employee.user.email}
                  </TableCell>
                  <TableCell>
                    {/*`${employee.address.city}, ${employee.address.state}, ${employee.address.country}`*/}
                    {employee.college}
                  </TableCell>
                  <TableCell>
                  <Fab size="small" color="primary" aria-label="edit" onClick={()=>{openPopupWithExtraData(employee.id)}}>
                    <EditIcon />
                  </Fab>
                  <Fab size="small" color="secondary"  className={classes.delete} aria-label="delete" onClick={()=>{deleteEmployee(employee.id)}}>
                    <DeleteIcon />
                  </Fab>
                  </TableCell>
                </TableRow>
              )
              
                )}

            </TableBody>
          </Table>

        </Box>
        </PerfectScrollbar>

      <TablePagination
        component="div"
        count={customers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
     <Popup
        title="Employee Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProfileDetails
            recordForEdit={recordForEdit}
            addOrEdit={addOrEdit} />
    </Popup>
    </Card>
  )
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
