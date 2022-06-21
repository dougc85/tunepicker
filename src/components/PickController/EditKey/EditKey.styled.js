import styled from 'styled-components';

export const EditKeyStyled = styled.div`
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
`

export const FormInputs = styled.div`
  
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex: 1;
  transform: translateY(.5rem);
  padding: 0 1rem;

  >div {
    display: flex;
    align-items: center;
    margin-right: 1rem;

    label {
      font-weight: bold;
      margin-right: 1rem;
    }

    input {
      padding-left: .5rem;
      width: 100%;
    }
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  >button {
    margin: 0 .5rem;
  }
`