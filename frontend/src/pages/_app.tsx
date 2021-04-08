import Head from "next/head";
import { GlobalStyle } from "../styles/globals";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyle />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
