import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Card,
  Button,
  ButtonGroup,
  CardHeader,
  CardContent,
  makeStyles,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { spacing } from '@material-ui/system';

import useApi from '../hooks/useApi';

import DeleteRecipeModal from '../components/recipeComponents/DeleteRecipeModal';



const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
}));

const ShowRecipePage = ({ history }) => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { get, del } = useApi();
  const [recipe, setRecipe] = useState({});

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchRecipe = () => {
    get('http://localhost:4000/api/v1/recipes/' + id)
      .then((res) => res.json())
      .then((jsonData) => {
        setRecipe(jsonData);
      });
  };

  const deleteRecipe = () => {
    del('http://localhost:4000/api/v1/recipes/' + id)
      .then(() => setRecipe({}))
      .then(() => history.push('/home'))
      .then(() => handleClose())
      .catch((err) => console.log(err));

  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  const { tags, name, url, notes } = recipe;

  return (
    <Card className={classes.card}>
      <CardHeader 
        titleTypographyProps={{variant:'h2', align:'center'}}
        title={name}

      />
        

      <CardContent>
        <Typography variant="h4">Notes:</Typography>
        <Typography variant="subtitle1">{notes}</Typography>
      </CardContent>
      <CardContent>
        <Button variant="contained" color="primary" style={{textDecoration: 'none', fontSize:'30px'}} href={url} target="_blank">
          Go to Recipe Page
        </Button>
      </CardContent>

      <CardContent>
        <ButtonGroup fullWidth>
          <Button
            size="large"
            m={1}
            component={Link}
            to={`/recipe/${id}/edit`}
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            size="large"
            m={1}
            onClick={handleClickOpen}
            variant="outlined"
            color="secondary"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </ButtonGroup>
      </CardContent>
      <Button
        size="large"
        component={Link}  
        to={'/home'}
        variant="contained"
        color="secondary"
        fullWidth
      >
        Back
      </Button>
      <DeleteRecipeModal open={open} deleteRecipe={deleteRecipe} handleClose={handleClose} />
    </Card>
  );
};

export default ShowRecipePage;
