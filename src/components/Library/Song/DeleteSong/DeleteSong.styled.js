import styled from 'styled-components';

export const DeleteSongStyled = styled.div`
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  h3 {
    font-weight: bold;
    text-align: end;
    font-size: 1.3rem;
    transform: translateY(-.5rem);
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.1rem;
    color: #a41212;
  }

  >div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    width: 80%;
    margin: 0 auto;

    >div {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
`