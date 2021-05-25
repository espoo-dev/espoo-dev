/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useRef } from 'react';
import { useRouter } from 'next/router';
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
  ForgotBtn,
  RegisterBtn,
  LogoImg
} from '../styles/login.styles';

import { AppInput } from '../components/app-input';
import { AppButton } from '../components/app-button';

const Login = () => {
  const formRef = useRef();
  const context = useContext(AuthContext);
  const { login, loading } = context;
  const router = useRouter();

  const handleFormSubmit = (data: UserLogin) => {
    login(data);
  };

  const goToRegister = () => {
    router.replace('/register');
  };

  return (
    <PageContainer>
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
                <RegisterBtn
                  id="btn-register"
                  onClick={() => goToRegister()}
                >
                  register now.
                </RegisterBtn>
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

            <ForgotBtn>
              <span>Forgot password?</span>
            </ForgotBtn>

          </LoginFormContainer>
        </LoginContainer>

      </LeftContainer>
      <RightContainer />
    </PageContainer>
  );
};

export default Login;
