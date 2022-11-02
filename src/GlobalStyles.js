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
    @media only screen and (min-width : 920px) {
      background-color: #ecebeb;
    }
    overflow-x: hidden;
  }

  input,
  textarea {
    font-size: max(62.5%, 16px);
    font-family: 'Nunito';
    border-width: 1px;
    border-style: solid;
    border-color: rgb(163, 163, 163);
  }

  body {
    box-sizing: border-box;
    text-align: center;
    position: relative;
    z-index: -1;
    backface-visibility: hidden;
    overflow-x: hidden;
    overflow-y: scroll;
    height: 100vh;
    background-color: white;

    @media only screen and (min-width : 920px) {
      max-width: 500px;
      margin: 0 auto;
      box-shadow: 1px 0 40px rgba(0,0,0, .4);
    }

    ${({ modalBodyStyles }) => modalBodyStyles}
  }

  button {
    color: black;
  }
`;

export default GlobalStyles;