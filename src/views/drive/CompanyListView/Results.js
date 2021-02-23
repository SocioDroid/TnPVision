import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
  makeStyles,
  TablePagination
} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CompanyService from '../../../services/CompanyService';

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

  const getAllCompanies = () => {
    CompanyService.getAllCompanies()
      .then(res => {        
          setPosts(res.data);          
      })
      .catch( err => {
          console.log(err);
      })
  }

    useEffect((props) => {
      getAllCompanies();
    }, [])

    const deleteCompany = (id) => {
      console.log("Student in func : "+ id);
      CompanyService.deleteCompanies({id: id})
      .then(res => {
          console.log("in Result  : "+res.data);
          getAllCompanies();                
      })
      .catch( err => {
          console.log(err);
      })

    }
    function openPopupWithExtraData(id){
      console.log("Student in func : "+ id);
      CompanyService.getSingleCompany({id: id})
      .then(res => {
          console.log("in Result  : "+res.data);                
          openInPopup(res.data);
      })
      .catch( err => {
          console.log(err);
      })
    }

    const addOrEdit = (company, resetForm) => {
      if (company.id === 0)
          console.log("Inserted");
      else
          console.log("Edited");
      resetForm()
      setRecordForEdit(null)
      setOpenPopup(false)
      console.log("From add or edit")
      getAllCompanies();
  }
    const openInPopup = item => {
      setRecordForEdit(item)
      setOpenPopup(true)
  }

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
      // className={clsx(classes.root, className)}
      // {...rest}
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
                  Name
                </TableCell>
                <TableCell>
                  Website
                </TableCell>
                <TableCell>
                  Industry
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    {company.id} 
                  </TableCell>
                  <TableCell>
                    {company.name}
                  </TableCell>
                  <TableCell>
                    {company.website}
                  </TableCell>
                  <TableCell>
                    {company.industry}
                  </TableCell>
                  <TableCell>
                  <Fab size="small" color="primary" aria-label="edit" onClick={()=>{openPopupWithExtraData(company.id)}}>
                    <EditIcon />
                  </Fab>
                  <Fab size="small" color="secondary"  className={classes.delete} aria-label="delete" onClick={()=>{deleteCompany(company.id)}}>
                    <DeleteIcon />
                  </Fab>
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

     <Popup
        title="Company Form"
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
