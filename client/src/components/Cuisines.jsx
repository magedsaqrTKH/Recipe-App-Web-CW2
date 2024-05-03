import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiChiliPepper, GiChopsticks, GiShrimp } from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const CuisinesSearch = () => {
  return (
  <List>
  <SLink to={"/cuisines/American"}>
  <FaHamburger />
  <h4>American</h4>
  </SLink>
  <SLink to={"/cuisines/Italian"}>
  <FaPizzaSlice />
  <h4>Italian</h4>
  </SLink>
  <SLink to={"/cuisines/French"}>
  <GiShrimp />
  <h4>French</h4>
  </SLink>
  <SLink to={"/cuisines/Asian"}>
  <GiChopsticks />
  <h4>Asian</h4>
  </SLink>
  <SLink to={"/cuisines/Indian"}>
  <GiChiliPepper/>
  <h4>Indian</h4>
  </SLink>
  </List>
  )}

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const SLink = styled(NavLink)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 1%;
margin-right: 5rem; 
margin-left: 5rem; 
text-decoration: none;
width: 5rem; /* Slightly smaller width */
height: 5rem; /* Slightly smaller height */
background: linear-gradient(45deg, #a3c9f3, #72a9d1); /* Light blue gradient */
cursor: pointer;
transition: transform 0.2s ease-in-out, background 0.2s ease-in-out; /* Added smooth transitions */
transform: scale(0.85); /* Adjusted initial scale */

h4 {
  color: #ffffff; /* White text color */
  font-size: 0.75rem; /* Font size remains the same */
  align-item: center;
}

svg {
  color: #ffffff; /* White icon color */
  font-size: 1.4rem; /* Icon size remains the same */
}


&:hover {
  transform: scale(0.9); /* Increased scale on hover */
  background: linear-gradient(45deg, #f77f7f, #f44336);
}

&.active {
  background: linear-gradient(to right, #ff4500, #e94057); /* Changed gradient for active state */
  transform: scale(1); /* Full scale for active state */

  svg {
    color: #ffffff; /* Consistent white color */
  }

  h4 {
    color: #ffffff; /* Consistent white color */
  }
}

`;
export default CuisinesSearch;
