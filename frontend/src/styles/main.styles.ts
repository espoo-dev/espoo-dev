import styled from 'styled-components';
import { breakpoints } from './globals';

export const Container = styled.div`
  background: #171717;
  height: 100vh;
`;

export const Layout = styled.div`
  display: flex;
  background: #181818;
  height: 100%;

  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;
  }
`;

export const Content = styled.main`
  display: flex;
  padding: 2em;
  flex-direction: column;
  width: 100%;
  height: 100%;

  @media (max-width: ${breakpoints.sm}) {
    padding: 0;
  }

  h1 {
    color: #fff;
    font-size: 26px;
    margin: 0;
    padding: 0 1em;
  }
`;
