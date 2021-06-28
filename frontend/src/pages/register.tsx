import React, { useContext, useEffect, useRef, useState } from 'react';
import { errorHandler } from 'api/error-handler';
import { useRouter } from 'next/router';
import { AppButton } from 'components/app-button';
import { AuthContext } from 'context/auth';
import { Role } from 'api/models/role';
import { UserCreate } from 'api/models/user';
import { RoleService } from 'api/services';
import { httpClient } from 'api';
import {
  PageContainer,
  LeftContainer,
  LoginContainer,
  LoginFormContainer,
  LoginTitle,
  ContainerForm,
  RightContainer,
  ForgotBtn,
  LogoImg,
} from '../styles/login.styles';
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
    <PageContainer>
      <RightContainer />
      <LeftContainer>
        <LoginContainer>
          <LoginFormContainer>
            <LogoImg>
              <img src="/assets/logo.png" alt="" />
            </LogoImg>
            <LoginTitle>
              <span>Register</span>
            </LoginTitle>

            {/* Form */}
            <ContainerForm ref={formRef} onSubmit={handleFormSubmit}>
              <AppInput
                id="email"
                name="email"
                label="Email"
                placeholder="Your email..."
                type="text"
                required
              />

              <AppInput
                id="password"
                name="password"
                label="Create a password"
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
                id="btn-login"
                loading={loading}
              />

              <ForgotBtn onClick={() => goToLogin()}>
                <span>Back to login</span>
              </ForgotBtn>
            </ContainerForm>

          </LoginFormContainer>
        </LoginContainer>
      </LeftContainer>
    </PageContainer>
  );
};

export default Login;
