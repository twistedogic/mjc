import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: "Roboto",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue","Helvetica","Arial",sans-serif;
    transition: all 0.50s linear;
  }

  a, button, input, textarea {
    outline: none;
  }

  a:link, a:visited {
    background: #00d1b2;
    color: white;
    padding: 2px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
  }

  a:hover, a:active {
    background-color: red;
  }
`;
