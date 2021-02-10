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
// import DeleteIcon from '@material-ui/icons/Delete';
import RoundService from '../../../services/RoundService';
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

  const [round, setRound] = useState({})
  const [students, setStudents] = useState([])
  const [flag, setFlag] = useState(Boolean(true));
  const changeUpdated = props.changeUpdated;
  const roundNumber = props.roundNumber
  const driveId = props.driveId;

  const getAllStudentOfRound = (driveId, roundId) => {
    RoundService.getAllStudentOfRound(driveId, roundId)
      .then(res => {
        setRound(res.data)
        setStudents([...res.data.students]);
        changeUpdated(0)
      })
      .catch(err => {
        console.log(err);
      });
  };

  if(roundNumber == round.number){
    getAllStudentOfRound(driveId, props.round.number)
  }

  useEffect(() => {
    if (flag) {
      setFlag(!flag);
      getAllStudentOfRound(driveId, props.round.number)      
    }
  }, [students]);



  const putStudentToNextRound = (roundId, studentId) => {
    console.log(roundId, driveId, studentId, 'From put student');
    RoundService.addStudentToNextRound(driveId, roundId + 1, {student_id:studentId})
      .then(res => {
        console.log("Done")
        changeUpdated(round.number + 1)
      })
      .catch(res => {

      });
  }

  const deleteStudentFromRound = (roundId, studentId) => {
    RoundService.deleteStudentFromRound(driveId, roundId, studentId)
      .then(res => {
        console.log("Done")
        changeUpdated(round.number)
      })
      .catch(res => {

      });
    console.log('delet clicked')
  }

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
              {students.map(student => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>
                    {`${student.user.first_name} ${student.user.last_name}`}
                  </TableCell>
                  <TableCell>{student.user.email}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => { putStudentToNextRound(round.number, student.id) }}>
                      <NavigateNextIcon />
                    </IconButton>

                    <IconButton onClick={() => { deleteStudentFromRound(round.number, student.id) }}>
                    <DeleteIcon />
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
};

export default Results;