import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import NavItem from './NavItem';
import StudentService from '../../../../services/StudentService';
import {  faCog,  faUserCircle,  faChartLine}  from '@fortawesome/free-solid-svg-icons'
import Auth from '../../../../auth';

const items = [
  {
    href: '/student/dashboard',
    icon: faChartLine,
    title: 'Dashboard'
  },
  {
    href: '/student/account',
    icon: faUserCircle,
    title: 'Account'
  },
  {
    href: '/student/settings',
    icon: faCog,
    title: 'Settings'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
    backgroundColor: '#2196f3',
    marginBottom: '5px',
  },
  avatarW: {
    cursor: 'pointer',
    width: 64,
    height: 64,
    backgroundColor: 'white',
    marginBottom: '5px',
  },
  text:{
    color: "#ffffff",
  }
  }));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [data, setData] = useState(false);
  const userData = Auth.getUser();
    
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
   // eslint-disable-next-line
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className= {userData.first_name ? classes.avatar : classes.avatarW}
          component={RouterLink}
          to="/app/account"
        >
                  <Typography
          className={classes.text}
          variant="h3"
        >
          {userData.email ? userData.email[0].toUpperCase() : ""}
        </Typography>
        </Avatar>
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
          noWrap
        >
          {userData.first_name+" "+userData.last_name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
          noWrap
        >
          {userData.email}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
      <Box
        p={2}
        m={2}
        bgcolor="background.dark"
      >
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
