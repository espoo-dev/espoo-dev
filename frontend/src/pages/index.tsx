import Link from 'next/link';
import { Container } from '@styles/home.styles';
import { FlexColumn } from '@styles/utils';

const Home = () => (
  <Container>
    <FlexColumn>
      <h1>Landing page bonita aqui</h1>
      <Link href="/login">Login</Link>
    </FlexColumn>
  </Container>
);

export default Home;
