import styled from 'styled-components';

export const Container = styled.div`
  background: #171717;
  height: 100vh;
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 250px auto;
`;

export const Content = styled.main`
  display: flex;
  padding: 2em;
  display: flex;
  flex-direction: column;

  h1 {
    color: #fff;
    font-size: 26px;
    margin: 0;
  }
`;
