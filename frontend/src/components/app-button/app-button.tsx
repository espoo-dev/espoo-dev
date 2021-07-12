import React, { ButtonHTMLAttributes, ReactElement } from 'react';
import { IconType } from 'react-icons/lib';
import { ButtonProps } from '@styles/utils';
import { LoadingIcon, StyledAppButton } from './app-button.styles';

type CustomButton = ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps;

export interface AppButtonProps extends CustomButton {
  loading?: boolean;
  text: string;
  icon?: ReactElement<IconType>;
}

const defaultProps = {
  icon: undefined,
  loading: false,
};

export const AppButton = (props: AppButtonProps) => {
  const { disabled, loading, icon, text, ...rest } = props;
  return (
    <StyledAppButton {...rest} disabled={loading || disabled}>
      {loading && <LoadingIcon data-testid="loading_icon" size={16} />}
      <span className="text">{text}</span>
      {icon}
    </StyledAppButton>
  );
};

AppButton.defaultProps = defaultProps;
