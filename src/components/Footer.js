import { Link } from "react-router-dom";

import { BottomNavigation, BottomNavigationAction, Typography, makeStyles } from "@material-ui/core"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AddBoxIcon from '@material-ui/icons/AddBox';


const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'fixed',
    bottom: "0",

  },
  copyRight: {
    position: 'fixed',
    bottom: '5px',
    
  }
}))

function Copyright({className}) {
  return (
    <div className={className}>
    <Typography variant="h6" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/home">
        Reci.P
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    </div>
  );
}


const Footer = ({className, isLoggedIn}) => {
  const classes = useStyles()

  return (
    <div className={classes.footer}>
      {/* <BottomNavigation showLabels > */}
        <Copyright className={classes.copyRight}/>
        {/* <BottomNavigationAction label="Go Back" icon={<ArrowBackIosIcon color="secondary" fontSize="large" />} />
        <BottomNavigationAction component={Link} to="/recipe/new" label="New Recipe" icon={<AddBoxIcon color="secondary" fontSize="large" />} /> */}
      {/* </BottomNavigation> */}
    </div>
  )
}

export default Footer


