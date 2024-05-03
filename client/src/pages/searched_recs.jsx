import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

const SearchedRecs = () => {
  const [searchedRecs, setSearchedRecs] = useState([])
  const parmas = useParams()

  const getSearchedRecs = async (search) => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=e82209d22cec4bcbaea2047378b9f76b&query=${search}`
    )
    const data = await response.json()
    return data.results
  }

  useEffect(() => {
    let isMounted = true;
    getSearchedRecs(parmas.search).then((data) => {
      if (isMounted) setSearchedRecs(data)
    })

    return () => {isMounted = false}}, [parmas.search]);
  return (
  <Grid>
  {searchedRecs.map(({ title, id, image }) => (
  <Card key={id}>
  <Link to={`/recipe/${id}`}>
  <img src={image} alt={title} />
  <h4>{title}</h4>
  </Link>
  </Card>))}
  </Grid>)}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  text-align: center;
  gap: 3rem;
`;

const Card = styled.div`
  img {
    width: min(500px, 100%);
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default SearchedRecs;
