import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { GlobalStyle } from "../styles/globals";

import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "context/auth";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <GlobalStyle />

        <Component {...pageProps} />

        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default MyApp;
