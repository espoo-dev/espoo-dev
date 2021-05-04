import styled from 'styled-components';
import * as transitions from 'styles/transitions';

export const Container = styled.aside`
  width: 250px;
  height: 100vh;
  display: grid;
  grid-template-rows: 50px auto;
  padding: 2em;
`;

export const MenuHeader = styled.div`
  display: flex;
  color: #fff;
  padding: 0 2em;

  h1 {
    font-size: 26px;
    margin: 0;
  }
`;

export const MenuLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

export const MenuLinkOption = styled.a`
  padding: 15px 2em;
  display: flex;
  gap: 1em;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  border-radius: 12px;
  transition: ${transitions.defaultTransition};

  &:hover {
    background: #606060;
    transition: ${transitions.defaultTransition};
  }
`;
