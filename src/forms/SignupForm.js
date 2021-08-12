import React, { useRef } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  Container,
  TextField,
  FormControl,
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
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

const SignupForm = ({ setIsLoggedIn, history, setToken }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const { signup } = useApi()
  const classes = useStyles();

  
  const onSubmit = (data) => {
    const { confPassword, ...rest } = data;
    signup('http://localhost:4000/api/v1/users/signup', {
      body: JSON.stringify(rest),
    })
      .then((res) => res.json())
      .then((jsonData) => {
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography>Sign Up</Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
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
            {...register('email')}
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="text"
            id="email"
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
          <TextField
            variant="outlined"
            margin="normal"
            {...register('confPassword')}
            required
            fullWidth
            id="confPassword"
            label="Confirm Password"
            name="confPassword"
            type="password"
            id="confPassword"
          />
          <Button fullWidth type="submit" variant="contained" color="primary">
            Create Account
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default SignupForm;
