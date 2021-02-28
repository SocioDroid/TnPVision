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
import { useNavigate } from 'react-router-dom';
import MaterialTable from 'material-table'
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
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
  
  const { students, roundId } = props;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (

    <Paper className={classes.root}>
       <MaterialTable
            style={{
              fontSize: "14px",
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
                render: rowData => rowData.user.first_name + ' ' + rowData.user.last_name
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
                        rowData.status === 'accepted'
                          ? <DoneIcon  style={{ color: 'white' }}/>
                          : rowData.status === 'rejected'
                          ? <CloseIcon style={{ color: 'white' }}/>
                          : <CircularProgress size={14} style={{ color: 'white' }}/>

                      }
                      size="small"
                      label={rowData.status}
                    />
                  </React.Fragment>
                )
              },
              // {
              //   title: 'Actions',
              //   field: 'action',
              //   filtering: false,
              //   render: rowData => (
              //     <React.Fragment>
              //       <Tooltip title="Qualified for next round">
              //         <IconButton
              //           onClick={() => {
              //             addOrRejectStudent(
              //               round.number + 1,
              //               rowData.id,
              //               'accepted'
              //             );
              //           }}
              //         >
              //           <NavigateNextIcon />
              //         </IconButton>
              //       </Tooltip>
              //       <Tooltip title="Rejected">
              //         <IconButton
              //           onClick={() => {
              //             addOrRejectStudent(
              //               round.number,
              //               rowData.id,
              //               'rejected'
              //             );
              //           }}
              //         >
              //           <CloseIcon />
              //         </IconButton>
              //       </Tooltip>
              //       <Tooltip title="Delete student from round">
              //         <IconButton
              //           onClick={() => {
              //             deleteStudentFromRound(round.number, rowData.id);
              //           }}
              //         >
              //           <DeleteIcon />
              //         </IconButton>
              //       </Tooltip>
              //     </React.Fragment>
              //   )
              // }
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
