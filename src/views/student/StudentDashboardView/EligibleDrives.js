import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  colors,
  Divider,
  makeStyles
} from '@material-ui/core';
import StudentService from '../../../services/StudentService';
import ProgressBar from '../../../components/controls/ProgressBar';
import DriveCard from '../../../components/DriveCardComponent'
const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
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
  }
}));

const EligibleDrives = ({ className, ...rest }) => {
  const classes = useStyles();
  const [drives, setDrives] = useState([]);
  const [emptyData, setEmptyData] = useState(false);

  const numberFormat = value =>
    new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
      value
    );

  useEffect(() => {
    StudentService.getEligibleDrives()
      .then(res => {
        setDrives(res.data);
        if (res.data.length === 0) {
          setEmptyData(true);
        }
      })
      .catch(function(error) {
        setDrives(false);
      });
  }, []);
  const navigate = useNavigate();
  return drives.length > 0 ? (
    <div>
      <Container maxWidth={false} className={classes.root}>
        <Typography variant="h3" color="primary">
          Eligible Drives
        </Typography>
        <Divider style={{ margin: 10 }} />
        <Grid container spacing={3}>
          {drives.map(drive => {
            return (
              <Grid item lg={4} sm={4} xl={4} xs={12} key={drive.id}>
                  <DriveCard drive={drive} path={'/student/drive/'}/>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  ) : (
    !emptyData && <ProgressBar />
  );
};

EligibleDrives.propTypes = {
  className: PropTypes.string
};

export default EligibleDrives;
