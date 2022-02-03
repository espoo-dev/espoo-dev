import styled from 'styled-components';
import { colorPallettes } from 'styles/globals';
import * as transitions from 'styles/transitions';

interface OptionSingleChoiceProps {
  selected: boolean;
}

export const OptionSingleChoice = styled.div<OptionSingleChoiceProps>`
  background-color: ${(props) =>
    props.selected ? colorPallettes.bgSuccess : '#e4e8ee'};
  border-radius: 6px;
  cursor: pointer;
  padding: 12px;
  border: ${(props) =>
    props.selected
      ? `1px solid ${colorPallettes.success}`
      : '1px solid transparent'};
  transition: ${transitions.defaultTransition};
  color: ${(props) =>
    props.selected ? colorPallettes.success : colorPallettes.primary};
  font-weight: 500;

  &:hover {
    background-color: ${colorPallettes.bgSuccess};
    transition: ${transitions.defaultTransition};
    border: 1px solid ${colorPallettes.success};
    color: ${colorPallettes.success};
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
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
