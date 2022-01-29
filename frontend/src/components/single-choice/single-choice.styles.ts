import styled from 'styled-components';
import { colorPallettes } from 'styles/globals';
import * as transitions from 'styles/transitions';

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

export const GridSingleChoice = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(350px, 2fr));

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 2fr));
  }
`;
