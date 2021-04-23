import Head from 'next/head';
import { Navbar } from 'components/navbar';
import { withAuth } from 'hoc/withAuth';
import { Content, Layout } from 'styles/main.styles';

const Main = () => (
  <>
    <Head>
      <title>Espoolingo - Home</title>
    </Head>
    <Layout>
      <header>
        <Navbar />
      </header>

      <Content>Main page</Content>
    </Layout>
  </>
);

export default withAuth(Main);
