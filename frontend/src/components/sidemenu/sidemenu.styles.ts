import { theme } from '@chakra-ui/react';
import { colors } from '@styles/colors';
import styled from 'styled-components';
import * as transitions from 'styles/transitions';

const { breakpoints } = theme;

export const MenuLinkOption = styled.a`
  padding: 10px;
  display: flex;
  gap: 1em;
  color: ${colors.primaryTxt};
  cursor: pointer;
  text-decoration: none;
  border-radius: 12px;
  font-size: 16px;
  transition: ${transitions.defaultTransition};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transition: ${transitions.defaultTransition};
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  @media (max-width: ${breakpoints.md}) and (max-width: ${breakpoints.md}) {
    margin: 4px;
    padding: 10px;

    &:first-child {
      margin-left: 1em;
    }
  }

  @media (max-width: ${breakpoints.sm}) {
    span {
      display: none;
    }
  }
`;

export const SideMenuContainer = styled.aside`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 250px;
  padding: 20px;
  border-right: 1px solid #323232;

  @media (max-width: ${breakpoints.md}) {
    border: none;
    height: 80px;
    width: 100%;
    padding: 10px 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const ItemMenu = styled.ul`
  margin: 40px 0px;

  @media (max-width: ${breakpoints.md}) {
    margin: 0px;
    display: flex;
  }
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;

  @media (max-width: ${breakpoints.sm}) {
    flex-direction: row;
    align-items: center;
  }
`;
