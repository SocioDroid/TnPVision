import React from 'react';
import { useParams} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Page from '../../../components/Page';
import { Container, } from '@material-ui/core';
import DriveDetails from './DriveDetails'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion(props) {
  const classes = useStyles();
  const { id } = useParams();

  return (
    <Page className={classes.root}>          
       <Container maxWidth={false}>
         <DriveDetails drive={id} />
         </Container>
    </Page>
  );
}
