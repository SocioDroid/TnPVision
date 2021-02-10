import React, { useState, useEffect } from 'react';
import moment from 'moment';
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


const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  delete: {
    backgroundColor: "red",
    marginLeft: "5px"
  }
}));

const Results = ({ className, ...rest }) => {

  const classes = useStyles();

  const[ posts, setPosts] = useState([]);
  const[ isSalaryNull, setIsSalaryNull] = useState(false);

  const getAllDrives = () => {
    DriveService.getAllDrives()
      .then(res => {        
          setPosts(res.data); 
          if (res.data.min_salary == 0){
            setIsSalaryNull(true);
          }         
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect((props) => {
    getAllDrives();
  }, [])

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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card
    //className={clsx(classes.root, className)}
    //{...rest}
    >

      <PerfectScrollbar>
        <Box >
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
                  Company
                </TableCell>
                <TableCell>
                  Drive Location
                </TableCell>
                <TableCell>
                  Drive Date
                </TableCell>
                <TableCell>
                  Salary                
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
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {
                posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((drive) => (
                posts.map((drive) => (

                <TableRow key={drive.id}>
                  <TableCell>
                    {drive.id} 
                  </TableCell>
                  <TableCell>
                    {drive.jobtitle}
                  </TableCell>
                  <TableCell>
                    {drive.company.name} 
                  </TableCell>
                  <TableCell>
                    {drive.drive_location}
                  </TableCell>
                  <TableCell>
                    {/* {drive.date} */}
                    {moment (new Date(drive.date)).format("DD/MM/YYYY hh:mm a")}
                  </TableCell>
                  {!isSalaryNull?
                  <TableCell>                   
                    {isSalaryNull }{drive.min_salary} - {drive.max_salary} P. A.
                  </TableCell> : <TableCell>Not Disclosed</TableCell>}
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
  )
};

Results.propTypes = {
  // className: PropTypes.string,
  // customers: PropTypes.array.isRequired
};

export default Results;
