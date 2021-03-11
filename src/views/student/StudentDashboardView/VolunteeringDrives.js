import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Container, Avatar, Card, CardContent, Grid, Typography, colors, Divider, makeStyles} from '@material-ui/core';
import StudentService from '../../../services/StudentService';
import ProgressBar from '../../../components/controls/ProgressBar';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  title: {
    paddingTop: '15px'
  }, 
  avatar: {
    backgroundColor: colors.yellow[600],
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
  const [emptyData, setEmptyData] = useState(false)

  useEffect(() => {
    StudentService.getVolunteeringDrives()
      .then(res => {
        setDrives(res.data);
         if(res.data.length === 0){
          setEmptyData(true)          
         }
      })
      .catch(function(error) {
        setDrives(false);;
      });
  }, []);

  return drives.length > 0 ?(
    <div>
      <Container maxWidth={false} className={classes.root}>
      <Typography className={clsx(classes.title)} variant="h3" color="primary">
        Volunteering Drives
      </Typography>
      <Divider style={{ margin: 10 }} />
      <Grid container spacing={3}>
        {drives.map(drive => {
          return (
            <Grid item lg={3} sm={4} xl={3} xs={12} key={drive.id}>
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
      </Container>
    </div>
  ): (!emptyData && <ProgressBar/>);
};

VolunteeringDrives.propTypes = {
  className: PropTypes.string
};

export default VolunteeringDrives;
