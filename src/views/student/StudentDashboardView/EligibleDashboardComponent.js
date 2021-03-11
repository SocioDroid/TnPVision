import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Box, Button, colors ,Card, Divider, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography, Avatar } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import StudentService from '../../../services/StudentService';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../../components/controls/ProgressBar';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: 370,
  },
  avatar: {
    backgroundColor: colors.red[600],
  },

}));

const LatestProducts = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [drives, setDrives] = useState([]);
  const [emptyData, setEmptyData] = useState(false)

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
      <Typography variant="h3" color="primary">
        Eligible Drives
      </Typography>
      <Divider style={{ margin: 10 }} />
      <Card className={clsx(classes.root, className)} elevation={10}>        
        <List>
          {drives.slice(0,5).map((drive, i) => (
            <ListItem
              divider={i < drives.length - 1}
              key={drive.id}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <Typography
                    className={classes.text}
                    variant="h3"
                  >
                    {drive.company_name[0].toUpperCase()}
                  </Typography>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={drive.jobtitle}              
              />
            </ListItem>
          ))}
        </List>
        <Divider />
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
            onClick={()=>{navigate('/student/eligibledrive', { replace: true });}}
          >
            View all
          </Button>
        </Box>
      </Card>
    </div>
      ): (!emptyData && <ProgressBar/>);
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
