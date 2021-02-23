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

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  }
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
            style={{textAlign: '-webkit-right'}}
          >
        {/* <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        > */}
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
            style={{textAlign: 'left', alignSelf: "center"}}
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



