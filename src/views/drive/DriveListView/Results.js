import React, { Component, useState, useEffect } from 'react';
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
  TablePagination, 
  Button
} from '@material-ui/core';
import DriveService from '../../../services/DriveService';
import CustomSnackbar from '../../../components/Snackbar/CustomSnackbar';
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'



const Results = ({ className, ...rest }) => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const changeError = () => {
    setIsError(!isError);
  };

  const [posts, setPosts] = useState([]);
  const [isEdited, setIsEdited] = useState(true);

  const getAllDrives = () => {
    DriveService.getAllDrives()
      .then(res => {
        // res.data.forEach(drive => {
        //   drive.date = moment(new Date(drive.date)).format('DD/MM/YYYY hh:mm a')
        // });
        setPosts(res.data);
        console.log("Settign drive data")
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
    if (isEdited) {
      getAllDrives();
      setIsEdited(false);
    }
  }, [isEdited, posts]);

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
      <Box
        display="flex"
        justifyContent="flex-end"
        marginBottom="2%"
      >
        <Button
          color="primary"
          variant="contained"
          onClick={()=>{navigate('/employee/drive', { replace: true });}}
        >
          Add Drive
        </Button>
     </Box>   
      <Card
      
      //className={clsx(classes.root, className)}
      //{...rest}
      >
        {/* <PerfectScrollbar>
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
                          {moment(new Date(drive.date)).format(
                            'DD/MM/YYYY hh:mm a'
                          )}
                        </TableCell>
                        
                          <TableCell>
                            {drive.min_salary} - {drive.max_salary}
                          </TableCell>
                       
                        <TableCell>{drive.tenth}</TableCell>
                        <TableCell>{drive.twelth}</TableCell>
                        <TableCell>{drive.diploma}</TableCell>
                        <TableCell>
                          <DriveMenuButton setIsEdited={setIsEdited} goToEdit={goToEdit} row={drive} />
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
      
      <br/>
      <br/>
       */}
       
        <PerfectScrollbar>
          <Card>
            <MaterialTable
              title="Drive Details"
              columns={[
                { title: 'ID', tableLayout: "auto", field: 'id', filtering: false },
                { title: 'Job Title', field: 'jobtitle' },
                { title: 'Location', field: 'drive_location' },
                {
                  title: 'Drive Date', field: 'date', dateSetting: { locale: 'en-US' }, type: 'datetime', cellStyle: {
                    width: 250,
                    maxWidth: 250,
                  }
                },
                { title: 'Company', field: 'company.name' },
                { title: 'Salary', field: 'min_salary', render: rowData => rowData.hideSalary ? 'Not Disclosed' : rowData.min_salary + "-" + rowData.max_salary, },
                { title: 'Tenth', field: 'tenth' },
                { title: 'Twelth', field: 'twelth' },
                { title: 'Diploma', field: 'diploma' },
                { title: 'Actions', field: 'action', filtering: false, render: rowData => <DriveMenuButton setIsEdited={setIsEdited} goToEdit={goToEdit} row={rowData} setPosts={setPosts} />, }
              ]}
              data={posts}
              options={{
                filtering: true
              }}
            />
          </Card>
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
