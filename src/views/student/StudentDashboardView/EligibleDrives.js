import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Avatar, Box, Card, CardContent, Grid, Typography, colors, Divider, makeStyles} from '@material-ui/core';
import StudentService from '../../../services/StudentService';
import Icon from '@mdi/react';
import { mdiCurrencyInr } from '@mdi/js';
import moment from 'moment';
import ProgressBar from '../../../components/controls/ProgressBar';

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
  const [emptyData, setEmptyData] = useState(false)

  const numberFormat = value =>
    new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
      value
    );

  useEffect(() => {
    StudentService.getEligibleDrives()
      .then(res => {
        setDrives(res.data);
        if(res.data.length === 0){
          setEmptyData(true)
         }
      })
      .catch(function(error) {
        setDrives(false);
      });
  }, []);

  return drives.length > 0 ?(
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
              <a href={'/student/drive/' + drive.id}>
                <Card>
                  <CardContent>
                    <Grid container justify="space-between" spacing={3}>
                      <Grid item sm={8} xs={10}>
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
                     
                      <Grid item xs={12} sm>
                        <Avatar className={classes.avatar}>
                        <Typography
                          className={classes.text}
                          variant="h3"
                        >
                          {drive.company_name[0].toUpperCase()}
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
      </Container>
    </div>
  ): (!emptyData && <ProgressBar/>);
};

EligibleDrives.propTypes = {
  className: PropTypes.string
};

export default EligibleDrives;
