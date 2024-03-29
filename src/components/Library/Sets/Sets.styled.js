import styled from 'styled-components';
import { libraryColor } from '../../../partials/variables.styled';

const { light, lighter } = libraryColor;

export const SetsStyled = styled.ul`
  list-style-type: none;
`

export const SetStyled = styled.li`

  padding: 1rem;
  font-size: 2rem;
  text-align: start;
  position: relative;
  user-select: none;
  cursor: pointer;

  &:nth-child(2n-1) {
    background-color: ${light};
  }

  &:nth-child(2n) {
    background-color: ${lighter};
  }

  ${({ disable }) => {
    if (disable) {
      return `
        pointer-events: none;
      `
    }
  }}
`;

export const SetsHeader = styled.div`
  margin-top: 1.5rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;


  h2 {
    text-align: start;
    font-weight: bold;
    font-size: 2.5rem;
    margin-right: auto;
  }

  button {
    font-size: 1.8rem;
    background-color: white;
    padding: .7rem;
    border: 1px solid black;
    border-radius: 10px;
    display: block;
    margin-right: 2rem;
    position: relative;
    cursor: pointer;
  }
`
