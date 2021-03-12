import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  colors,
  Divider,
  makeStyles,
} from '@material-ui/core';

import DriveService from '../../../services/DriveService';
import ProgressBar from '../../../components/controls/ProgressBar';
import DriveCard from '../../../components/DriveCardComponent'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },

  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    marginRight: theme.spacing(1)
  },
  text: {
    color: '#ffffff'
  }
}));

const EligibleDrives = ({ className, ...rest }) => {
  const classes = useStyles();
  const [drives, setDrives] = useState([]);

  const numberFormat = value =>
    new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
      value
    );

  function filterDrive(d) {
    for (var i = 0; i < d.length; i++) {
      const date1 = new Date(d[i].date);
      const date2 = new Date();
      const diffDays = date1.getDate() - date2.getDate();

      console.log(diffDays + ' days');
      if (diffDays <= 1000) {
        console.log('Valid', d[i]);
        continue;
      } else {
        console.log('Invalid', d[i]);
        delete d[i];
      }
    }
   
    setDrives(d);
  }

  useEffect(() => {
    DriveService.getAllDrives()
      .then(res => {
        filterDrive(res.data);
        setDrives(res.data);
        console.log('Response Received : ', res.data);
      })
      .catch(function(error) {
        //console.log('Error Fetching data');
        setDrives(false);
      });
  }, []);
  console.log(drives, 'Drives : ');
  const navigate = useNavigate();

  return drives.length > 0 ? (
    <div>
      <Typography variant="h3" color="primary">
        Live Drives
      </Typography>
      <Divider style={{ margin: 10 }} />
      <Grid container spacing={3}>
        {drives.map(drive => {
          return (
            <Grid item lg={3} sm={4} xl={3} xs={12} key={drive.id}>
              <DriveCard drive={drive} path={'/employee/drive/'}/>
            </Grid>
          );
        })}
      </Grid>
    </div>
  ) : (
    <ProgressBar />
  );
};

EligibleDrives.propTypes = {
  className: PropTypes.string
};

export default EligibleDrives;
