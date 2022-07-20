import styled from 'styled-components';

export const DeleteAccountStyled = styled.div`
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
    font-size: 1.2rem;
  }

  >div {
    display: flex;
    justify-content: center;

    >div {
      width: 20px;
    }
  }
`