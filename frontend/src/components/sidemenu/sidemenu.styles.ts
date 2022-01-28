import styled from 'styled-components';
import * as transitions from 'styles/transitions';
import { breakpoints } from 'styles/globals';

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

  @media (max-width: ${breakpoints.sm}) {
    margin: 4px;
    padding: 1em 1.5em;
    span {
      display: none;
    }
  }
`;

export const SideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 250px;
  padding: 2em;
  border-right: 1px solid;

  @media (max-width: ${breakpoints.sm}) {
    height: auto;
    width: auto;
    padding: 1em 2em;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 16px;
    }
  }
`;

export const ItemMenu = styled.ul`
  margin: 40px 0px;

  @media (max-width: ${breakpoints.sm}) {
    margin: 0px;
    display: flex;
  }
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  @media (max-width: ${breakpoints.sm}) {
    flex-direction: row;
    align-items: center;
  }
`;
