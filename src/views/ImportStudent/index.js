import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from '../../components/Page';
import ImportExcel from './ImportExcel';
// import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ImportStudent = () => {
  const classes = useStyles();
//   const [customers] = useState(data);

  return (
    <Page
      className={classes.root}
      //title="Customers"
    >
      <Container maxWidth={false}>
        {/* <Toolbar /> */}
        <Box mt={3}>
          <ImportExcel />
        </Box>
      </Container>
    </Page>
  );
};

export default ImportStudent;
