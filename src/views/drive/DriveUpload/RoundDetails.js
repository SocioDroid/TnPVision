import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useTable from '../../../components/useTable';
import Popup from '../../../components/Popup';
// import ProfileDetails from "./ProfileDetails"
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
  Button,
  IconButton,
  Typography,
  makeStyles
} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import StudentService from '../../../services/studentService';
import getInitials from '../../../utils/getInitials';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  delete: {
    backgroundColor: 'red',
    marginLeft: '5px'
  }
}));

const Results = props => {
  const classes = useStyles();
  // const students = props;
  // console.log(students.students, 'students')
  // console.log(props.students, 'propsstudents')
  // console.log(props, 'props')

  // const handleSelectAll = (event) => {
  //   let newSelectedCustomerIds;

  //   if (event.target.checked) {
  //     newSelectedCustomerIds = customers.map((customer) => customer.id);
  //   } else {
  //     newSelectedCustomerIds = [];
  //   }

  //   setSelectedCustomerIds(newSelectedCustomerIds);
  // };

  // const handleSelectOne = (event, id) => {
  //   const selectedIndex = selectedCustomerIds.indexOf(id);
  //   let newSelectedCustomerIds = [];

  //   if (selectedIndex === -1) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
  //   } else if (selectedIndex === 0) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
  //   } else if (selectedIndex === selectedCustomerIds.length - 1) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(
  //       selectedCustomerIds.slice(0, selectedIndex),
  //       selectedCustomerIds.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelectedCustomerIds(newSelectedCustomerIds);
  // };

  // const handleLimitChange = (event) => {
  //   setLimit(event.target.value);
  // };

  // const handlePageChange = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const getAllStudents = () => {
  //   StudentService.getAllStudents()
  //     .then(res => {
  //         setPosts(res.data);
  //     })
  //     .catch( err => {
  //         console.log(err);
  //     })
  // }

  // useEffect((props) => {
  //   getAllStudents();
  // }, [])

  // const deleteStudent = (id) => {
  //   console.log("Student in func : "+ id);
  //   StudentService.deleteStudent({id: id})
  //   .then(res => {
  //       console.log("in Result  : "+res.data);
  //       getAllStudents();
  //   })
  //   .catch( err => {
  //       console.log(err);
  //   })

  // }

  return (
    <Card
    // className={clsx(classes.root, className)}
    // {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.students.map(student => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>
                    {`${student.user.first_name} ${student.user.last_name}`}
                  </TableCell>
                  <TableCell>{student.user.email}</TableCell>
                  <TableCell>
                    <IconButton>
                      <NavigateNextIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
