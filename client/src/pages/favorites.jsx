import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Favorites = () => {
  const [favorites, setFavorites] = useState([])

  const fetchFavorites = async () => {
    try {const response = await axios.get("http://localhost:3001/recipes/recipes")
      setFavorites(response.data)
    } catch (err) {
      console.error("Error fetching recipes:", err)
    }}

  useEffect(() => {
    fetchFavorites();
  }, [])

  return (
    <Wrapper>
    <h1>Favorite Recipes</h1>
    <Splide
    options={{
    perPage: 4,
    arrows: false,
    pagination: false,
    drag: "free",
    gap: "5rem",
    breakpoints: {
    1024: {perPage: 3,},
    767: {perPage: 2,},
    640: {perPage: 1,},
          },
        }}
      >
    {favorites.map(({ title, id, image }) => (
    <SplideSlide key={id}>
    <Card>
    <Link to={`/Recipesaved/${id}`}>
    <p>{title}</p>
    <img src={image} alt={title} />
    <Gradient />
    </Link>
    </Card>
    </SplideSlide>))}
    </Splide>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 4rem 0; /* Consistent spacing around content */
`;

const Card = styled.div`
  min-height: 25rem; 
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* Subtle shadow for depth */
  transition: transform 0.3s ease-in-out; /* Smooth hover effect */

  &:hover {
    transform: scale(1.05); /* Scale effect on hover */
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12.5rem / 4rem; /* Consistent border-radius for horizontal oval */
  }

  p {
    position: absolute;
    z-index: 10; 
    left: 50%;
    bottom: 10%; /* Text placed slightly above the bottom */
    transform: translateX(-50%); /* Center horizontally */
    color: #fff; 
    text-align: center;
    font-weight: 600; 
    font-size: 1rem; 
    display: flex;
    justify-content: center; 
    align-items: center;
    background: rgba(0, 0, 0, 0.5); /* Semi-transparent background for contrast */
    border-radius: 1rem; /* Rounded corners for the text block */
    padding: 0.5rem; /* Added padding for comfort */
    width: 80%; /* Constrained width for alignment */
  }
`;

const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; 
  height: 100%; 
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)); /* Adjusted gradient */
  z-index: 2; 
  border-radius: 12.5rem / 4rem; /* Consistent border-radius with Card */
`;

export default Favorites;
