import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import Auth from '../../../auth';

import DriveService from '../../../services/DriveService';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { NavLink } from 'react-router-dom';
import Popup from '../../../components/Popup';
import ProfileDetails from './ProfileDetails';
import Popover from '@material-ui/core/Popover';
import { useNavigate } from 'react-router-dom';
import CustomSnackbar from '../../../components/Snackbar/CustomSnackbar';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  },
  uploadPop: {
    padding: theme.spacing(3)
  },
  blackColor: {
    color: '#263238'
  }
}));
export function DriveMenuButton({ row, setIsEdited, goToEdit }) {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const changeError = () => {
    setIsError(!isError);
  };

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  //const [posts, setPosts] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [anchorElPop, setAnchorElPop] = useState(null);
  const handlePopClick = event => {
    setAnchorElPop(event.currentTarget);
  };
  const open = Boolean(anchorElPop);
  const id = open ? 'simple-popover' : undefined;

  const handlePopClose = () => {
    setAnchorElPop(null);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const getAllDrives = () => {
  //   DriveService.getAllDrives()
  //     .then(res => {
  //       setPosts(res.data);
  //     })
  //     .catch(error => {
  //       if (error.response) {
  //         // Request made and server responded
  //         const data = error.response.data?JSON.stringify(error.response.data):"Error!";
  //         const statuscode = error.response.status;
  //         switch (statuscode) {
  //           case 400:
  //             console.log(data)
  //             setErrorMessage(data);
  //             console.log("400 ERRORRR")
  //             break;
  //           case 401:
  //             setErrorMessage("Unauthenticated ! Please login to continue "+data);
  //             console.log("401 ERRORRR")
  //             navigate('/login', { replace: true });
  //             break;  
  //           case 403:
  //             console.log('403 error! '+data);
  //             setErrorMessage("403 Error. Please try again "+data);
  //             break;
  //           case 500:
  //             console.log("500 ERROR "+data);
  //             setErrorMessage("Server Error. Please try again "+data);
  //             break
  //           default:
  //             console.log("Navin Error "+data);
  //             setErrorMessage("New Error, add it to catch block "+data);              
  //         }
          
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         console.log(error.request);
  //         setErrorMessage("Server Error, Please try again");              
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.log('Error', error.message);
  //         setErrorMessage("Unknown error, please contact admin!");                      
  //       }
  //       setIsError(true);
  //     });
  // };

  function downloadEligible(id) {
    DriveService.downloadEligible({ id: id.id }).then(({ data }) => {
      const downloadUrl = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', id.jobtitle + '_Eligible_Students.xlsx'); //any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }

  const deleteDrive = id => {
    console.log('Student in func : ' + id);
    DriveService.deleteDrive({ id: id })
      .then(res => {
        console.log('in Result  : ' + res.data);
        // setTimeout(window.location.reload(false), 2000);
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
  function openPopupWithExtraData(id) {
    console.log('Student in func : ' + id);
    DriveService.getSingleDrive({ id: id })
      .then(res => {
        console.log('in Result  : ' + res.data);
        openInPopup(res.data);
      })
      .catch(error => {
        if (error.response) {
          // Request made and server responded
          const data = error.response.data?JSON.stringify(error.response.data):"Error!";
          const statuscode = error.response.status;
          switch (statuscode) {
            case 400:
              console.log(data)
              setErrorMessage(data);
              console.log("400 ERRORRR")
              break;
            case 401:
              setErrorMessage("Unauthenticated ! Please login to continue "+data);
              console.log("401 ERRORRR")
              navigate('/login', { replace: true });
              break;  
            case 403:
              console.log('403 error! '+data);
              setErrorMessage("403 Error. Please try again "+data);
              break;
            case 500:
              console.log("500 ERROR "+data);
              setErrorMessage("Server Error. Please try again "+data);
              break
            default:
              console.log("Navin Error "+data);
              setErrorMessage("New Error, add it to catch block "+data);              
          }
          
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          setErrorMessage("Server Error, Please try again");              
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          setErrorMessage("Unknown error, please contact admin!");                      
        }
        setIsError(true);
      });
  }
  const addOrEdit = (drive, resetForm) => {
    if (drive.id === 0) console.log('Inserted');
    else console.log('Edited');
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    console.log('From add or edit');
    setIsEdited(true);
  };
  const openInPopup = item => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = event => {
    console.log('file', event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };
  const handleFileClick = id => {
    const data = new FormData();
    data.append('file', selectedFile);
    console.log(selectedFile);
    axios
      .post(
        'http://20.37.50.140:8000/api/drive/' + id + '/shortlisted/',
        data,
        {
          headers: {
            'Content-type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: 'Token ' + Auth.getToken()
          }
        }
      )
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        if (error.response) {
          // Request made and server responded
          const data = error.response.data?JSON.stringify(error.response.data):"Error!";
          const statuscode = error.response.status;
          switch (statuscode) {
            case 400:
              console.log(data)
              setErrorMessage(data);
              console.log("400 ERRORRR")
              break;
            case 401:
              setErrorMessage("Unauthenticated ! Please login to continue "+data);
              console.log("401 ERRORRR")
              navigate('/login', { replace: true });
              break;  
            case 403:
              console.log('403 error! '+data);
              setErrorMessage("403 Error. Please try again "+data);
              break;
            case 500:
              console.log("500 ERROR "+data);
              setErrorMessage("Server Error. Please try again "+data);
              break
            default:
              console.log("Navin Error "+data);
              setErrorMessage("New Error, add it to catch block "+data);              
          }
          
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          setErrorMessage("Server Error, Please try again");              
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          setErrorMessage("Unknown error, please contact admin!");                      
        }
        setIsError(true);
      });
  };
  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={`actions-${row.id}`}
        anchorEl={anchorEl}
        //keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            openPopupWithExtraData(row.id);
            handleClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem>
          <NavLink
            className={classes.blackColor}
            activeClassName="is-active"
            to={{
              pathname: '/employee/afterdrive/' + row.id
            }}
          >
            Details
          </NavLink>
        </MenuItem>
        <MenuItem
          onClick={() => {
            downloadEligible(row);
            handleClose();
          }}
        >
          Download Eligible Students
        </MenuItem>
        <MenuItem onClick={handlePopClick}>
          Upload Shortlisted Students
        </MenuItem>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorElPop}
          onClose={handlePopClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
        >
          <div className={classes.uploadPop}>
            <input
              type="file"
              name="file"
              onChange={event => handleFileChange(event)}
            />
            <Button
              type="button"
              onClick={() => handleFileClick(row.id)}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              {' '}
              Upload
            </Button>
          </div>
        </Popover>
        <MenuItem
          onClick={() => {
            deleteDrive(row.id);
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      <Popup
        title="Drive Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProfileDetails recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <div>
        {isError && (
          <CustomSnackbar
            changeError={changeError}
            severity="error"
            message={errorMessage}
          />
        )}
      </div>
    </>
  );
}
