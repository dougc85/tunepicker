import styled from 'styled-components';

export const VerifyEmailStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  h2 {
      font-weight: bold;
      font-size: 1.3rem;
      align-self: flex-end;
      transform: translateY(-.5rem);
      margin-bottom: 2rem;
    }

  >p {
    padding: 1rem;
    font-size: 1.5rem;
    text-align: start;
    margin-bottom: 2rem;

    span {
      display: block;
      font-weight: bold;
    }
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-bottom: 2rem;

  >div {
    position: relative;
  }
`

export const Error = styled.p`
  position: absolute;
  font-size: 1rem;
  color: red;
  left: 0;
  top: 3rem;
  text-align: start;

  span {
    display: block;
  }
`

export const Feedback = styled.p`
  position: absolute;
  font-size: 1.2rem;
  left: .5rem;
  top: 3.5rem;
  text-align: start;
`