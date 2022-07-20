import styled from 'styled-components';

export const SettingsStyled = styled.div`
  font-size: 1.7rem;
  padding: 2rem;
  text-align: start;

  >h2 {
    font-weight: 700;
    font-size: 2.4rem;
    margin-bottom: 2rem;
  }

  label {
    display: block;
    font-weight: bold;
  }

  p {
    font-size: 1.6rem;
  }

  >div {
    
    margin-bottom: 2rem;

    >div {
      display: flex;
      align-items: center;
      margin-bottom: .8rem;
    }
    button {
      background-color: inherit;
      border: none;
      border-bottom: 1px solid #6b6b6b;
      display: inline-block;
      margin-left: 2rem;
      color: #6b6b6b;
    }
  }

  >button {
    margin-top: 3rem;
  }
`