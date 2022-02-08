import styled from 'styled-components';
import { BaseOption, BaseOptionProps, BaseOptionsGrid } from '../common.styles';

type OptionSingleChoiceProps = BaseOptionProps;

export const OptionSingleChoice = styled(
  BaseOption
).attrs<OptionSingleChoiceProps>(() => ({}))``;

export const GridSingleChoice = styled(BaseOptionsGrid)``;
