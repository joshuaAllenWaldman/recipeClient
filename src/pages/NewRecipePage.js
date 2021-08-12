import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Button,
  Container,
  TextField,
  FormControl,
  InputLabel,
  makeStyles,
  ButtonGroup,
} from '@material-ui/core';

import useApi from '../hooks/useApi';

const useStyles = makeStyles(() => ({
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '88vh',
  },
  buttonContainer: {},
}));

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

const NewRecipePage = ({ history }) => {
  const [copiedUrl, setCopiedUrl] = useState(undefined)
  const { register, handleSubmit, setValue, watch, errors, reset } = useForm({
    defaultValues:{
      url: copiedUrl 
    }
  });
  const { post } = useApi();
  const classes = useStyles();

  const urlInput = useRef()


  useEffect(() => {
    const copiedText = navigator.clipboard.readText()
    .then((clipText) => {
      if(validURL(clipText)){
      setCopiedUrl(clipText);
    }})
    .catch((err) => console.log(err))
  }, [])
  
  const url = copiedUrl ? copiedUrl : '';

  const onSubmit = (data) => {
    console.log(data);
    post('http://localhost:4000/api/v1/recipes/new', {
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((jsonData) => console.log(jsonData))
      .then(() => history.push('/home'))
      .then(() => setCopiedUrl(undefined))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container className={classes.box}>
          <TextField
            variant="outlined"
            margin="normal"
            {...register('name')}
            required
            fullWidth
            id="name"
            label="Recipe Name"
            name="name"
            autoFocus
            type="text"
            id="name"
          />
        <TextField
            variant="outlined"
            margin="normal"
            {...register('url')}
            required
            fullWidth
            id="url"
            label="Recipe Url"
            name="url"
            type="text"
            id="url"
            value={copiedUrl || ''}
            onChange={(event) => {
              setCopiedUrl(event.target.value)
              
            } }
          />
          <TextField
            variant="outlined"
            margin="normal"
            multiline
            rows={10}
            {...register('notes')}
            required
            fullWidth
            id="notes"
            label="Recipe Notes"
            name="notes"
            type="text"
            id="notes"
          />
        <ButtonGroup fullWidth className={classes.buttonContainer}>
        <Button
            size="large"
            fullWidth
            component={Link}
            to="/home"
            variant="contained"
            color="secondary"
          >
            Go Back
          </Button>
          <Button
            size="large"
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Add Recipe
          </Button>
        </ButtonGroup>
      </Container>
    </form>
  );
};

export default NewRecipePage;
