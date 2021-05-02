import Head from 'next/head';
import { withAuth } from 'hoc/withAuth';
import { Container, Content, Layout } from 'styles/main.styles';
import { Sidemenu } from 'components/sidemenu';

const Main = () => (
  <Container>
    <Head>
      <title>Espoolingo - Home</title>
    </Head>
    <Layout>
      <Sidemenu />
      <Content>Main page</Content>
    </Layout>
  </Container>
);

export default withAuth(Main);
