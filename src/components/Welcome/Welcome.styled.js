import styled from 'styled-components';
import { fonts } from '../../partials/variables.styled';

export const WelcomeStyled = styled.div`
  padding: 0 2rem 0 2rem;
  box-sizing: border-box;
  height: ${window.innerHeight}px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;


  h1 {
    font-family: ${fonts.appFont};
    font-size: 6rem;
  }

  > p {
    font-size: 1.7rem;
    font-family: ${fonts.secondaryFont};
  }

  > div {
    position: relative;
    height: 33rem;
  }
`

export const WelcomeButtons = styled.div`
  position: absolute;
  left: ${({ leftStyle }) => leftStyle ? leftStyle : '50%'};
  top: 50%;
  transform: ${({ transformStyle }) => transformStyle ? transformStyle : 'translate(-50%, -50%)'};
  transition: all 1s;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
`

export const WelcomeButton = styled.button`
  border: 1px solid black;
  background-color: ${({ id }) => id === 'login' ? 'white' : 'black'};
  color: ${({ id }) => id === 'login' ? 'black' : 'white'};
  padding: 2rem;
  font-family: 'nunito';
  font-size: 3rem;
  border-radius: 5px;
  display: block;
  margin: 0 auto;
  margin-bottom: ${({ id }) => id === 'login' ? '0' : '0'};
  width: 20rem;
`

export const WelcomeBackground = styled.div`
  height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(to right, #cce9d8, #d5ecd8, #def0d9, #e8f3db, #f1f6dd, #f6f6de, #faf6df, #fef6e0, #fef4e0, #fef1e0, #fdefe1, #fcede1);
`