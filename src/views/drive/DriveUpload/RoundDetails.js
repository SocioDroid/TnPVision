import React, { useState, useEffect, useCallback } from 'react';
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
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';

const Results = props => {
  const [round, setRound] = useState({})
  const [students, setStudents] = useState([])
  const [flag, setFlag] = useState(Boolean(true));
  const changeUpdated = props.changeUpdated;
  const roundNumber = props.roundNumber
  const driveId = props.driveId;

  const getAllStudentOfRound = useCallback((driveId, roundId) => {
    RoundService.getAllStudentOfRound(driveId, roundId)
      .then(res => {
        setRound(res.data)
        const data = []
        res.data.pending.map((student) => {
          student.status = "pending"
          // data.push(student)
        })
        res.data.accepted.map((student) => {
          student.status = "accepted"
          // data.push(student)
        })
        res.data.rejected.map((student) => {
          student.status = "rejected"
          // data.push(student)
        })
        setStudents([...res.data.pending, ...res.data.accepted, ...res.data.rejected]);
        changeUpdated(0)
      })
      .catch(err => {
        console.log(err);
      });
  });

  if(roundNumber === round.number){
    getAllStudentOfRound(driveId, props.round.number)
  }

  useEffect(() => {
    if (flag) {
      setFlag(!flag);
      getAllStudentOfRound(driveId, props.round.number)      
    }
  }, [driveId, flag, props.round.number, students]);



  const addOrRejectStudent = (roundId, studentId, status) => {
    console.log(roundId, driveId, studentId, 'From put student');
    RoundService.addStudentToNextRound(driveId, roundId, {student_id:studentId, status: status})
      .then(res => {
        if(status ==="accepted")
          changeUpdated(round.number + 1)

        setFlag(true)
      })
      .catch(res => {

      });
  }

  const deleteStudentFromRound = (roundId, studentId) => {
    RoundService.deleteStudentFromRound(driveId, roundId, studentId)
      .then(res => {
        console.log("Done")
        setFlag(true)
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
                <TableCell>Status</TableCell>
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
                  <TableCell>{student.status}</TableCell>
                  <TableCell>
                  <Tooltip title="Qualified for next round">
                    <IconButton onClick={() => { addOrRejectStudent(round.number+1, student.id, "accepted") }}>
                      <NavigateNextIcon />
                    </IconButton>
                    </Tooltip>

                    <IconButton onClick={() => { addOrRejectStudent(round.number, student.id, "rejected") }}>
                      <CloseIcon />
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