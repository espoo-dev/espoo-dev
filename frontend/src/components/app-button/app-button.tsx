import React, { ButtonHTMLAttributes, ReactElement } from 'react';
import { IconType } from 'react-icons/lib';
import { ButtonProps } from 'styles/utils';
import { LoadingIcon, StyledAppButton } from './app-button.styles';

type CustomButton = ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps;

interface AppButtonProps extends CustomButton {
  loading?: boolean;
  text: string;
  icon?: ReactElement<IconType>;
}

export const AppButton = (props: AppButtonProps) => {
  const { disabled, loading, icon, text, ...rest } = props;
  return (
    <StyledAppButton {...rest} disabled={loading || disabled}>
      {loading && <LoadingIcon size={16} />}
      <span className="text">{text}</span>
      {icon}
    </StyledAppButton>
  );
};
