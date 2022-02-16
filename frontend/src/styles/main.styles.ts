import { theme } from '@chakra-ui/react';
import styled from 'styled-components';

const { breakpoints } = theme;

export const Container = styled.div`
  background: #171717;
  height: 100vh;
`;

export const Layout = styled.div`
  display: flex;
  background: #181818;
  height: 100%;

  @media (max-width: ${breakpoints.md}) {
    flex-direction: column;
  }
`;

export const Content = styled.main`
  display: flex;
  padding: 2em;
  flex-direction: column;
  width: 100%;
  height: 100%;

  @media (max-width: ${breakpoints.md}) {
    padding: 1em 2em;
  }
`;

export const SurveyListWrapper = styled.div`
  position: relative;
  height: calc(100% - 80px);
  width: 100%;
  overflow: hidden;
  display: block;
`;
