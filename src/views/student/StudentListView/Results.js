import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Popup from "../../../components/Popup";
import ProfileDetails from "./ProfileDetails"
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles
} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import StudentService from '../../../services/studentService';

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
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)

  const[ posts, setPosts] = useState([]);

  const getAllStudents = () => {
    StudentService.getAllStudents()
      .then(res => {        
          setPosts(res.data);          
      })
      .catch( err => {
          console.log(err);
      })
    }

    useEffect((props) => {
      getAllStudents();
    }, [recordForEdit])

    const deleteStudent = (id) => {
      StudentService.deleteStudent({id: id})
      .then(res => {
          getAllStudents();                
      })
      .catch( err => {
          console.log(err);
      })

    }
    function openPopupWithExtraData(id){
      StudentService.getSingleStudent({id: id})
      .then(res => {
          openInPopup(res.data);
      })
      .catch( err => {
          console.log(err);
      })
    }

    const addOrEdit = (student, resetForm) => {
      if (student.id === 0)
          console.log("Inserted");
      else
          console.log("Edited");
      resetForm()
      setRecordForEdit(null)
      setOpenPopup(false)
  }
    const openInPopup = item => {
      setRecordForEdit(item)
      setOpenPopup(true)
  }

    //Pagination
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

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
                posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => (
                <TableRow                  
                  key={student.id}
                >
                  <TableCell>
                       {`${student.user.first_name} ${student.user.last_name}`}
                  </TableCell>
                  <TableCell>
                    {student.user.email}
                  </TableCell>
                  <TableCell>                   
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
        </PerfectScrollbar>
     <Popup
        title="Student Form"
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
