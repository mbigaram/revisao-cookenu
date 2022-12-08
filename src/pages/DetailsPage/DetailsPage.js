import React from 'react'
import {useParams} from "react-router-dom"

const DetailsPage = () => {

    const params = useParams()
  return (
    <>
    <div>DetailsPage</div>
    {params.recipe.id}
    </>
  )
}

export default DetailsPage