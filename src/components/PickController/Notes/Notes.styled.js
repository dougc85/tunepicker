import styled from 'styled-components';

export const NotesStyled = styled.div`
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    font-weight: bold;
    text-align: end;
    font-size: 1.3rem;
    transform: translateY(-.5rem);
    margin-bottom: 1rem;
  }

  p {
    text-align: start;
    font-size: 1.5rem;
    padding: 1rem;
    overflow: scroll;
  }

  button {
    margin-top: 1rem;
    align-self: center;
  }
`