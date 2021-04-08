import React, { useRef } from "react";
import Image from "next/image";
import { AppInput } from "../components";
import {
  Container,
  Divider,
  Heading,
  LoginForm,
  MainCard,
  MainImg,
} from "../styles/login.styles";
import { Button, FlexColumn, FlexRow } from "../styles/utils";

const Login = () => {
  const formRef = useRef();
  const handleFormSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <MainCard>
        <LoginForm ref={formRef} onSubmit={handleFormSubmit}>
          <FlexRow aligment="center" justify="center">
            <Heading>Welcome</Heading>
          </FlexRow>
          <AppInput
            id="user"
            name="user"
            label="Email / username"
            placeholder="Email or username..."
            type="text"
          />
          <AppInput
            id="password"
            name="password"
            label="Password"
            placeholder="******"
            type="password"
          />

          <Button styling="primary">Log in</Button>
          <Button styling="primary">Register</Button>
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
