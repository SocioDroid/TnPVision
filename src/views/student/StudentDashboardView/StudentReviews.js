import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Grid, Card} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import StudentService from '../../../services/StudentService';
import Tooltip from '@material-ui/core/Tooltip';

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
  const reactStringReplace = require('react-string-replace');

  function highlightReviews(review) {
    let replacedText;
    replacedText = reactStringReplace(
      review,
      /(?<=<green>)(.*?)(?=<\/green>)/g,
      (match, i) => (
        <Tooltip title="Positve Point">
          <span style={{ color: 'green'}} key={match + i}>
            {match}       
          </span>
        </Tooltip>        
      )
    );

    replacedText = reactStringReplace(
      replacedText,
      /(?<=<red>)(.*?)(?=<\/red>)/g,
      (match, i) => (
        <Tooltip title="Negative Point">
          <span style={{ color: 'red' }} key={match + i}>
            {match}
          </span>
        </Tooltip>
      )
    );

    replacedText = reactStringReplace(replacedText, /<.+?>/g, (match, i) => (
      <span key={match + i}>{match}</span>
    ));

    return replacedText;
  }

  useEffect(() => {
    StudentService.getStudentReviews().then(res => {
      setReviews(res.data);
    });
  }, []);

  if (reviews) {
    return (
      <div >
        <Typography variant="h3" color="primary">
              Reviews received
        </Typography>
        <Divider style={{ margin: 10 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>            
            <Card className={classes.demo} elevation={10}>
              <List dense={dense}>
                {reviews.map((review, index) => (
                  <>
                  <ListItem key={index}>
                    <ListItemText primary={highlightReviews(review)} />
                  </ListItem>
                  <Divider style={{ marginLeft: 10, marginRight: 10}} />
                  </>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return null;
  }
}
