import React from 'react';
import {
  Container,
  makeStyles,
  Typography,
  Divider
} from '@material-ui/core';
import Page from '../../../components/controls/Page';
import LiveDrive from './LiveDrives';
import App from '../../../cube/App';
import CubeDashboard from '../../../cube/pages/DashboardPage';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = (props) => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Employee Dashboard"
    >
      <Container maxWidth={false} style={{ marginLeft: '1%' }}>
        <LiveDrive />
      </Container>
      <Container maxWidth={false} style={{ margin: '1%' }}>
        <Typography variant="h3" color="primary">
          Statistics
        </Typography>
        <Divider style={{ margin: 10 }} />
        
          <App children={<CubeDashboard />} />
        
      </Container>
    </Page>
  );
};

export default Dashboard;
