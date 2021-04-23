import React, { useContext, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppButton } from 'components/app-button';
import { AuthContext } from 'context/auth';
import { UserCreate } from 'api/models/user';
import { FlexColumn, FlexRow } from '../styles/utils';
import {
  Container,
  Divider,
  Heading,
  RegisterForm,
  MainCard,
  MainImg,
} from '../styles/register.styles';
import { AppInput } from '../components';

const Login = () => {
  const formRef = useRef();
  const context = useContext(AuthContext);
  const { register, loading } = context;
  const router = useRouter();

  const handleFormSubmit = (data: UserCreate) => {
    register(data);
  };

  const goToLogin = () => {
    router.replace('/login');
  };

  return (
    <Container>
      <Head>
        <title>Espoolingo - Register</title>
      </Head>

      <MainCard>
        <FlexColumn
          justify="center"
          aligment="center"
          style={{ textAlign: 'center' }}
          gap="20px"
        >
          <Heading>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Heading>
          <MainImg src="/assets/press-play.svg" alt="Picture of the author" />
        </FlexColumn>
        <Divider />
        <RegisterForm ref={formRef} onSubmit={handleFormSubmit}>
          <FlexRow aligment="center" justify="center">
            <Heading>Register</Heading>
          </FlexRow>
          <AppInput
            id="email"
            name="email"
            label="Email"
            placeholder="email@email.com"
            type="text"
            required
          />
          <AppInput
            id="password"
            name="password"
            label="Password"
            placeholder="******"
            type="password"
            required
          />
          <AppInput
            id="role"
            name="role"
            label="Role"
            placeholder="teacher, moderator..."
            type="text"
            required
          />

          <AppButton
            styling="primary"
            text="Register"
            type="submit"
            loading={loading}
          />

          <AppButton
            styling="primary"
            text="Go to Login"
            type="button"
            onClick={() => goToLogin()}
          />
        </RegisterForm>
      </MainCard>
    </Container>
  );
};

export default Login;
