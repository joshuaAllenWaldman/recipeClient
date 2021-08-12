import {Card, CardHeader, CardContent, makeStyles, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: '100%'
  }
}))


const RecipeListItem = ({rec}) => {
  const classes = useStyles()

  return (
    <Card className={classes.card} >
      <CardHeader
      title={rec.name}
      />
      <CardContent component='div'>
        {
          rec.notes
        }
      </CardContent>
    </Card>
  )
}

export default RecipeListItem;