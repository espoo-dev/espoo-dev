import styled from 'styled-components';
import { colorPallettes } from 'styles/globals';
import * as transitions from 'styles/transitions';

export type BaseOptionProps<T = unknown> = Partial<T> & {
  selected: boolean;
};

export const BaseOption = styled.div<BaseOptionProps>`
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  padding: 12px;
  transition: ${transitions.defaultTransition};

  background-color: ${(props) =>
    props.selected ? colorPallettes.bgSuccess : '#e4e8ee'};

  border: ${(props) =>
    props.selected
      ? `1px solid ${colorPallettes.success}`
      : '1px solid transparent'};

  color: ${(props) =>
    props.selected ? colorPallettes.success : colorPallettes.primary};

  &:hover {
    background-color: ${colorPallettes.bgSuccess};
    transition: ${transitions.defaultTransition};
    border: 1px solid ${colorPallettes.success};
    color: ${colorPallettes.success};
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  }
`;

export const BaseOptionsGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(350px, 2fr));

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 2fr));
  }
`;
