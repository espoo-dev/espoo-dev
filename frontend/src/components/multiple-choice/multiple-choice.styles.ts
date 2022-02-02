import styled from 'styled-components';
import { colorPallettes } from 'styles/globals';
import * as transitions from 'styles/transitions';

export const OptionMultipleChoice = styled.div<{ selected: boolean }>`
  background-color: ${(props) =>
    props.selected ? colorPallettes.bgSuccess : '#e4e8ee'};
  border-radius: 6px;
  border: ${(props) =>
    props.selected
      ? `1px solid ${colorPallettes.success}`
      : '1px solid transparent'};
  cursor: pointer;
  padding: 12px;
  transition: ${transitions.defaultTransition};
  color: ${(props) => (props.selected ? colorPallettes.success : colorPallettes.primary)};
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  p {
    padding-left: 10px;
  }

  &:hover {
    background-color: ${colorPallettes.bgSuccess};
    transition: ${transitions.defaultTransition};
    border: 1px solid ${colorPallettes.success};
    color: ${colorPallettes.success};
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  }
`;
