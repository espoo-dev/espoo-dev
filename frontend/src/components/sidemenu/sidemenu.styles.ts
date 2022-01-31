import styled from 'styled-components';
import * as transitions from 'styles/transitions';

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
