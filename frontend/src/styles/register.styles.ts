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

export const RegisterForm = styled(Form)`
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
