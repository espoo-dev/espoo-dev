import styled from 'styled-components';
import * as transitions from 'styles/transitions';
import { colorPallettes } from 'styles/globals';

export const OptionSingleChoice = styled.div`
  background-color: #e4e8ee;
  border-radius: 6px;
  cursor: pointer;
  padding: 12px;
  transition: ${transitions.defaultTransition};
  color: ${colorPallettes.primary};
  font-weight: 500;

  &:hover {
    background-color: #95d6a2;
    transition: ${transitions.defaultTransition};
    color: ${colorPallettes.success};
  }
`;
