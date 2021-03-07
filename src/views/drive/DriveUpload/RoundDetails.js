import React, { useState, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, IconButton, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import RoundService from '../../../services/RoundService';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import MaterialTable from 'material-table';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import CircularProgress from '@material-ui/core/CircularProgress';
import swal from 'sweetalert';
import UserContext from '../../../UserContext'

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  delete: {
    backgroundColor: 'red',
    marginLeft: '5px'
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
}));
const Results = props => {
  const classes = useStyles();

  const [round, setRound] = useState({});
  const [students, setStudents] = useState([]);
  const [flag, setFlag] = useState(Boolean(true));
  const changeUpdated = props.changeUpdated;
  const roundNumber = props.roundNumber;
  const driveId = props.driveId;
  const Context = useContext(UserContext);
  console.log("isActive", Context.value.isActive);
  const getAllStudentOfRound = useCallback((driveId, roundId) => {
    RoundService.getAllStudentOfRound(driveId, roundId)
      .then(res => {
        setRound(res.data);
        const data = [];
        res.data.pending.map(student => {
          student.status = 'pending';
          // data.push(student)
        });
        res.data.accepted.map(student => {
          student.status = 'accepted';
          // data.push(student)
        });
        res.data.rejected.map(student => {
          student.status = 'rejected';
          // data.push(student)
        });
        setStudents([
          ...res.data.pending,
          ...res.data.accepted,
          ...res.data.rejected
        ]);
        changeUpdated(0);
      })
      .catch(err => {
        console.log(err);
      });
  });

  if (roundNumber === round.number) {
    getAllStudentOfRound(driveId, props.round.number);
  }

  useEffect(() => {
    if (flag) {
      setFlag(!flag);
      getAllStudentOfRound(driveId, props.round.number);
    }
  }, [driveId, flag, props.round.number, students]);

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
    RoundService.deleteStudentFromRound(driveId, roundId, studentId)
      .then(res => {
        console.log('Done');
        setFlag(true);
      })
      .catch(res => {});
    console.log('delet clicked');
  };

  //Pagination
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
      <Card style={{ minWidth: '100%' }}>
        <PerfectScrollbar>
          <MaterialTable
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
                  rowData.user.last_name
                    .toLowerCase()
                    .includes(term.toLowerCase()),
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
                          <CircularProgress
                            size={14}
                            style={{ color: 'white' }}
                          />
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
                        onClick={() => {
                          addOrRejectStudent(
                            round.number + 1,
                            rowData.id,
                            'accepted'
                          );
                        }}
                      >
                        <NavigateNextIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Rejected">
                      <IconButton
                        onClick={() => {
                          addOrRejectStudent(
                            round.number,
                            rowData.id,
                            'rejected'
                          );
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete student from round">
                      <IconButton
                        onClick={() => {
                          deleteStudentFromRound(round.number, rowData.id);
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
        </PerfectScrollbar>
      </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string
};

export default Results;
