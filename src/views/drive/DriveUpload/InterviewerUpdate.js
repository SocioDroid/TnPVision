import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
  TextField,
  TablePagination,
  Grid
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DriveService from '../../../services/DriveService';
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/style.css';

function InterviewerUpdate(props) {
  const { interviewerForEdit, setInterviewerForEdit, recordForEdit } = props;

  const deleteInterviewersForDrive = interviewerId => {
    DriveService.deleteDriveInterviewer(recordForEdit, interviewerId)
      .then(res => {
        console.log('Done', res);
        setInterviewerForEdit(res.data);
      })
      .catch(res => {
        console.log(res);
      });
    //console.log('delete clicked')
  };

  const addInterviewersForDrive = (driveId, datavalue) => {
    DriveService.addDriveInterviewers(driveId, datavalue)
      .then(res => {
        console.log('Submition', res);
        setInterviewerForEdit(res.data);
        setInterviewerEmails([]);
      })
      .catch(res => {
        console.log(res);
      });
  };

  const fixedOptions1 = [];
  const [options1, setOptions1] = useState([]);
  const [open1, setOpen1] = React.useState(false);
  const loading1 = open1 && options1.length === 0;
  const [interviewerEmails, setInterviewerEmails] = useState([]);

  const handleSubmit = () => {
    const data = {
      interviewers: interviewerEmails
    };
    addInterviewersForDrive(recordForEdit.id, data);
    
    console.log('Final Interviewer List', data);
  };

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //---------------------------------------------------------------------------------------------------------------------------------------
  return (
    <Card>
      <PerfectScrollbar>
        <Box minWidth={1050} margin={3} border={1} borderColor="grey.500">
          <Grid container spacing={3}>
            <Grid item md={1} xs={12} />
            <Grid item md={8} xs={12}>
              <br />
              <br />
              <ReactMultiEmail
                placeholder="Enter your Email Address"
                emails={interviewerEmails}
                onChange={_emails => {
                  setInterviewerEmails(_emails);
                }}
                getLabel={(
                  email: string,
                  index: number,
                  removeEmail: (index: number) => void
                ) => {
                  return (
                    <div data-tag key={index}>
                      {email}
                      <span data-tag-handle onClick={() => removeEmail(index)}>
                        ×
                      </span>
                      <br />
                    </div>
                  );
                }}
              />
            </Grid>
            <Grid item md={1} xs={12}>
              <br />
              <br />
              {/* <h4>react-multi-email value</h4> */}
              {/* <p>{interviewerEmails.join(', ') || 'empty'}</p> */}

              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
              >
                Add Interviewers
              </Button>
            </Grid>
            <Grid item md={12} xs={12}>
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
                  {interviewerForEdit
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(interviewer => (
                      <TableRow key={interviewer.id}>
                        <TableCell>{interviewer.id}</TableCell>
                        <TableCell>
                          {`${interviewer.first_name} ${interviewer.last_name}`}
                        </TableCell>
                        <TableCell>{`${interviewer.email}`}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => {
                              deleteInterviewersForDrive(interviewer.id);
                            }}
                          >
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
                count={interviewerForEdit.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
}

export default InterviewerUpdate;
