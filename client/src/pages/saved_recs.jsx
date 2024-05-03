import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from 'axios';

const SavedRecs = () => {
  const [info, setInfo] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const params = useParams();

  const fetchDetails = async () => {
    try {
      const resp = await fetch(
        `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=e82209d22cec4bcbaea2047378b9f76b`
      );
      const data = await resp.json();
      return data;
    } catch (err) {
      console.error('Error fetching recipe details:', err);
      return {}
    }
  }

  useEffect(() => {
    let isMounted = true;

    fetchDetails().then((data) => {
      if (isMounted) setInfo(data);
    });

    return () => {
      isMounted = false; 
    };
  }, [params.id]);

  const deleteRecipes = async () => {
    try {
      await axios.delete(`http://localhost:3001/recipes/${info.id}`);
      alert('Recipe removed successfully!');
    } catch (err) {
      console.error('Error removing the recipe:', err);
      alert('Failed to remove recipe');
    }
  }

  return (
  <Wrapper>
  <div>
  <h2>{info.title}</h2>
  <img src={info.image} alt={info.title} />
  <Button onClick={deleteRecipes}>Remove From Favorites</Button>
  </div>
  <Info>
 <Button
  className={activeTab === "ingredients" ? "active" : ""}
  onClick={() => setActiveTab("ingredients")}>
  View Ingredients
  </Button>
  <Button
  className={activeTab === "instructions" ? "active" : ""}
  onClick={() => setActiveTab("instructions")}>
  View Instructions
  </Button>
  {activeTab === "ingredients" && (
  <ul>
  {info.extendedIngredients?.map(({ id, original }) => (
  <li key={id}>{original}</li> ))}
  </ul> )}
  {activeTab === "instructions" && (
  <div>
  <p dangerouslySetInnerHTML={{ __html: info.summary }}></p>
  <p dangerouslySetInnerHTML={{ __html: info.instructions }}></p>
  </div>)}
  </Info>
  </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 5rem 0; /* Adjusted margin for more consistency */
  padding: 1rem;
  display: flex;
  flex-direction: column; /* Consistent column layout */
  gap: 2rem; /* Space between elements */
`;

const Button = styled.button`
  display: flex;
  justify-content: center; /* Center content within the button */
  align-items: center; /* Vertically center content */
  padding: 0.5rem 1rem; /* Increased padding for a larger button */
  font-size: 1.25rem; /* Increased font size */
  font-weight: 600; /* Slightly bolder text */
  border: 2px solid #000; /* Border for button */
  border-radius: 1rem; /* Larger border-radius for rounded corners */
  background: #fff; /* Default button background */
  color: #313131; /* Default text color */
  transition: all 0.3s ease; /* Transition for hover effects */
  
  &:hover {
    background: #f0f0f0; /* Background change on hover */
  }

  .active {
    background: linear-gradient(35deg, #494949, #313131); /* Gradient for active button */
    color: #fff; /* White text color for active state */
  }
`;


const Info = styled.div`
list-style-type: none; /* Remove default list style */
padding: 0; /* Remove padding */
margin: 0; /* Remove margin */

li {
  font-size: 1.1rem; /* Slightly smaller font size */
  line-height: 2rem; /* Reduced line-height */
  color: #333; /* Darker text color */
}
`;

export default SavedRecs;
