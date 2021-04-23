import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { GlobalStyle } from '../styles/globals';

import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const fontURl =
    'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap';

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href={fontURl} rel="stylesheet" />
      </Head>
      <GlobalStyle />

      <Component {...pageProps} />

      <ToastContainer />
    </>
  );
}

export default MyApp;
