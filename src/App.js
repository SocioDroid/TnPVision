import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import './mixins/chartjs';
import theme from './theme';
import routes from './routes';
import UserContext from './UserContext';
import WithAxios from './WithAxios';

const App = () => {
  const routing = useRoutes(routes);
  const [userData, setUserData] = useState(null);
  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ userData, setUserData }}>
        <WithAxios>
          <GlobalStyles />
          {routing}
        </WithAxios>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
