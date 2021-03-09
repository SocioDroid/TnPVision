import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import StudentService from '../../../services/StudentService';
import ReactHTMLParser from 'react-html-parser';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  }
}));

export default function InteractiveList() {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [reviews, setReviews] = React.useState(null);
  const reactStringReplace = require('react-string-replace')

  useEffect(() => {
    StudentService.getStudentReviews().then(res => {
      setReviews(res.data);
    });
  }, []);

  if (reviews) {
    return (
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" className={classes.title}>
              Reviews received
            </Typography>
            <div className={classes.demo}>
              <List dense={dense}>
                {reviews.map((value, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={
                        <Typography type="body2">
                          {reactStringReplace(value, '<green>', (match, i) => (
                            <Chip label={match}/>
                          ))}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return null;
  }
}
