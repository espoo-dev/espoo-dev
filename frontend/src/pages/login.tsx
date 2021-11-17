import React, { useContext, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuthContext } from 'context/auth';
import { UserLogin } from 'api/models/user';
import {
  PageContainer,
  LeftContainer,
  LoginContainer,
  LoginFormContainer,
  LoginTitle,
  Subtitle,
  ContainerForm,
  RightContainer,
  ForgotLink,
  RegisterLink,
  LogoImg,
} from '../styles/login.styles';

import { AppInput } from '../components/app-input';
import { AppButton } from '../components/app-button';

const Login = () => {
  const formRef = useRef();
  const context = useContext(AuthContext);
  const { login, loading } = context;

  const handleFormSubmit = (data: UserLogin) => {
    login(data);
  };

  return (
    <PageContainer>
      <Head>
        <title>Espoolingo - Login</title>
      </Head>

      <LeftContainer>
        <LoginContainer>
          <LoginFormContainer>
            <LogoImg>
              <img src="/assets/logo.png" alt="" />
            </LogoImg>
            <LoginTitle>
              <span>Log in.</span>
            </LoginTitle>
            <Subtitle>
              <span>
                Log in with your data or
                <Link href="/register" passHref>
                  <RegisterLink id="btn-register">register now.</RegisterLink>
                </Link>
              </span>
            </Subtitle>

            {/* Form */}
            <ContainerForm ref={formRef} onSubmit={handleFormSubmit}>
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
                id="btn-login"
                loading={loading}
              />
            </ContainerForm>

            {/* <KeepLogin>
              <CheckBox />
              <span>Keep me logged in</span>
            </KeepLogin> */}

            <Link href="/forgot-password" passHref>
              <ForgotLink>
                <span>Forgot password?</span>
              </ForgotLink>
            </Link>
          </LoginFormContainer>
        </LoginContainer>
      </LeftContainer>
      <RightContainer />
    </PageContainer>
  );
};

export default Login;
