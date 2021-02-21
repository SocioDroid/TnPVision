import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import RoundService from '../../../services/RoundService';

const Results = props => {
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
              {students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(student => (
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
           
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={students.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
};

export default Results;