import React, { useEffect, useState, useContext } from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { useNavigate } from 'react-router-dom';
import MaterialTable from 'material-table';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import RoundService from '../../../services/RoundService';
import swal from 'sweetalert';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import DeleteIcon from '@material-ui/icons/Delete';
import UserContext from '../../../UserContext';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 440
  },
  accepted: {
    backgroundColor: 'green',
    color: 'white'
  },
  pending: {
    backgroundColor: 'orange',
    color: 'white'
  },
  rejected: {
    backgroundColor: 'red',
    color: 'white'
  }
});

export default function RoundSudent(props) {
  const { driveId, students, roundId, round, changeUpdated } = props;
  const classes = useStyles();
  const [flag, setFlag] = useState(Boolean(true));

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();
  const Context = useContext(UserContext);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const addOrRejectStudent = (roundId, studentId, status) => {
    swal({
      title: 'Are you sure?',
      text: 'Once ' + status + ', you will not be able to revert back!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,

      showLoaderOnConfirm: true
    }).then(okay => {
      if (okay) {
        Context.value.setIsActive(true);
        RoundService.addStudentToNextRound(driveId, roundId, {
          student_id: studentId,
          status: status
        })
          .then(res => {
            if (status === 'accepted') changeUpdated(round.number + 1);
            setFlag(true);
            Context.value.setIsActive(false);
            swal('Student has been ' + status + '!', {
              icon: 'success'
            });
          })
          .catch(res => {
            Context.value.setIsActive(false);
          });
      }
    });
  };
  const deleteStudentFromRound = (roundId, studentId) => {
    Context.value.setIsActive(true);
    RoundService.deleteStudentFromRound(driveId, roundId, studentId)
      .then(res => {
        console.log('Done');
        changeUpdated(round.number + 1);
        setFlag(true);
        Context.value.setIsActive(false);
      })
      .catch(res => {});
    console.log('delet clicked');
  };
  return (
    <Paper className={classes.root}>
      <MaterialTable
        onRowClick={(event, rowData) => {
          navigate(
            `/interviewer/studentinformation/${rowData.id}/${roundId}/`,
            { replace: true }
          );
        }}
        style={{
          fontSize: '14px'
        }}
        className={classes.table}
        title=""
        columns={[
          { title: 'ID', field: 'id' },
          {
            title: 'Full Name',
            customFilterAndSearch: (term, rowData) =>
              rowData.user.first_name
                .toLowerCase()
                .includes(term.toLowerCase()) ||
              rowData.user.last_name.toLowerCase().includes(term.toLowerCase()),
            render: rowData =>
              rowData.user.first_name + ' ' + rowData.user.last_name
          },
          { title: 'Email', field: 'user.email' },
          {
            title: 'Status',
            field: 'status',
            defaultSort: 'asc',
            lookup: {
              pending: 'pending',
              rejected: 'rejected',
              accepted: 'accepted'
            },
            render: rowData => (
              <React.Fragment>
                <Chip
                  className={
                    rowData.status === 'accepted'
                      ? classes.accepted
                      : rowData.status === 'rejected'
                      ? classes.rejected
                      : classes.pending
                  }
                  icon={
                    rowData.status === 'accepted' ? (
                      <DoneIcon style={{ color: 'white' }} />
                    ) : rowData.status === 'rejected' ? (
                      <CloseIcon style={{ color: 'white' }} />
                    ) : (
                      <CircularProgress size={14} style={{ color: 'white' }} />
                    )
                  }
                  size="small"
                  label={rowData.status}
                />
              </React.Fragment>
            )
          },
          {
            title: 'Actions',
            field: 'action',
            filtering: false,
            render: rowData => (
              <React.Fragment>
                <Tooltip title="Qualified for next round">
                  <IconButton
                    onClick={event => {
                      addOrRejectStudent(
                        round.number + 1,
                        rowData.id,
                        'accepted'
                      );
                      event.stopPropagation();

                    }}
                  >
                    <NavigateNextIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Rejected">
                  <IconButton
                    onClick={(event) => {
                      addOrRejectStudent(round.number, rowData.id, 'rejected');
                      event.stopPropagation();
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete student from round">
                  <IconButton
                    onClick={(event) => {
                      deleteStudentFromRound(round.number, rowData.id);
                      event.stopPropagation();
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </React.Fragment>
            )
          }
        ]}
        data={students}
        options={{
          thirdSortClick: false,
          emptyRowsWhenPaging: false,
          filtering: true,
          rowStyle: {
            fontFamily: 'Roboto, Helvetica , Arial, sans-serif'
          }
        }}
        // isLoading={isDataLoading}
      />
    </Paper>
  );
}
