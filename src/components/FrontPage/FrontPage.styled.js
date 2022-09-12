import styled from 'styled-components';

export const FrontPageStyled = styled.div`
  display: flex;
  flex-direction: column;
`
export const Checkbox = styled.div`
  
  display: flex;
  align-items: center;
  margin-left: 2rem;
  margin-right: 2rem;
  padding-bottom: 2rem;

  @media only screen and (min-width : 700px) {
    max-width: 650px;
    align-self: center;
    }
 

  label {
    margin-left: 1rem;
    font-size: 1.2rem;
  }
  p {
    margin-left: 1rem;
    font-size: 1.2rem;
  }
  input {
    min-height: 12px;
    min-width: 12px;
    border: 1px solid red;
    flex: 0;
  }
`

export const Separator = styled.div`
  border-bottom: 1px solid black;
  margin: 0rem auto 2rem auto;
  width: 80%;
`