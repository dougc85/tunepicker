import styled from 'styled-components';

export const InstructionsStyled = styled.div`
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.3rem;
  text-align: start;

  h3 {
    font-weight: bold;
    text-align: end;
    font-size: 1.3rem;
    transform: translateY(-.5rem);
  }

  >p {
    padding: 0 1rem;
  }

  >div {
    align-self: center;
  }
`