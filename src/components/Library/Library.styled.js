import styled from "styled-components";
import { libraryColor } from "../../partials/variables.styled";

const anchorStyles = `
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
  max-height: 400px;

  @media only screen and (orientation: landscape) {
    width: 500px;
    margin: 0 auto;
    padding: 3rem;
    margin-bottom: 2rem;
  }

  &:link, &:visited {
    color: white;
    text-decoration: none;
  }

  @media only screen and (min-width : 920px) {
    width: 80%;
  }
`

export const LibraryStyled = styled.div`
  height: calc(${window.innerHeight}px - 95px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media only screen and (orientation: landscape) {
    height: auto;
  }

  ${({ disableAllSongs }) => {
    if (disableAllSongs) {
      return `
        >a:last-child {
          pointer-events: none;
        }
      `
    }
  }}
  
  >a {
    ${anchorStyles}
  }
`

export const QuickStartSets = styled.div`
  ${anchorStyles}
`