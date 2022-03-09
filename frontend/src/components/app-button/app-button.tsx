import React, { ButtonHTMLAttributes, ReactElement } from 'react';
import { IconType } from 'react-icons/lib';
import { ButtonProps } from '@styles/utils';
import { Tooltip } from '@chakra-ui/react';
import { LoadingIcon, StyledAppButton } from './app-button.styles';

type CustomButton = ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps;

export interface AppButtonProps extends CustomButton {
  loading?: boolean;
  text?: string;
  icon?: ReactElement<IconType>;
  tooltip?: string;
}

const defaultProps = {
  icon: undefined,
  loading: false,
};

export const AppButton = (props: AppButtonProps) => {
  const { disabled, loading, icon, text, tooltip, ...rest } = props;
  return (
    <Tooltip label={tooltip} placement="top">
      <StyledAppButton {...rest} disabled={loading || disabled}>
        {loading && <LoadingIcon data-testid="loading_icon" size={16} />}
        {text ? <span className="text">{text}</span> : null}
        {icon}
      </StyledAppButton>
    </Tooltip>
  );
};

AppButton.defaultProps = defaultProps;
