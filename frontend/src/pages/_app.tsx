import { ChakraProvider } from '@chakra-ui/react';
import customTheme from '@styles/theme';
import { AuthProvider } from 'context/auth';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from '../styles/globals';

function MyApp({ Component, pageProps }) {
  const fontURl =
    'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap';

  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href={fontURl} rel="stylesheet" />
        </Head>
        <GlobalStyle />

        <Component {...pageProps} />

        <ToastContainer />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
