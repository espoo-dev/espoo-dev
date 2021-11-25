import { useContext, useEffect, useRef, useState } from 'react';
import { errorHandler } from 'api/error-handler';
import { AppButton } from 'components/app-button';
import { AppRadioButton } from 'components/app-radio-button';
import { AuthContext } from 'context/auth';
import { Role } from 'api/models/role';
import { UserCreate } from 'api/models/user';
import { RoleService } from 'api/services';
import { httpClient } from 'api';
import { Flex, Spinner } from '@chakra-ui/react';
import Link from 'next/link';
import {
  BackLink,
  PageContainer,
  LeftContainer,
  LoginContainer,
  LoginFormContainer,
  LoginTitle,
  ContainerForm,
  RightContainer,
  LogoImg,
} from '../styles/login.styles';
import { AppInput } from '../components';

const Login = () => {
  const formRef = useRef();
  const context = useContext(AuthContext);
  const { register, loading } = context;
  const [roles, setRoles] = useState<Role[]>([]);
  const [isRolesLoading, setIsRolesLoading] = useState(true);
  const roleService = new RoleService(httpClient);

  const handleFormSubmit = (data: UserCreate) => {
    const { role_id } = data;

    const payload: UserCreate = {
      ...data,
      role_id: Number(role_id),
    };

    register(payload);
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

  useEffect(() => {
    setIsRolesLoading(false);
  }, [roles]);

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

              {isRolesLoading ? (
                <Flex justify="center">
                  <Spinner />
                </Flex>
              ) : (
                <AppRadioButton
                  name="role_id"
                  keyAttrs="id"
                  label="Roles"
                  options={roles}
                  value="id"
                  text="role_type"
                />
              )}

              <AppButton
                styling="primary"
                text="Register"
                type="submit"
                id="btn-login"
                loading={loading}
                disabled={isRolesLoading}
              />

              <Link href="/login" passHref>
                <BackLink>
                  <span>Back to login</span>
                </BackLink>
              </Link>
            </ContainerForm>
          </LoginFormContainer>
        </LoginContainer>
      </LeftContainer>
    </PageContainer>
  );
};

export default Login;
