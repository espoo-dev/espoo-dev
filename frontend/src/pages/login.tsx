import React, { useContext, useRef } from 'react';
import { AppButton } from 'components/app-button';
import { AuthContext } from 'context/auth';
import Head from 'next/head';
import { UserLogin } from 'api/models/user';
import { FlexColumn, FlexRow } from '../styles/utils';
import {
  Container,
  Divider,
  Heading,
  LoginForm,
  MainCard,
  MainImg,
} from '../styles/login.styles';
import { AppInput } from '../components';

const Login = () => {
  const formRef = useRef();
  const context = useContext(AuthContext);
  const { login, loading } = context;

  const handleFormSubmit = (data: UserLogin) => {
    login(data);
  };

  return (
    <Container>
      <Head>
        <title>Espoolingo - Login</title>
      </Head>

      <MainCard>
        <LoginForm ref={formRef} onSubmit={handleFormSubmit}>
          <FlexRow aligment="center" justify="center">
            <Heading>Welcome</Heading>
          </FlexRow>
          <AppInput
            id="email"
            name="email"
            label="Email / username"
            placeholder="Email or username..."
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

          <AppButton
            styling="primary"
            text="Log in"
            type="submit"
            loading={loading}
          />
          <AppButton styling="primary" text="Register" />
        </LoginForm>
        <Divider />
        <FlexColumn
          justify="center"
          aligment="center"
          style={{ textAlign: 'center' }}
          gap="20px"
        >
          <Heading>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Heading>
          <MainImg src="/assets/reading-time.svg" alt="Picture of the author" />
        </FlexColumn>
      </MainCard>
    </Container>
  );
};

export default Login;
