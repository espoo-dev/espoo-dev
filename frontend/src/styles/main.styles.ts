import styled from 'styled-components';
import customTheme from './theme';

const { breakpoints } = customTheme;

export const Container = styled.div`
  background: #171717;
  height: 100vh;
`;

export const Layout = styled.div`
  display: grid;
  min-height: 100vh;
  width: 100%;
  background: #181818;
  grid-template-columns: 250px 1fr;

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: auto;
    grid-template-rows: 80px 1fr;
  }
`;

export const Content = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px;
`;

export const SurveyListWrapper = styled.div`
  position: relative;
  height: calc(100% - 80px);
  width: 100%;
  overflow: hidden;
  display: block;
`;

export const DarkContainer = styled.div`
  height: 100%;
  background: #323232;
  margin-top: 20px;
  padding: 20px;
  border-radius: 20px;
`;
