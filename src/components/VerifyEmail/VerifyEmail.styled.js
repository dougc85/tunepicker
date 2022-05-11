import styled from 'styled-components';

export const VerifyEmailStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
      font-weight: bold;
      font-size: 1.3rem;
      align-self: flex-end;
      transform: translateY(-.5rem);
      margin-bottom: 2rem;
    }

  p {
    padding: 1rem;
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 2rem;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`