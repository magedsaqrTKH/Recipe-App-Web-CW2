import { Link } from "react-router-dom";
import Pages from "./pages/pages";
import styled from "styled-components";
import { GiBowlOfRice } from "react-icons/gi";

const App = () => {
  return (
  <div>
  <Container/>
  <Nav>
  <LargeIcon>
  <GiBowlOfRice />
  </LargeIcon>
  <Logo to={"/home"}>FoodHub</Logo>
  <ButtonLink to="/RecipeList">Favorite Recipes</ButtonLink>
  <ButtonLink to="/">Logout</ButtonLink>
  </Nav>
  <Pages />
  </div>
  )
}

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  color: gray;
`;

const LargeIcon = styled.div`
  font-size: 4rem; /* Adjust this to make the icon bigger */
  display: flex;
  align-items: center;
  margin-left: 4rem;
`;

const Logo = styled(Link)`
  font-size: 3rem;
  text-decoration: none;
  font-weight: 500;
  font-family: "Forte";
  align-items: center;
  margin-left: 25rem;
  margin-right: 25rem;
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
  margin-left: 1rem;
  font-size: 1rem;
  font-family: "Forte";
  &:hover {
    color: #666;
  }
`;

export default App;
