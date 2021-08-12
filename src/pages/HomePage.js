import React, { useEffect, useState } from 'react';
import {
  Button,
  Box,
  makeStyles,
  InputBase,
  Typography,
  ListItem,
  ButtonBase,
  Card,
  CardHeader,
  CardActions,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddBoxIcon from '@material-ui/icons/AddBox';

import useApi from '../hooks/useApi';

import RecipeList from '../components/recipeComponents/RecipeList';
import LoginForm from '../forms/LoginForm';
import SignupForm from '../forms/SignupForm';

const useStyles = makeStyles((theme) => ({
  box: {
    overflowY: 'scroll',
    maxHeight: '80%',
    marginBottom: '2px',
    scrollbarColor: 'inherit',
    width: '100vw',
    overflow: 'scroll',
    minHeight: '80%',
  },
  homePageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '92vh',
  },
  newRecipeButton: {
    margin: theme.spacing(2),
  },
  searchBar: {},
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const HomePage = ({ setIsLoggedIn }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const classes = useStyles();
  const { get } = useApi();

  const fetchRecipes = () => {
    get('http://localhost:4000/api/v1/recipes/')
      .then((res) => res.json())
      .then((jsonData) => {
        console.log(jsonData);
        setRecipes([...jsonData]);
      });
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className={classes.homePageContainer}>
      <Typography variant="h4">My Recipes</Typography>
      <InputBase
        className={classes.searchBar}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search…"
        type="search"
        inputProps={{ 'aria-label': 'search' }}
      />
      <Box className={classes.box}>
        {recipes.length > 0 && (
          <RecipeList
            recipes={recipes.filter((rec) => {
              if (searchTerm == '') return rec;
              if (rec.name.toLowerCase().includes(searchTerm.toLowerCase()))
                return rec;
            })}
          />
        )}
        {recipes.length === 0 && (
          <Card className={classes.card}>
            <CardHeader title={'No recipes in collection'} />
            <CardActions>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to={`/recipe/new`}
              >
                Add Recipe
              </Button>
            </CardActions>
          </Card>
        )}
      </Box>

      <Button
        component={Link}
        to={'/recipe/new'}
        size="large"
        fullWidth
        variant="contained"
        color="primary"
      >
        <AddBoxIcon color="secondary" />
        New Recipe
      </Button>
    </div>
  );
};

export default HomePage;
