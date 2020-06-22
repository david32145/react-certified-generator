import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html, body, #root {
    height: 100vh;
    font-size: 14px;
  }

  #root {
    display: flex;
    flex-direction: column;
  }

  * {
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyles;
