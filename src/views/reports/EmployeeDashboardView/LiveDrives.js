import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  Divider,
  makeStyles
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import Auth from '../../../auth';
import axios from 'axios';
import Icon from '@mdi/react';
import { mdiCurrencyInr } from '@mdi/js';
import moment from 'moment';
import DriveService from '../../../services/DriveService'

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
  }
}));

const EligibleDrives = ({ className, ...rest }) => {
  const classes = useStyles();
  const [drives, setDrives] = useState([]);
  // const history= useHistory();

  const numberFormat = value =>
    new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
      value
    );

  function filterDrive(d){
    for(var i = 0; i<d.length; i++)
    {
      const date1 = new Date(d[i].date);
      const date2 = new Date();
      const diffDays = date1.getDate() - date2.getDate(); 
      console.log(diffDays + " days");
      if (diffDays <= 10)
        console.log("Valid", d[i]);
      else{
        console.log("Invalid", d[i]);
        delete d[i];
      }
    }
    console.table(d);
    console.log("print=====")
    setDrives(d);
  }
  useEffect(() => {
    // axios
    //   .get('http://20.37.50.140:8000/api/student/eligibleDrives', {
    //     headers: {
    //       Authorization: 'Token ' + Auth.getToken() //the token is a variable which holds the token
    //     }
    //   })
    DriveService.getAllDrives()
      .then(res => {
        filterDrive(res.data);
        //setDrives(res.data);
        console.log('Response Received : ', res.data);
      })
      .catch(function(error) {
        console.log('Error Fetching data');
        setDrives(false);
        // props.showError("Session Invalid");
        // history.push("/");
        // localStorage.removeItem("userToken");
      });
  }, []);

  return drives.length > 0 ?(
    <div>
      
      <Typography variant="h3" color="primary">
        Live Drives
      </Typography>
      <Divider style={{ margin: 10 }} />
      <Grid container spacing={3}>
        {drives.map(drive => {
          return (
            <Grid item lg={3} sm={6} xl={3} xs={12} key={drive.id}>
              <a href={'/employee/drive/' + drive.id}>
                <Card className={clsx(classes.root, className)} {...rest}>
                  <CardContent>
                    <Grid container justify="space-between" spacing={3}>
                      <Grid item lg={8} sm={8} xl={8} xs={8}>
                        <Typography
                          color="textSecondary"
                          gutterBottom
                          variant="h6"
                        >
                          {drive.company.name}
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
                    </Grid>
                    <Box mt={2} display="flex" alignItems="center">
                      <Icon
                        path={mdiCurrencyInr}
                        title="Salary Min"
                        size={0.8}
                        color="green"
                      />
                      <Typography
                        className={classes.differenceValue}
                        variant="body2"
                      >
                        {numberFormat(drive.min_salary)}
                      </Typography>
                      <Typography>-</Typography>
                      <Icon
                        path={mdiCurrencyInr}
                        title="Salary Min"
                        size={0.8}
                        color="green"
                      />
                      <Typography
                        className={classes.differenceValue}
                        variant="body2"
                      >
                        {numberFormat(drive.max_salary)}
                      </Typography>
                    </Box>
                    <Grid item>
                      <br/>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="h6"
                          >
                            {moment (new Date(drive.date)).format("DD/MM/YYYY hh:mm A")}
                          </Typography>
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

EligibleDrives.propTypes = {
  className: PropTypes.string
};

export default EligibleDrives;
