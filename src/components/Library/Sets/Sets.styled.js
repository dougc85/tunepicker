import styled from 'styled-components';
import { libraryColor } from '../../../partials/variables.styled';

const { light, lighter } = libraryColor;

export const SetsStyled = styled.ul`
  li {
    padding: 1rem;
    font-size: 2rem;
    text-align: start;

    &:nth-child(2n-1) {
      background-color: ${light};
    }

    &:nth-child(2n) {
      background-color: ${lighter};
    }

    &:last-child {
      margin-top: 4.2rem;
      background-color: #dddddd;
    }
  }
`;

export const SetsHeader = styled.div`
  margin-top: 1.5rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;


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
  }
`
