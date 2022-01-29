import { colorPallettes } from '@styles/globals';
import styled, { css } from 'styled-components';

export const ResultContainer = styled.div`
  text-align: center;

  div h1 {
    color: ${colorPallettes.primary};
  }
`;

export const Result = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0px;
`;

export const ResultText = styled.span`
  font-size: 18px;
  margin-left: 6px;
`;

export const BoxResult = styled.div<{ correct?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 12px;
  background: ${(props) => (props.correct ? '#04a904' : '#c34141')};
  font-size: 18px;

  ${(props) =>
    (props.correct &&
      css`
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
      `) ||
    css`
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    `}
`;
