import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
  Grid
} from '@material-ui/core';


const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
  desktopGrid1:{
    textAlign: '-webkit-right',
    [theme.breakpoints.down('sm')]: {
      textAlign: '-webkit-center'
    }
  },
  desktopGrid2:{
    textAlign: 'left', 
    alignSelf: "center",
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center', 
      alignSelf: "center",
    }
  },
}));

const Profile = ({ className, userData, ...rest }) => {
  const classes = useStyles();  

  
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
      <Grid
          direction="row"
          container
          spacing={3}
          
        >
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
            className={classes.desktopGrid1}
          >
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
        </Grid>
        <Grid
            item
            lg={6}
            md={6}
            xs={12}
            className={classes.desktopGrid2}
          >
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {userData.user && userData.user.first_name ? (userData.user.first_name+" "+userData.user.last_name): ""}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {userData.user && userData.user.email ? userData.user.email : ""}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')} ${user.timezone}`}
          </Typography>
        {/* </Box> */}
        </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;



