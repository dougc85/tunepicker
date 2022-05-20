import styled from 'styled-components';

export const DeleteSetStyled = styled.div`
  
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  h3 {
    font-weight: bold;
    text-align: end;
    font-size: 1.3rem;
    transform: translateY(-.5rem);
  }

  >div {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    flex: 1;
    width: 80%;
    margin: 0 auto;
  }
`

export const ConfirmRemoveSongs = styled.div`
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

  
`

export const LowerContent = styled.div`

  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  
  p {
    margin: 1rem 0;

    span {
      font-size: 1.3rem;
      display: block;
      margin-top: 1rem;
    }
  }

  >div {
    display: flex;
    width: 80%;
    justify-content: space-evenly;
    margin: 0 auto;
  }
`