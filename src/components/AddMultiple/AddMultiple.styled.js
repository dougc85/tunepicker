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
    span {
      display: block;
      letter-spacing: 7px;
      font-weight: bold;
    }
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

export const TitleErrorsStyled = styled.div`

height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h2 {
    font-weight: bold;
    font-size: 1.3rem;
    align-self: flex-end;
    transform: translateY(-.5rem);
    margin-bottom: 3rem;
  }

  p{
    font-size: 1.5rem;
    padding: .5rem;

    span {
      display: block;
      margin-bottom: 1rem;
    }
  }

  ul {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
`

