import Link from 'next/link';
import { Container } from '@styles/home.styles';
import { FlexColumn } from '@styles/utils';
import { useForm } from 'react-hook-form';
import { Button } from '@chakra-ui/button';
import { FormSelect } from '@components/form-select/form-select';

const Home = () => {
  return (
    <Container>
      <FlexColumn>
        <h1>Landing page bonita aqui</h1>
        <Link href="/login">Login</Link>
      </FlexColumn>
    </Container>
  );
};

export default Home;
