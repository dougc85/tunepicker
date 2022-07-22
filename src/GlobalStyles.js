import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    padding: 0;
    margin: 0;
  }

  html {
    font-size: 62.5%;
    font-family: 'Nunito';
  }

  input,
  textarea {
    font-size: max(62.5%, 16px);
    font-family: 'Nunito';
  }

  body {
    box-sizing: border-box;
    text-align: center;
    position: relative;
    z-index: -1;
    backface-visibility: hidden;
    overflow-x: hidden;
    height: 100vh;
  }

  button {
    color: black;
  }
`;

export default GlobalStyles;