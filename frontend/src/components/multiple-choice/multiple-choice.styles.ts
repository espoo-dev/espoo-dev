import styled, { css } from 'styled-components';
import { colorPallettes } from 'styles/globals';
import * as transitions from 'styles/transitions';

export const OptionMultipleChoice = styled.div<{ selected: boolean }>`
  background-color: ${(props) =>
    (props.selected && colorPallettes.bgSuccess) || '#e4e8ee'};
  border-radius: 6px;
  cursor: pointer;
  padding: 12px;
  transition: ${transitions.defaultTransition};
  color: ${colorPallettes.primary};
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  p {
    padding-left: 10px;
  }

  ${(props) =>
    props.selected &&
    css`
      color: ${colorPallettes.success};
    `}

  &:hover {
    background-color: ${colorPallettes.bgSuccess};
    transition: ${transitions.defaultTransition};
    color: ${colorPallettes.success};
  }
`;
