import styled from "styled-components";
import { libraryColor } from "../../partials/variables.styled";

export const LibraryStyled = styled.div`
  height: calc(100vh - 95px);
  display: flex;
  flex-direction: column;
  
  a {
    display: block;
    height: 40%;
    background-color: ${libraryColor.base};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 6rem;
    margin: 1rem;
    border-radius: 10px;
    flex-grow: 1;

    &:link, &:visited {
      color: white;
      text-decoration: none;
    }
  }
`