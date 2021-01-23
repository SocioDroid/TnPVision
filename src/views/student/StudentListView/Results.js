import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import StudentService from "../../../services/studentService";
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

  const getAllStudents = () => {
    axios.get("https://tnpvision-cors.herokuapp.com/https://tnpvisionapi.herokuapp.com/api/students/")
      .then(res => {        
          setPosts(res.data);          
      })
      .catch( err => {
          console.log(err);
      })
  }

    
    useEffect((props) => {
      getAllStudents();
    }, [])

    const deleteStudent = (id) => {
      console.log("Student in func : "+ id);
      axios.delete("https://tnpvision-cors.herokuapp.com/https://tnpvisionapi.herokuapp.com/api/student/"+id)
      .then(res => {
          console.log("in Result  : "+res.data);
          getAllStudents();                
      })
      .catch( err => {
          console.log(err);
      })

    }
    function openPopupWithExtraData(id){
      console.log("Student in func : "+ id);
      axios.get("https://tnpvision-cors.herokuapp.com/https://tnpvisionapi.herokuapp.com/api/student/"+id)
      .then(res => {
          console.log("in Result  : "+res.data);                
          openInPopup(res.data);
      })
      .catch( err => {
          console.log(err);
      })
    }

    const addOrEdit = (student, resetForm) => {
      if (student.id === 0)
          // StudentService.insertstudent(student)
          console.log("Inserted");
      else
          console.log("Edited");
          // StudentService.updatestudent(student)
      resetForm()
      setRecordForEdit(null)
      setOpenPopup(false)
      console.log("From add or edit")
      getAllStudents();
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
                  Gender
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
              {
                posts.map((student) => (
                <TableRow
                  //hover
                  key={student.id}
                  //selected={selectedstudentIds.indexOf(student.id) !== -1}
                >
                  <TableCell>
                       {`${student.user.first_name} ${student.user.last_name}`}
                  </TableCell>
                  <TableCell>
                    {student.user.email}
                  </TableCell>
                  <TableCell>
                    {/*`${student.address.city}, ${student.address.state}, ${student.address.country}`*/}
                    {student.gender}
                  </TableCell>
                  <TableCell>
                  <Fab size="small" color="primary" aria-label="edit" onClick={()=>{openPopupWithExtraData(student.id)}}>
                    <EditIcon />
                  </Fab>
                  <Fab size="small" color="secondary"  className={classes.delete} aria-label="delete" onClick={()=>{deleteStudent(student.id)}}>
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
