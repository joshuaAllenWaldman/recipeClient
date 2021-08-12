import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CssBaseline, makeStyles } from '@material-ui/core'

import { TokenContext } from './hooks/useApi';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import NewRecipePage from './pages/NewRecipePage';
import ShowRecipePage from './pages/ShowRecipePage';
import EditRecipePage from './pages/EditRecipePage';

const useStyles = makeStyles(() => ({
  app: {
    height: "100vh",
    paddingBottom: "5px"
  },
}))



function App() {
  let history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState({ token: undefined });

  const classes = useStyles()

  useEffect(() => {
    const savedToken = JSON.parse(window.localStorage.getItem('token'));
    if (savedToken) {
      setToken({ token: savedToken });
      setIsLoggedIn(true);
      history.push('/home');
    }
  }, []);


  

  return (
    <TokenContext.Provider value={token}>
        <div  className={classes.app}>
          <Header
            setToken={setToken}
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            showLogin={showLogin}
            setShowLogin={setShowLogin}
          />
          <Switch>
            {' '}
            {isLoggedIn && (
              <Route
                path="/home"
                render={(props) => (
                  <HomePage
                    setIsLoggedIn={setIsLoggedIn}
                    isLoggedIn={isLoggedIn}
                    {...props}
                  />
                )}
              />
            )}
            {isLoggedIn && (
              <Route
                path="/recipe/:id/edit"
                render={(props) => (
                  <EditRecipePage
                    token={token}
                    isLoggedIn={isLoggedIn}
                    {...props}
                  />
                )}
              />
            )}
            {isLoggedIn && (
              <Route
                path="/recipe/new"
                render={(props) => (
                  <NewRecipePage
                    token={token}
                    isLoggedIn={isLoggedIn}
                    {...props}
                  />
                )}
              />
            )}
            {isLoggedIn && (
              <Route
                path="/recipe/:id"
                render={(props) => (
                  <ShowRecipePage
                    token={token}
                    isLoggedIn={isLoggedIn}
                    {...props}
                  />
                )}
              />
            )}
            <Route
              path="/"
              render={(props) => (
                <AuthPage
                  showLogin={showLogin}
                  setToken={setToken}
                  setIsLoggedIn={setIsLoggedIn}
                  isLoggedIn={isLoggedIn}
                  {...props}
                />
              )}
            />
          </Switch>
          {/* <Footer 
            setToken={setToken}
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            showLogin={showLogin}
            setShowLogin={setShowLogin}
          /> */}
        </div>
    </TokenContext.Provider>
  );
}

export default App;
