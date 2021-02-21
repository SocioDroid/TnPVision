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

const columns = [
  { id: 'id', label: 'Name', minWidth: 170 },
  { id: 'first name', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'last name',
    label: 'Population',
    minWidth: 170,
  },
  {
    id: 'email',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
  },
];

function createData(name, code, population, size) {
  return { name, code, population, size };
}

const rows = [
  createData('India', 'IN', 1324171354, 9596961),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

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
  const [roundstudent, setRoundstudent] = useState([])
  
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
        console.log("Interviewer Round Student ",res.data.students);
        setRoundstudent(res.data.students)
      })
  }, [RoundId]);

  return (

    <Paper className={classes.root}>
        {RoundId}
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

            {roundstudent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={()=>{console.log("ID clicked", row.id)}}>
                  {/* {roundstudent.map((student)=>{ */}

            {/* // {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => { */}
            {/* //   return (
            //     <TableRow hover role="checkbox" tabIndex={-1} key={row.code}> */}
                  {/* {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })} */}
                   {roundstudent.map((student)=>{
                      return(
                        <TableCell key={student.id}>
                            {student.id}
                        </TableCell>
                      )                      
                  })}
                  {roundstudent.map((student)=>{
                      return(
                        <TableCell key={student.id}>
                            {student.user.first_name}
                        </TableCell>
                      )                      
                  })}
                  {roundstudent.map((student)=>{
                      return(
                        <TableCell key={student.id}>
                            {student.user.last_name}
                        </TableCell>
                      )                      
                  })}
                  {roundstudent.map((student)=>{
                      return(
                        <TableCell key={student.id}>
                            {student.user.email}
                        </TableCell>
                      )                      
                  })}
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
