import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Divider, TextField } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import StudentService from '../../../services/studentService';
import { Fullscreen } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: 190,
    width: "100px"
  },
  paper2: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: 620,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [technical, setTechnical] = React.useState(0);
  const [communication, setCommunication] = React.useState(0);
  const [personality, setPersonality] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    StudentService.getSingleStudentwithid(id)
      .then(res => {
        console.log("Interviewer Student ", res.data);
        setStudent(res.data);
        //console.log("Student : ", student);
      })
  }, []);

  if (student) {
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper className={classes.paper2}>
              {id}. {student.user.first_name} {student.user.last_name} <br /><br />
              {student.user.email}
            </Paper>
          </Grid>
          <Grid item xs={9}>

            <Paper className={classes.paper2}>
              <Grid container spacing={3}>
                  <Grid item xs={12}>
                    Education <br /><br />
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">10th</TableCell>
                            <TableCell align="center">12th</TableCell>
                            <TableCell align="center">Diploma</TableCell>
                            <TableCell align="center">Engineering</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="center">{student.tenthPercentage}</TableCell>
                            <TableCell align="center">{student.twelthPercentage === 0 ? "NA" : student.twelthPercentage}</TableCell>
                            <TableCell align="center">{student.diplomaPercentage === 0 ? "NA" : student.diplomaPercentage}</TableCell>
                            <TableCell align="center">{student.enggAggPercentage}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  
                  <Grid item xs={12}>
                    Certification <br /><br />
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">Name</TableCell>
                              <TableCell align="center">Issued Date</TableCell>                      
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {student.certificates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((certificate, index) => {
                              return(
                                <TableRow key={index}>                              
                                  <TableCell align="center">{certificate.name}</TableCell>
                                  <TableCell align="center">{certificate.issuedDate}</TableCell>                                      
                                </TableRow>
                              )
                            })}
                            
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={student.certificates.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                      />
                  </Grid>


              </Grid>
          </Paper>
          </Grid>
        </Grid>

        <div>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography className={classes.bold} variant="h6">
                    Technical
                  </Typography>
                  <Rating
                    name="technical"
                    value={technical}
                    onChange={(event, newValue) => {
                      setTechnical(newValue);
                    }}
                  />
                  <Typography className={classes.bold} variant="h6">
                    Communication
                      </Typography>
                  <Rating
                    name="communication"
                    value={communication}
                    onChange={(event, newValue) => {
                      setCommunication(newValue);
                    }}
                  />
                  <Typography className={classes.bold} variant="h6">
                    Personality
                  </Typography>
                  <Rating
                    name="personality"
                    value={personality}
                    onChange={(event, newValue) => {
                      setPersonality(newValue);
                    }}
                  />
                  <br />
                  <TextField
                    id="comment"
                    label="Write a Review"
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>

    );
  }
  else {
    return (
      <div>{student}</div>
    );
  }
}