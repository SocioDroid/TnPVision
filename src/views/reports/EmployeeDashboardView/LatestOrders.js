import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import RoundService from '../../../services/RoundService';


const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestOrders = ({ className, DriveId, ...rest }) => {
  const classes = useStyles();
  const [students, setStudents] = useState([]);
  const [flag, setFlag] = useState(Boolean(true));

  useEffect(() => {
      RoundService.getAllStudentOfRound(DriveId, 1)
      .then(res => {
        setStudents([...res.data.students]);
        console.log("res ",res.data.students)
        setFlag(false)
      })
      .catch(err => {
        console.log(err);
      });   
  }, [DriveId, flag]);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Round Details" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
         
         <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map(student => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>
                    {`${student.user.first_name} ${student.user.last_name}`}
                  </TableCell>
                  <TableCell>{student.user.email}</TableCell>
                  <TableCell>
                  <Chip
                      color="primary"
                      label="pending"
                      size="small"
                    />           
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>


         
        </Box>
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
