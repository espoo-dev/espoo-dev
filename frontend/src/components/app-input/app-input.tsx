import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { InputWrapper } from './app-input.styles';

interface AppInputProps {
  label: string;
  placeholder: string;
  id: string;
  type: string;
  name: string;
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
}

const defaultProps = {
  required: undefined,
  min: undefined,
  max: undefined,
  minLength: undefined,
  maxLength: undefined,
};

export const AppInput = (props: AppInputProps) => {
  const inputRef = useRef(null);
  const { id, label, placeholder, type, name, ...rest } = props;
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <InputWrapper>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type || 'text'}
        placeholder={placeholder}
        ref={inputRef}
        defaultValue={defaultValue}
        name={name}
        {...rest}
      />
    </InputWrapper>
  );
};

AppInput.defaultProps = defaultProps;
