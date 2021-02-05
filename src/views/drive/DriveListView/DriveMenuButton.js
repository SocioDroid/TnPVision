import React,{useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';

import DriveService from '../../../services/DriveService';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { NavLink } from "react-router-dom";
import Popup from "../../../components/Popup";
import ProfileDetails from "./ProfileDetails";

export function DriveMenuButton({ row, goToEdit }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPopup, setOpenPopup] = useState(false)
  const[ posts, setPosts] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null)

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
      .catch( err => {
          console.log(err);
      })
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
    if (drive.id === 0)
        console.log("Inserted");
    else
        console.log("Edited");
    resetForm()
    setRecordForEdit(null)
    setOpenPopup(false)
    console.log("From add or edit")
    getAllDrives();
}
  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
}
const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
          }}
        >
          Edit
        </MenuItem>
        <MenuItem>
          <NavLink
            className="navbar-item"
            activeClassName="is-active"
            to="/employee/afterdrive"
          >
            Details
            </NavLink>

        </MenuItem>
        <MenuItem
          onClick={() => {
            deleteDrive(row.id);
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
        <ProfileDetails
            recordForEdit={recordForEdit}
            addOrEdit={addOrEdit} />
    </Popup>
    </>
  );
}
