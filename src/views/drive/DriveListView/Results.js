import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useTable from "../../../components/useTable";
import Popup from "../../../components/Popup";
import ProfileDetails from "./ProfileDetails"
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DriveService from '../../../services/DriveService';


const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  delete:{
    backgroundColor: "red",
    marginLeft: "5px"
  }
}));

const Results = ({ className, ...rest }) => {

  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const[ posts, setPosts] = useState([]);

  const getAllDrives = () => {
    DriveService.getAllDrives()
      .then(res => {        
          setPosts(res.data);          
      })
      .catch( err => {
          console.log(err);
      })
  }

    useEffect((props) => {
      getAllDrives();
    }, [])

    const deleteDrive = (id) => {
      console.log("Student in func : "+ id);
      DriveService.deleteDrive({id: id})
      .then(res => {
          console.log("in Result  : "+res.data);
          getAllDrives();                
      })
      .catch( err => {
          console.log(err);
      })

    }
    function openPopupWithExtraData(id){
      console.log("Student in func : "+ id);
      DriveService.getSingleDrive({id: id})
      .then(res => {
          console.log("in Result  : "+res.data);                
          openInPopup(res.data);
      })
      .catch( err => {
          console.log(err);
      })
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

  return (
    <Card
      //className={clsx(classes.root, className)}
      //{...rest}
    >
      
        <PerfectScrollbar>
          <Box minWidth={1050}>  
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  Job Title
                </TableCell>
                <TableCell>
                  Drive Location
                </TableCell>
                <TableCell>
                  Drive Date
                </TableCell>
                <TableCell>
                  Minimum Salary
                </TableCell>
                <TableCell>
                  Maximum Salary
                </TableCell>
                <TableCell>
                  Tenth
                </TableCell>
                <TableCell>
                  Twelfth
                </TableCell>
                <TableCell>
                  Diploma
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
              {
                posts.map((drive) => (
                <TableRow key={drive.id}>
                  <TableCell>
                    {drive.id} 
                  </TableCell>
                  <TableCell>
                    {drive.jobtitle}
                  </TableCell>
                  <TableCell>
                    {drive.drive_location}
                  </TableCell>
                  <TableCell>
                    {drive.date}
                  </TableCell>
                  <TableCell>
                    {drive.min_salary}
                  </TableCell>
                  <TableCell>
                    {drive.max_salary}
                  </TableCell>
                  <TableCell>
                    {drive.tenth}
                  </TableCell>
                  <TableCell>
                    {drive.twelth}
                  </TableCell>
                  <TableCell>
                    {drive.diploma}
                  </TableCell>
                  <TableCell>
                  <Fab size="small" color="primary" aria-label="edit" onClick={()=>{openPopupWithExtraData(drive.id)}}>
                    <EditIcon />
                  </Fab>
                  <Fab size="small" color="secondary"  className={classes.delete} aria-label="delete" onClick={()=>{deleteDrive(drive.id)}}>
                    <DeleteIcon />
                  </Fab>
                  </TableCell>
                </TableRow>
              )
              
                )}

            </TableBody>
          </Table>

        </Box>
        </PerfectScrollbar>

     <Popup
        title="Drive Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProfileDetails
            recordForEdit={recordForEdit}
            addOrEdit={addOrEdit} />
    </Popup>
    </Card>
  )
};

Results.propTypes = {
  // className: PropTypes.string,
  // customers: PropTypes.array.isRequired
};

export default Results;
