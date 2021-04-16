import React, { useCallback, useContext, useRef, useState } from "react";
import { AppInput } from "../components";
import {
  Container,
  Divider,
  Heading,
  LoginForm,
  MainCard,
  MainImg,
} from "../styles/login.styles";
import { FlexColumn, FlexRow } from "../styles/utils";
import { AppButton } from "components/app-button";
import { httpClient } from "api";
import { AuthService } from "api/services";
import { UserLogin } from "api/models/user";
import { toast } from "react-toastify";
import { AuthContext } from "context/auth";

const authService = new AuthService(httpClient);

const Login = () => {
  const formRef = useRef();
  const context = useContext(AuthContext)
  const { login, loading } = context;

  const handleFormSubmit = (data: any) => {
    login(data);
  };

  return (
    <Container>
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
          style={{ textAlign: "center" }}
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
