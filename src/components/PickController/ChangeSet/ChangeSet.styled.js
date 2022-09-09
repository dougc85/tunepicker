import styled from "styled-components";

export const ChangeSetStyled = styled.form`
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

  >fieldset {
    margin-top: 1rem;
    border: none;
    
    
    >legend {
      font-size: 1.8rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    >div {
      text-align: start;
      display: flex;
      align-items: center;
      margin: 1rem 1rem;

      >input {
        margin-right: 1rem;
      }
    }
  }
`

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  >button {

  }

  >div {
    width: 20px;
  }
`