import { useEffect, useRef, SelectHTMLAttributes } from 'react';
import { useField } from '@unform/core';
import { InputWrapper } from './app-select.styles';

interface AppInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export const AppSelect = (props: AppInputProps) => {
  const inputRef = useRef(null);
  const { children, id, label, name, ...rest } = props;
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
      <select
        id={id}
        ref={inputRef}
        defaultValue={defaultValue}
        name={name}
        {...rest}
      >
        {children}
      </select>
    </InputWrapper>
  );
};
