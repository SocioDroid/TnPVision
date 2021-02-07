import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import axios from "axios";
import Auth from '../../../auth'

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
    width: 100
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
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
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
        </Box>
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



  // group: 0,
  //   id: 0,
  //   user: {
  //       email: "",
  //       first_name: "",
  //       last_name: ""
  //   },
  //   gender: "M",
  //   isVolunteer: true,
  //   isProfileComplete: true,
  //   prn: "",
  //   PAN_number: "",
  //   aadhar: ,
  //   dob: "",
  //   category: "",
  //   mobileNumber: 0000000000,
  //   homeTown: "",
  //   collegeName: "",
  //   branch: "",
  //   tenthPercentage: 0.0,
  //   tenthBoardOfExamination: "",
  //   tenthYearOfPassing: 0000,
  //   twelthPercentage: 0,
  //   twelfthBoardOfExamination: "",
  //   twelfthYearOfPassing: 0000,
  //   isDiploma: false,
  //   diplomaPercentage: 0.0,
  //   diplomaBoardOfExamination: "",
  //   diplomaYearOfPassing: 0000,
  //   EnggQualifyingExamYear: 0000,
  //   EnggQualifyingExamScore: 0.0,
  //   sem1SGPA: 0.0,
  //   sem1Percentage: 0.0,
  //   sem2SGPA: 0.0,
  //   sem2Percentage: 0.0,
  //   sem3SGPA: 0.0,
  //   sem3Percentage: 0.0,
  //   sem4SGPA: 0.0,
  //   sem4Percentage: 0.0,
  //   sem5SGPA: 0.0,
  //   sem5Percentage: 0.0,
  //   enggAggCGPA: 0.0,
  //   enggAggPercentage: 0.0,
  //   liveBacklogs: 0,
  //   deadBacklogs: 0,
  //   educationalGap: 0,
  //   yearDown: 0,
  //   fatherOccupation: "",
  //   motherOccupation: "",
  //   parentsEmail: "",
  //   parentsMobileNumber: 0000000000,
  //   createdAt: "",
  //   updatedAt: "",
  //   isDeleted: false


  // personal Data:{
  //   first_name
  //   last_name
  //   email
  //   mobileNumber
  //   gender
  //   category
  //   PAN_number
  //   aadhar
  //   dob
  //   homeTown
  // }

  // academic Data:{
  //   collegeName
  //   branch
  //   prn
  //   sem1SGPA
  //   sem1Percentage
  //   sem2SGPA
  //   sem2Percentage
  //   sem3SGPA
  //   sem3Percentage
  //   sem4SGPA
  //   sem4Percentage
  //   sem5SGPA
  //   sem5Percentage
  //   enggAggCGPA
  //   enggAggPercentage
  //   liveBacklogs
  //   deadBacklogs
  //   educationalGap
  //   yearDown


    // tenthPercentage: 0.0,
    // tenthBoardOfExamination: "",
    // tenthYearOfPassing: 0000,
    // twelthPercentage: 0,
    // twelfthBoardOfExamination: "",
    // twelfthYearOfPassing: 0000,
    // isDiploma: false,
    // diplomaPercentage: 0.0,
    // diplomaBoardOfExamination: "",
    // diplomaYearOfPassing: 0000,
    // EnggQualifyingExamYear: 0000,
    // EnggQualifyingExamScore: 0.0,
    // fatherOccupation: "",
    // motherOccupation: "",
    // parentsEmail: "",
    // parentsMobileNumber: 0000000000,
    // createdAt: "",
    // updatedAt: "",
    // isDeleted: false