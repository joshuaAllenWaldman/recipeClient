import { useState } from 'react';
import { Box, Button, Typography, makeStyles } from '@material-ui/core';
import SignupForm from '../forms/SignupForm';
import LoginForm from '../forms/LoginForm';


const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
  }
}))

const AuthPage = (props) => {

  const classes = useStyles()

  return (
    // <Box fullWidth className={classes.container} >
    <>
      {!props.showLogin && (
        <SignupForm
          setIsLoggedIn={props.setIsLoggedIn}
          history={props.history}
          setToken={props.setToken}
        />
      )}

      {props.showLogin && (
        <LoginForm
          setIsLoggedIn={props.setIsLoggedIn}
          history={props.history}
          setToken={props.setToken}
        />
      )}
      </>
    // </Box>
  );
};

export default AuthPage;
