import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Popup from '../../../components/Popup';
import ProfileDetails from './ProfileDetails';
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

const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, setIsEdited, ...rest }) => {
  const classes = useStyles();
  function openPopupWithExtraData() {
    setOpenPopup(true);
  }
  const addOrEdit = (company, resetForm) => {
    if (company.id === 0) 
      console.log('Inserted');
    else 
      console.log('Edited');
    setIsEdited(true)
    resetForm();
    setOpenPopup(false);
  };

  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            openPopupWithExtraData();
          }}
        >
          Add Company
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
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search Company"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Popup
        title="Company Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProfileDetails addOrEdit={addOrEdit} />
      </Popup>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
