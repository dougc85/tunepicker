import styled from 'styled-components';

export const CannotDeleteStyled = styled.div`
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;

  h3 {
    font-weight: bold;
    text-align: end;
    font-size: 1.3rem;
    transform: translateY(-.5rem);
  }

  >div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    p {
    span {
      display: block;

      margin-bottom: 1rem;
    }
  }
    button {
      width: 40%;
      margin: 0 auto;
    }
  }

  
`