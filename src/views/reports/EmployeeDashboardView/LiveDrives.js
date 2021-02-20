import React, { useState, useEffect } from 'react';
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
  },
  text:{
    color: "#ffffff",
  }
}));

const EligibleDrives = ({ className, ...rest }) => {
  const classes = useStyles();
  const [drives, setDrives] = useState([]);

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
    DriveService.getAllDrives()
      .then(res => {
         filterDrive(res.data);
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
      
      <Typography variant="h3" color="primary">
        Live Drives
      </Typography>
      <Divider style={{ margin: 10 }} />
      <Grid container spacing={3}>
        {drives.map(drive => {
          return (
            <Grid item lg={3} sm={4} xl={3} xs={12} key={drive.id}>
              <a href={'/employee/drive/' + drive.id}>
                <Card className={clsx(classes.root, className)} {...rest}>
                  <CardContent>
                    <Grid container justify="space-between" spacing={3}>
                      <Grid item sm={8} xs={10}>
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
                     
                      <Grid item xs={12} sm >
                        <Avatar className={classes.avatar}>
                        <Typography
                          className={classes.text}
                          variant="h3"
                        >
                          {drive.company.name[0].toUpperCase()}
                        </Typography>
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


