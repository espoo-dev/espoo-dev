import styled from 'styled-components';
import { BaseOption, BaseOptionProps, BaseOptionsGrid } from '../common.styles';

type MultipleChoiceProps = BaseOptionProps & {
  loading?: boolean;
};

export const MultipleChoiceOption = styled(
  BaseOption
).attrs<MultipleChoiceProps>(() => ({}))`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  p {
    padding-left: 10px;
  }
`;

export const MultipleChoiceGrid = styled(BaseOptionsGrid)``;
