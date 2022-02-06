import { createGlobalStyle } from 'styled-components';

export const breakpoints = {
  sm: '750px',
};

export const colorPallettes = {
  primary: '#2b3564',
  secondary: '#7a7d97',
  success: '#1d5c2e',
  bgSuccess: '#caf7d2',
};

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    font-family: -apple-system, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  body {
    background: #ececec;
  }

  .Toastify__toast {
    border-radius: 8px !important;
    padding: 1em !important;
  }

  .Toastify__toast--error {
    background: #ed3e3e !important;
  }

  ::-webkit-scrollbar {
    height       : 5px;
    width        : 5px;
    border-radius: 8px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #888;
  }
`;
