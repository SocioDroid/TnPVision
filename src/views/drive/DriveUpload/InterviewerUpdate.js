import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Button,
  IconButton,
  Grid,
  Divider
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DriveService from '../../../services/DriveService';
import { ReactMultiEmail } from 'react-multi-email';
import 'react-multi-email/style.css';
import MaterialTable from 'material-table';
import Fab from '@material-ui/core/Fab';

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

  const [interviewerEmails, setInterviewerEmails] = useState([]);

  const handleSubmit = () => {
    const data = {
      interviewers: interviewerEmails
    };
    addInterviewersForDrive(recordForEdit.id, data);

    console.log('Final Interviewer List', data);
  };

  return (
    <Card  style={{ minWidth: '100%' }}>
      <PerfectScrollbar>
        <Card>
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
              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
              >
                Add Interviewers
              </Button>
            </Grid>
          </Grid>
          <br />
          <br />
          <Divider />
          <MaterialTable
            style={{
              fontSize: '14px'
            }}
            title="Interviewer Details"
            columns={[
              {
                title: 'ID',
                tableLayout: 'auto',
                field: 'id'
                //filtering: false
              },
              { title: 'First Name', field: 'first_name',emptyValue:'-'},
              { title: 'Last Name', field: 'last_name', emptyValue:'-' },
              { title: 'Email', field: 'email' },
              {
                title: 'Actions',
                field: 'action',
                filtering: false,
                render: rowData => (
                  <React.Fragment>
                    <IconButton
                      size="small"                      
                      onClick={() => {
                        deleteInterviewersForDrive(rowData.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </React.Fragment>
                )
              }
            ]}
            data={interviewerForEdit}
            options={{
              emptyRowsWhenPaging: false,
              filtering: true,
              rowStyle: {
                fontFamily: 'Roboto, Helvetica , Arial, sans-serif'
              }
            }}
            //isLoading={isDataLoading}
          />
        </Card>
      </PerfectScrollbar>
    </Card>
  );
}

export default InterviewerUpdate;
