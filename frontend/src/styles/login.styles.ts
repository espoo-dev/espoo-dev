import styled from 'styled-components';
import { Form } from '@unform/web';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MainCard = styled.div`
  background: #ffffff;
  display: grid;
  grid-template-columns: 45% 5px 45%;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 500px;
  width: 70%;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 20px;

  @media (max-width: 900px) {
    grid-template-columns: auto;
  }
`;

export const Divider = styled.div`
  height: 100%;
  width: 2px;
  background: rgba(0, 0, 0, 0.1);
`;

export const LoginForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

export const Heading = styled.h1`
  font-size: 20px;
  margin: 0;
`;

export const MainImg = styled.img`
  height: 250px;
  width: auto;
`;

export const PageContainer = styled.div`
  background-color: #fff;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export const LeftContainer = styled.div`
  flex: 3;
  color: #525252;
`;

export const LoginContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const LoginFormContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  padding: 26px;
`;

export const LoginTitle = styled.div`
  margin-top: 30px;
  font-size: 34px;
  font-weight: bold;
`;

export const Subtitle = styled.div`
  margin-top: 18px;
  color: #848484;
`;

export const ContainerForm = styled(Form)`
  margin-top: 70px;
  display: grid;
  gap: 24px;
`;

export const InputForm = styled.div`
  margin-bottom: 30px;

  div {
    margin-bottom: 10px;
    color: '#848484'
  }

  input {
    margin-top: 10px;
    width: 100%;
    height: 36px;
    border: 1px solid #E2E2E2;
    border-radius: 5px;
    color: #565656;
    padding: 0px 8px;

    ::placeholder {
      color: #e2e2e2;
    }
  }
`;

export const KeepLogin = styled.div`
  display: inline-flex;

  span {
    color: rgb(226, 226, 226);
    padding-left: 11px;
    font-size: 12px;
  }
`;

export const CheckBox = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 3px;
  border: 1px solid #E2E2E2;
`;

export const BtnLogin = styled.button`
  background: linear-gradient(90deg, #AE0136 0%, #E40A4D 100%);
  height: 36px;
  color: #fff;
  margin-top: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  width: 100%;
`;

export const RightContainer = styled.div`
  background-image: url('/assets/girl-login.png');
  flex: 2;
  background-position: top;
  background-size: cover;
`;

export const ForgotBtn = styled.button`
  color: #51a7a7;
  margin-top: 33px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const RegisterBtn = styled.button`
  color: #51a7a7;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  padding: 0px 4px;
`;

export const LogoImg = styled.div`
  img {
    height: 100px;
    margin-left: -40px;
  }
`;
