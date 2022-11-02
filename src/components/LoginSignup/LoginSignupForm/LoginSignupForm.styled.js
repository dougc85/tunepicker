import styled from 'styled-components';

export const LoginSignupFormStyled = styled.form`
  position: absolute;
  box-sizing: border-box;
  height: 100%;
  width: 100vw;
  padding-left: 4rem;
  padding-right: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  font-size: 3rem;
  text-align: left;
  transition: all 1.3s;

  label {
    font-size: 2rem;
  }

  legend {
    font-size: 2rem;
    font-weight: 800;
    align-self: center;
    margin-bottom: -1rem;
  }

  >button {
    font-size: 1.3rem;
    font-weight: bold;
    align-self: center;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid black;
    cursor: pointer;

    &:link,
    &:active,
    &:visited {
      color: black;
      text-decoration: none;
      border-bottom: 1px solid black;
    }
  }
`

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  position: relative;
  width: 100%;
  max-width: 400px;

  @media only screen and (min-width : 920px) {
      width: 50%;
    }

  >p {
    position: absolute; 
    color: red; 
  }
`

export const EmailInput = styled.input`
  width: 100%;
  font-size: 2rem;
  padding: .5rem;
  padding-left: 1rem;
  box-sizing: border-box;
  display: block;
  margin-bottom: .5rem;
`

export const EmailError = styled.p`
    font-size: 1.3rem;
    padding-left: 5px;
    top: 6.9rem;
`

export const PasswordError = styled.p`
  font-size: 1.5rem;
  bottom: -2.3rem;
  left: .5rem;
`

export const SubmitContainer = styled.div`
  
  align-self: center;
  position: relative;

  >button {
    background-color: white;
    border: 1px solid black;
    padding: 1rem;
    font-size: 2rem;
    display: block;
    width: 16rem;
    border-radius: 3px;
    font-family: Arial;
    cursor: pointer;
  }

  >div {
    position: absolute;
    top: .4rem;
    left: 17rem;
  }
`

export const ForgotContainer = styled.div`
  display: inline-block;
  position: relative;

  p {
    color: rgb(64, 64, 64);
    font-size: 1.1rem;
    align-self: center;
    background-color: transparent;
    border-bottom: 1px solid rgb(64, 64, 64);
    font-family: Arial;
    margin-left: 2rem;
    transform: translateY(-2px);
    cursor: pointer;
  }

  div {
    position: absolute;
    top: 2px;
    right: -2.4rem;
  }
`