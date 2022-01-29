import styled from 'styled-components';
import * as transitions from 'styles/transitions';

export const OptionSingleChoice = styled.div`
  background-color: #38b2ac;
  border-radius: 6px;
  cursor: pointer;
  padding: 8px;
  transition: ${transitions.defaultTransition};

  &:hover {
    background-color: #2c7a7b;
    transition: ${transitions.defaultTransition};
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
