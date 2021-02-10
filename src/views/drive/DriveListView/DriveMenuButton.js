import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  Typography,
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

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  },
  uploadPop: {
    padding: theme.spacing(3)
  },
  blackColor:{
    color: '#263238'
  }
}));
export function DriveMenuButton({ row, goToEdit }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [posts, setPosts] = useState([]);
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
  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const getAllDrives = () => {
    DriveService.getAllDrives()
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
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
        setTimeout(window.location.reload(false), 2000);
      })
      .catch(err => {
        console.log(err);
        setTimeout(window.location.reload(false), 2000);
      });
  };
  function openPopupWithExtraData(id) {
    console.log('Student in func : ' + id);
    DriveService.getSingleDrive({ id: id })
      .then(res => {
        console.log('in Result  : ' + res.data);
        openInPopup(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  const addOrEdit = (drive, resetForm) => {
    if (drive.id === 0) console.log('Inserted');
    else console.log('Edited');
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    console.log('From add or edit');
    getAllDrives();
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
        'http://20.37.50.140:8000/api/drive/'+id +'/shortlisted/',
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
        console.log(error);
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
    </>
  );
}
