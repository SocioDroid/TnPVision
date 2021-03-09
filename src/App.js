import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useState, useMemo } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import './mixins/chartjs';
import theme from './theme';
import routes from './routes';
import UserContext from './UserContext';
import LoadingOverlay from 'react-loading-overlay';

const App = () => {
  const [isActive, setIsActive] = useState(null);
  const [user, setUser] = useState({first_name:"", last_name:""});

  const value = useMemo(() => ({ isActive, setIsActive }), [
    isActive,
    setIsActive
  ]);

  const userValue = useMemo(() => ({ user, setUser }), [
    user,
    setUser
  ]);

  const routing = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{userValue, value}}>
        <LoadingOverlay active={isActive} spinner>
          <GlobalStyles />
          {routing}
        </LoadingOverlay>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
