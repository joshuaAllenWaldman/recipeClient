import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Container,
  TextField,
  makeStyles,
  Typography,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import useApi from '../hooks/useApi';

const useStyles = makeStyles((theme) => ({
  container: {},
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "space-between"
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  loginButton: {
    position: 'static',
    bottom: '0'
  }
}));

const LoginForm = ({ setIsLoggedIn, history, setToken }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const { login } = useApi();
  const classes = useStyles();

  const onSubmit = (data) => {
    login('http://localhost:4000/api/v1/users/login', {
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((jsonData) => {
        console.log(jsonData);
        const token = jsonData.token;
        setToken({ token });
        if (token) {
          window.localStorage.setItem('token', JSON.stringify(token));
        }
      })
      .then(() => setIsLoggedIn(true))
      .then(() => history.push('/home'))
      .catch((err) => console.log(err));
  };

  return (
    <Container className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            {...register('username')}
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            type="text"
            id="username"
          />

          <TextField
            variant="outlined"
            margin="normal"
            {...register('password')}
            required
            fullWidth
            id="password"
            label="password"
            name="password"
            type="password"
            id="password"
          />

          <Button fullWidth type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;
