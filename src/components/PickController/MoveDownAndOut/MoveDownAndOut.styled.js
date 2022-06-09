import styled from 'styled-components';

export const MoveDownAndOutStyled = styled.div`
  height: 100%;
  margin: 0 auto;

  h3 {
    font-weight: bold;
    text-align: end;
    font-size: 1.3rem;
    transform: translateY(-.5rem);
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  >div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    >button:first-child {
      margin-bottom: 1rem;
    }
  }
`