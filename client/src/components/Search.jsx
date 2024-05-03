import { useState } from "react";
import styled from "styled-components";
import { FaSearchLocation } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("")
  const navigate = useNavigate()

  const submitHandle = (event) => {event.preventDefault(); navigate(`/searched/${searchText}`)}

  return (
  <Form onSubmit={submitHandle}>
  <div>
  <FaSearchLocation/>
  <input
  type="text"
  value={searchText}
  onChange={(event) => setSearchText(event.target.value)}/>
  </div>
  </Form>
  )
};

const Form = styled.form`
margin: 0 1rem;

div {
  position: relative;
  width: clamp(400px, 80%, 600px); 
  margin: 1rem auto; 
  box-shadow: 0 4px 8px gray; /* Subtle shadow for depth */
  padding: 0.5rem; 
}

input {
  background: #f0f0f0; /* Lighter gray for a cleaner look */
  font-size: 1.25rem;
  color: #333;
  padding: 0.75rem 2.5rem;
  border-radius: 0.25rem; 
  border: 1px solid gray;
  outline: none;
  width: 100%;
}

svg {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(-100%, -50%);
  color: #333;
}
`;
export default SearchBar;
