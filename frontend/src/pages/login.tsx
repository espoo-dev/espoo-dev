import React, { useCallback, useRef, useState } from 'react';
import { AppButton } from 'components/app-button';
import { httpClient } from 'api';
import { AuthService } from 'api/services';
import { UserLogin } from 'api/models/user';
import { toast } from 'react-toastify';
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

const authService = new AuthService(httpClient);

const Login = () => {
  const formRef = useRef();
  const handleFormSubmit = (data: any) => {
    login(data);
  };
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (data: UserLogin) => {
    try {
      setLoading(true);
      const response = await authService.authenticate(data);
      setLoading(false);
      // TODO: Redirect to admin page
      toast(`Welcome ${response.email}`, {
        position: 'top-right',
        type: 'success',
        pauseOnHover: false,
      });
    } catch (error) {
      setLoading(false);
    }
  }, []);

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
