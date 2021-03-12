import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import DriveStatusComponent from '../../../components/DriveStatusComponent';
import {
  Box,
  Button,
  colors,
  Card,
  Divider,

  makeStyles,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,

} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import StudentService from '../../../services/StudentService';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../../components/controls/ProgressBar';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
    // height: 370
  },
  avatar: {
    backgroundColor: colors.red[600]
  }
}));

const LatestProducts = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [drives, setDrives] = useState([]);
  const [emptyData, setEmptyData] = useState(false);

  useEffect(() => {
    StudentService.getEligibleDrives()
      .then(res => {
        setDrives(res.data);
        if (res.data.length === 0) {
          setEmptyData(true);
        }
      })
      .catch(function(error) {
        setDrives(false);
      });
  }, []);

  return drives.length > 0 ? (
    <div>
      <Typography variant="h3" color="primary">
        Eligible Drives
      </Typography>
      <Divider style={{ margin: 10 }} />
      <Card className={clsx(classes.root, className)} elevation={10}>
        <PerfectScrollbar>
          <Box minWidth={800}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {drives.slice(0, 5).map((drive, i) => (
                  <TableRow hover  key={drive.id} onClick={() => navigate('/student/drive/' + drive.id, { replace: true })} >
                    <TableCell>{drive.id}</TableCell>
                    <TableCell>{drive.jobtitle}</TableCell>
                    <TableCell>{drive.company.name}</TableCell>
                    <TableCell>
                      {moment(drive.date).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <DriveStatusComponent status={drive.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button
              color="primary"
              endIcon={<ArrowRightIcon />}
              size="small"
              variant="text"
              onClick={() => {
                navigate('/student/eligibledrive', { replace: true });
              }}
            >
              View all
            </Button>
          </Box>
        </PerfectScrollbar>
      </Card>
    </div>
  ) : (
    !emptyData && <ProgressBar />
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
