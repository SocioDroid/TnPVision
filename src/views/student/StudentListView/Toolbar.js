import React, { useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles, Grid
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import Popup from "../../../components/Popup";
import ProfileDetails from "./ProfileDetails";

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
  const [openPopup, setOpenPopup] = useState(false);

  const handleClick =() =>{
    setOpenPopup(true)
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >

      <Box mt={3} >
        <Card>
          <CardContent>
          <Grid container direction="row" alignItems="center" >
        <Grid item xs={12} sm={6} >
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
                placeholder="Search customer"
                variant="outlined"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} style={{ textAlign: "right"}} >
            {/* <Box mt={3} > */}
            <Button
          color="primary"
          variant="contained"
          onClick={handleClick}
        >
          Add Student
        </Button>
        {/* </Box> */}
        </Grid>
        </Grid>
          </CardContent>
        </Card>

      </Box>
      <Popup
        title="Student Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProfileDetails
             />
    </Popup>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
