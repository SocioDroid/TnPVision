import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import InterviewerService from '../../../services/InterviewerService';
import StudentInformation from './StudentInformation';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function RoundSudent(props) {
  
  const { RoundId } = props;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [roundstudent, setRoundstudent] = useState([]);

  const navigate = useNavigate();
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    console.log(RoundId);

    InterviewerService.getStudentsFromRound(RoundId)
    .then(res =>{
        //console.log("Interviewer Round Student ",res.data.students);
        setRoundstudent(res.data.students)
      })
  }, [RoundId]);

  return (

    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                  ID
              </TableCell>
              <TableCell>
                  First Name
              </TableCell>
              <TableCell>
                  Last Name
              </TableCell>
              <TableCell>
                  Email ID
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {roundstudent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={student.id} onClick={()=>{navigate('/interviewer/studentinformation/'+ student.id, { replace: true });}}>
                  
                        <TableCell >
                            {student.id}
                        </TableCell>
                                                            
                        <TableCell>
                            {student.user.first_name}
                        </TableCell>

                        <TableCell>
                            {student.user.last_name}
                        </TableCell>

                        <TableCell>
                            {student.user.email}
                        </TableCell>

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={roundstudent.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
