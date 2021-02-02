import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,

  Upload as UploadIcon,

  Download as DownloadIcon, 

} from 'react-feather';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

var items;
let group = 2;
if(group === 2){
  items = [
    {
      href: '/employee/dashboard',
      icon: BarChartIcon,
      title: 'Dashboard'
    },
    {
      href: '/employee/empaccount',
      icon: UserIcon,
      title: 'Account'
    },
    {
      href: '/employee/students',
      icon: UsersIcon,
      title: 'Students'
    },
    {
      href: '/employee/employees',
      icon: ShoppingBagIcon,
      title: 'Employees'
    },
    {
      href: '/employee/settings',
      icon: SettingsIcon,
      title: 'Settings'
    },
    {
      href: '/employee/drive',
      icon: UploadIcon,
      title: 'Drive Upload'
    }, 
    {
      href: '/employee/import',
      icon: DownloadIcon,
      title: 'Import Student'
    },
  ]
}else if(group === 3){
  items = [
    {
      href: '/employee/dashboard',
      icon: BarChartIcon,
      title: 'Dashboard'
    },  
    {
      href: '/employee/students',
      icon: UsersIcon,
      title: 'Students'
    },
    {
      href: '/employee/employees',
      icon: ShoppingBagIcon,
      title: 'Employees'
    },
    {
      href: '/employee/empaccount',
      icon: UserIcon,
      title: 'Account'
    },
    {
      href: '/employee/settings',
      icon: SettingsIcon,
      title: 'Settings'
    }, 
  ]
}


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
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

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
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/employee/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
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
