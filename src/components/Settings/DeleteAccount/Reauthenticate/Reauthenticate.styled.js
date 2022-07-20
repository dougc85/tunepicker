import styled from 'styled-components';

export const ReauthenticateStyled = styled.form`
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 1.5rem;
  text-align: start;

  h3 {
    font-weight: bold;
    text-align: end;
    font-size: 1.3rem;
    transform: translateY(-.5rem);
  }

  >p {
    padding: 0 1rem;
  }

  >div {
    position: relative;
    text-align: start;
    padding: 0 1rem;
  }

  label {
    font-weight: bold;
  }
  input {
    display: block;
    font-size: 1.5rem;
    width: 80%;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  >div {
    width: 20px;
  }
`

export const LoadingContainer = styled.div`
  position: absolute;
  top: 2px;
  right: 13px;
`

export const Error = styled.p`
  position: absolute;
  font-size: 1.2rem;
  color: red;
  padding-left: 5px;
`