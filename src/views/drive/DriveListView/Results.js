import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { DriveMenuButton } from './DriveMenuButton';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  TablePagination
} from '@material-ui/core';
import DriveService from '../../../services/DriveService';
import CustomSnackbar from '../../../components/Snackbar/CustomSnackbar';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  delete: {
    backgroundColor: 'red',
    marginLeft: '5px'
  }
}));

const Results = ({ className, ...rest }) => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const changeError = () => {
    setIsError(!isError);
  };

  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const [isSalaryNull, setIsSalaryNull] = useState(false);

  const getAllDrives = () => {
    DriveService.getAllDrives()
      .then(res => {
        setPosts(res.data);
        console.log("Settign drive data")
        if (res.data.min_salary == 0) {
          setIsSalaryNull(true);
        }
      })
      .catch(error => {
        if (error.response) {
          // Request made and server responded
          const data = error.response.data
            ? JSON.stringify(error.response.data)
            : 'Error!';
          const statuscode = error.response.status;
          switch (statuscode) {
            case 400:
              console.log(data);
              setErrorMessage(data);
              console.log('400 ERRORRR');
              break;
            case 401:
              setErrorMessage(
                'Unauthenticated ! Please login to continue ' + data
              );
              console.log('401 ERRORRR');
              navigate('/login', { replace: true });
              break;
            case 403:
              console.log('403 error! ' + data);
              setErrorMessage('403 Error. Please try again ' + data);
              break;
            case 500:
              console.log('500 ERROR ' + data);
              setErrorMessage('Server Error. Please try again ' + data);
              break;
            default:
              console.log('Navin Error ' + data);
              setErrorMessage('New Error, add it to catch block ' + data);
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          setErrorMessage('Server Error, Please try again');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          setErrorMessage('Unknown error, please contact admin!');
        }
        setIsError(true);
      });
  };

  useEffect(props => {
    getAllDrives();
  }, []);

  const goToEdit = (id, e) => {
    e.preventDefault();
    console.log(id);
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
    <div>
      <Card
      //className={clsx(classes.root, className)}
      //{...rest}
      >
        <PerfectScrollbar>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Drive Location</TableCell>
                  <TableCell>Drive Date</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell>Tenth</TableCell>
                  <TableCell>Twelfth</TableCell>
                  <TableCell>Diploma</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(drive =>(
                      <TableRow key={drive.id}>
                        <TableCell>{drive.id}</TableCell>
                        <TableCell>{drive.jobtitle}</TableCell>
                        <TableCell>{drive.company.name}</TableCell>
                        <TableCell>{drive.drive_location}</TableCell>
                        <TableCell>
                          {/* {drive.date} */}
                          {moment(new Date(drive.date)).format(
                            'DD/MM/YYYY hh:mm a'
                          )}
                        </TableCell>
                        {!isSalaryNull ? (
                          <TableCell>
                            {isSalaryNull}
                            {drive.min_salary} - {drive.max_salary} P. A.
                          </TableCell>
                        ) : (
                          <TableCell>Not Disclosed</TableCell>
                        )}
                        <TableCell>{drive.tenth}</TableCell>
                        <TableCell>{drive.twelth}</TableCell>
                        <TableCell>{drive.diploma}</TableCell>
                        <TableCell>
                          <DriveMenuButton goToEdit={goToEdit} row={drive} />
                        </TableCell>
                      </TableRow>
                    )
                  )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={posts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Box>
        </PerfectScrollbar>
      </Card>

      <div>
        {isError && (
          <CustomSnackbar
            changeError={changeError}
            severity="error"
            message={errorMessage}
          />
        )}
      </div>
    </div>
  );
};

Results.propTypes = {
  // className: PropTypes.string,
  // customers: PropTypes.array.isRequired
};

export default Results;
