import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
  CardActionArea
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiCurrencyInr } from '@mdi/js';
import moment from 'moment';

import DriveStatusComponent from './DriveStatusComponent';
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

const DriveCard = props => {

  const classes = useStyles();
  const { drive, path } = props;
  const numberFormat = value =>

    new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
      value
    );

  const navigate = useNavigate();

  return (
    <Card      
      onClick={() => navigate(path + drive.id, { replace: true })}
    >
      <CardActionArea>
        <CardContent>
          <Grid container justify="space-between" spacing={3}>
            <Grid item sm={8} xs={10}>
              <Typography color="textSecondary" gutterBottom variant="h6">
                {drive.company.name}
              </Typography>
              <Typography noWrap color="textPrimary" variant="h3">
                {drive.jobtitle}
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="h6">
                {drive.employment_type}
              </Typography>
            </Grid>

            <Grid item xs={12} sm>
              <Avatar className={classes.avatar}>
                <Typography className={classes.text} variant="h3">
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
            <Typography className={classes.differenceValue} variant="body2">
              {numberFormat(drive.min_salary)}
            </Typography>
            <Typography>-</Typography>
            <Icon
              path={mdiCurrencyInr}
              title="Salary Min"
              size={0.8}
              color="green"
            />
            <Typography className={classes.differenceValue} variant="body2">
              {numberFormat(drive.max_salary)}
            </Typography>
          </Box>
          <br />
          <Grid item container>
            <Grid item xs={6}>
              <Typography color="textSecondary" gutterBottom variant="h6">
                {moment(new Date(drive.date)).format('DD/MM/YYYY')}
              </Typography>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}>
              <Typography color="textSecondary" gutterBottom variant="h6">
                <DriveStatusComponent status={drive.status} />
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DriveCard;
