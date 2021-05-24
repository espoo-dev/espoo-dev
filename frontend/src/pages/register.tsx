import React, { useContext, useEffect, useRef, useState } from 'react';
import { errorHandler } from 'api/error-handler';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppButton } from 'components/app-button';
import { AuthContext } from 'context/auth';
import { Role } from 'api/models/role';
import { UserCreate } from 'api/models/user';
import { RoleService } from 'api/services';
import { httpClient } from 'api';
import { FlexColumn, FlexRow } from '../styles/utils';
import {
  Container,
  Divider,
  Heading,
  RegisterForm,
  MainCard,
  MainImg,
} from '../styles/register.styles';
import { AppInput, AppSelect } from '../components';

const Login = () => {
  const formRef = useRef();
  const context = useContext(AuthContext);
  const { register, loading } = context;
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>([]);
  const roleService = new RoleService(httpClient);

  const handleFormSubmit = (data: UserCreate) => {
    const { role_id } = data;
    const payload: UserCreate = {
      ...data,
      role_id: Number(role_id),
    };

    register(payload);
  };

  const goToLogin = () => {
    router.replace('/login');
  };

  const getRoles = async () => {
    try {
      const response = await roleService.list();
      if (response && response.data) {
        setRoles(response.data);
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

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
          <AppSelect
            id="role_id"
            name="role_id"
            label="Role"
            placeholder="teacher, moderator..."
            required
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.role_type}
              </option>
            ))}
          </AppSelect>

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
