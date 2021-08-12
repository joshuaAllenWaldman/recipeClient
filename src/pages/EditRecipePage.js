import { useState, useEffect } from "react";
import { useParams } from "react-router";

import useApi from "../hooks/useApi";


import EditRecipeForm from "../forms/EditRecipeForm";


const EditRecipePage = ({token, history}) => {
  const { id } = useParams()
  const [recipe, setRecipe] = useState()
  const {get, put} = useApi()

  const fetchRecipe = () => {
    get('http://localhost:4000/api/v1/recipes/' + id)
    .then(res => res.json())
    .then((jsonData) => {
      setRecipe(jsonData)
      console.log(jsonData)
    })
  }

  useEffect(() => {
    fetchRecipe()
  }, [])



  return (
    <div>
      {recipe && <EditRecipeForm recipe={recipe} token={token} history={history}/>}
      {!recipe && <p> Loading.. </p>}
    </div>
  )
}

export default EditRecipePage;