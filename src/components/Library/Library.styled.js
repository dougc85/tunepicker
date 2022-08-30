import styled from "styled-components";
import { libraryColor } from "../../partials/variables.styled";

export const LibraryStyled = styled.div`
  height: calc(${window.innerHeight}px - 95px);
  display: flex;
  flex-direction: column;

  ${({ disableAllSongs }) => {
    if (disableAllSongs) {
      return `
        >a:last-child {
          pointer-events: none;
        }
      `
    }
  }}
  
  >a, >p {
    display: block;
    height: 40%;
    background-color: ${libraryColor.base};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 6rem;
    margin: 1rem 2rem;
    border-radius: 10px;
    flex-grow: 1;
    position: relative;
    color: white;

    &:link, &:visited {
      color: white;
      text-decoration: none;
    }
  }
`