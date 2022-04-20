import styled from 'styled-components';

export const AddMultipleStyled = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  legend {
    font-weight: bold;
    font-size: 1.3rem;
    align-self: flex-end;
    transform: translateY(-.5rem);
  }

  p {
    font-size: 1rem;
  }

  textarea {
    padding: .5rem;
  }
`

export const AddMultipleButtonsStyled = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 80%;
  margin: 0 auto;
`

