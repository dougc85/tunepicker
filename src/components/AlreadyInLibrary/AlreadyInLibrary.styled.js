import styled from 'styled-components';

export const AlreadyInLibraryStyled = styled.div`
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.5rem;

  h3 {
    font-weight: bold;
    text-align: end;
    font-size: 1.3rem;
    transform: translateY(-.5rem);
  }

  p {
    text-align: start;
  }

  >div {
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    width: 90%;
  }
`