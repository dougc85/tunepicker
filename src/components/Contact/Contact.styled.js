import styled from 'styled-components';

export const ContactStyled = styled.div`
  box-sizing: border-box;
  font-size: 1.5rem;
  padding: 2rem;
  text-align: start;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);

  >h2 {
    font-weight: 700;
    font-size: 2.4rem;
    margin-bottom: 2rem;
  }
`

export const ContactForm = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;

  label {
    display: block;
    margin-left: 3px;

    span {
      font-size: .8em;
      display: inline-block;
      margin-left: 13px;
      color: red;
    }
  }
`

export const FormElement = styled.div`

  input {
    padding: 5px;
    font-size: 1.7rem;
    width: 100%;
    margin-bottom: 1rem;
  }
`

export const FormElementTextArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  textarea {
    padding: 6px;
    font-size: 1.7rem;
    flex: 1;
  }
`

export const FormElementButton = styled.div`
  display: flex;
  justify-content: center;
`