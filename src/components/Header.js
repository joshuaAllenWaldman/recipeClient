
import { Link } from 'react-router-dom';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none'
  },
}));

const Header = ({ isLoggedIn, setIsLoggedIn, setToken, showLogin, setShowLogin }) => {
  

  const classes = useStyles();

  const logout = () => {
    setToken({ token: undefined });
    setIsLoggedIn(false);
    window.localStorage.removeItem('token');
  };
  const handleAuthButtonDisplay = () => {
    if(!showLogin){
      return <Button color="inherit" onClick={() => setShowLogin(true)} >Login </Button>
    } 
    if(showLogin){
      return <Button color="inherit" onClick={() => setShowLogin(false)} >Sign Up! </Button>
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <Typography component={Link} color="inherit" to='/home' variant="h4" className={classes.title}>
            Reci.P
          </Typography>
          {
            isLoggedIn && 
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          }
          {
            !isLoggedIn && handleAuthButtonDisplay()
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
