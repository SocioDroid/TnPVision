import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
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
import EmployeeServices from '../../../../services/EmployeeServices';
import Auth from '../../../../auth';
import { faUserGraduate, faCog, faBuilding, faUserCircle, faBriefcase, faChartLine, faUserTag}  from '@fortawesome/free-solid-svg-icons'

var items;
let group = 2;
if (group === 2) {
  items = [
    {
      href: '/employee/dashboard',
      icon: faChartLine,
      title: 'Dashboard'
    },
    {
      href: '/employee/empaccount',
      icon: faUserCircle,
      title: 'Account'
    },
    {
      href: '/employee/students',
      icon: faUserGraduate,
      title: 'Students'
    },
    {
      href: '/employee/employees',
      icon: faBriefcase,
      title: 'Employees'
    },
    {
      href: '/employee/companies',
      icon: faBuilding,
      title: 'Companies'
    },
    {
      href: '/employee/drives',
      icon: faUserTag,
      title: 'Drives'
    },
    {
      href: '/employee/settings',
      icon: faCog,
      title: 'Settings'
    }
  ];
} else if (group === 3) {
  items = [
    {
      href: '/employee/dashboard',
      icon: faChartLine,
      title: 'Dashboard'
    },
    {
      href: '/employee/students',
      icon: faUserGraduate,
      title: 'Students'
    },
    {
      href: '/employee/employees',
      icon: faBriefcase,
      title: 'Employees'
    },
    {
      href: '/employee/empaccount',
      icon: faBriefcase,
      title: 'Account'
    },
    {
      href: '/employee/settings',
      icon: faCog,
      title: 'Settings'
    }
  ];
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
  avatarW: {
    cursor: 'pointer',
    width: 64,
    height: 64,
    backgroundColor: 'white',
    marginBottom: '5px'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
    backgroundColor: '#2196f3',
    marginBottom: '5px'
  },
  text: {
    color: '#ffffff'
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [userData, setUserData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    gender: '',
    group: 0,
    id: 0
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    EmployeeServices.getEmployeeDetail()
      .then(function(res) {
        const { data } = res;
        console.log('data: ', data);
        setUserData({
          email: data.user.email,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          gender: data.gender,
          group: data.group,
          id: data.id
        });
      })
      .catch(error => {
        if (error.response.status === 401) {
          Auth.deauthenticateUser();
          console.log('Deauthenticate user');
          console.log(error);
          navigate('/logout', { replace: true });
        }
      });
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={userData.first_name ? classes.avatar : classes.avatarW}
          component={RouterLink}
          to="/employee/account"
        >
          <Typography className={classes.text} variant="h3">
            {userData.first_name ? userData.first_name[0].toUpperCase() : ''}
          </Typography>
        </Avatar>
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {userData.first_name + ' ' + userData.last_name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {userData.email}
        </Typography>
      </Box>
      <Divider />

      <Box p={2}>
        <List>
          {items.map(item => (
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
