import React,{useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Popup from "../../../components/Popup";
import CompanyDrive from "../DriveUpload/DriveUploadForm";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  function openPopupWithExtraData(){
    openInPopup();
  }
  const openInPopup = item => {
    setOpenPopup(true)
  }
  const [openPopup, setOpenPopup] = useState(false)

  const navigate = useNavigate();
  const addOrEdit = (company, resetForm) => {
    if (company.id === 0)
        console.log("Inserted");
    else
        console.log("Edited");
        resetForm()
        setOpenPopup(false)
}
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button className={classes.importButton}>
          Import
        </Button>
        <Button className={classes.exportButton}>
          Export
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={()=>{navigate('/employee/drive', { replace: true });}}
        >
          Add Drive
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search Drive"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Popup
          title="Drive Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
      >
          <CompanyDrive addOrEdit={addOrEdit}/>
      </Popup>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
