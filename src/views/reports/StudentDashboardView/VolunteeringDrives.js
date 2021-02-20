import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  Divider,
  makeStyles
} from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';
import Auth from '../../../auth';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },

  title: {
    paddingTop: '15px'
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

const VolunteeringDrives = ({ className, ...rest }) => {
  const classes = useStyles();
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    axios
      .get('http://20.37.50.140:8000/api/student/volunteeringDrives', {
        headers: {
          Authorization: 'Token ' + Auth.getToken()
        }
      })
      .then(res => {
        setDrives(res.data);
        console.log('Response Received : ', res.data);
      })
      .catch(function(error) {
        console.log('Error Fetching data');
        setDrives(false);
      });
  }, []);

  return drives.length > 0 ?(
    <div>
      
      <Typography className={clsx(classes.title)} variant="h3" color="primary">
        Volunteering Drives
      </Typography>
      <Divider style={{ margin: 10 }} />
      <Grid container spacing={3}>
        {drives.map(drive => {
          return (
            <Grid item lg={3} sm={6} xl={3} xs={12} key={drive.id}>
              <a href={'/student/drive/' + drive.id}>
                <Card className={clsx(classes.root, className)} {...rest}>
                  <CardContent>
                    <Grid container justify="space-between" spacing={3}>
                      <Grid item lg={8} sm={8} xl={8} xs={8}>
                        <Typography
                          color="textSecondary"
                          gutterBottom
                          variant="h6"
                        >
                          {drive.company_name}
                        </Typography>
                        <Typography noWrap color="textPrimary" variant="h3">
                          {drive.jobtitle}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          gutterBottom
                          variant="h6"
                        >
                          {drive.employment_type}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Avatar className={classes.avatar}>
                          <MoneyIcon />
                        </Avatar>
                      </Grid>
                      <Grid item>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="h6"
                          >
                            {moment (new Date(drive.date)).format("DD/MM/YYYY hh:mm A")}
                          </Typography>
                      </Grid>
                    </Grid>                    
                  </CardContent>
                </Card>
              </a>
            </Grid>
          );
        })}
      </Grid>
    </div>
  ): null;
};

VolunteeringDrives.propTypes = {
  className: PropTypes.string
};

export default VolunteeringDrives;
