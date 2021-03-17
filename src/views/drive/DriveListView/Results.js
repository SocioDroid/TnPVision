import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { DriveMenuButton } from './DriveMenuButton';
import { Box, Card, Button, makeStyles } from '@material-ui/core';
import DriveService from '../../../services/DriveService';
import CustomSnackbar from '../../../components/Snackbar/CustomSnackbar';
import MaterialTable from 'material-table'
import DriveStatusComponent from '../../../components/DriveStatusComponent'
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(1)
  },
  table: {
    fontSize : "100px",
  }
}));

const Results = ({ className, ...rest }) => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const changeError = () => {
    setIsError(!isError);
  };

  const [posts, setPosts] = useState([]);
  const [isEdited, setIsEdited] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const classes = useStyles();
  const getAllDrives = () => {
    DriveService.getAllDrives()
      .then(res => {
        setPosts(res.data);
        setIsDataLoading(false);
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
      <Card>       
        <PerfectScrollbar>
          <Card>
            <MaterialTable
            style={{
              fontSize: "14px"
            }}
              className = {classes.table}
              title="Drive Details"
              columns={[
                { title: 'ID', tableLayout: "auto", field: 'id', filtering: false },
                { title: 'Job Title', field: 'jobtitle' },
                { title: 'Location', field: 'drive_location' },
                {
                  title: 'Drive Date', field: 'date', render: rowData => moment(rowData.date).format('DD MMM, YYYY'), cellStyle: {
                    width: 250,
                    maxWidth: 250,
                  }
                },
                { title: 'Company', field: 'company.name' },
                { title: 'Salary', field: 'min_salary', render: rowData => rowData.hideSalary ? 'Not Disclosed' : rowData.min_salary + "-" + rowData.max_salary, },
                { title: 'Tenth', field: 'tenth' },
                { title: 'Twelth', field: 'twelth' },
                { title: 'Diploma', field: 'diploma' },
                { title: 'Status', field: 'status', lookup: { "completed": "completed", "live": "live", "inactive": "inactive", "paused": "paused"}, render: rowData => <DriveStatusComponent status={rowData.status}/> },
                { title: 'Actions', field: 'action', filtering: false, render: rowData => <DriveMenuButton setIsEdited={setIsEdited} goToEdit={goToEdit} row={rowData} setPosts={setPosts} />, }
              ]}
              data={posts}
              options={{
                emptyRowsWhenPaging: false,
                filtering: true,
                rowStyle: {                 
                  fontFamily : "Roboto, Helvetica , Arial, sans-serif",              
                }
              }}
              isLoading={isDataLoading}
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

export default Results;
