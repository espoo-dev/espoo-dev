import { Meta, Story } from '@storybook/react';
import { ContainerForm } from '@styles/login.styles';
import React, { useRef } from 'react';
import { AppInput, AppInputProps } from './app-input';

export default {
  title: 'Components/AppInput',
  component: AppInput,
} as Meta;

const Template: Story<AppInputProps> = (args) => {
  const formRef = useRef();
  return (
    <ContainerForm ref={formRef} onSubmit={null}>
      <AppInput {...args} />
    </ContainerForm>
  );
};

export const Text = Template.bind({});
Text.args = {
  id: 'id-text',
  label: 'Label',
  name: 'name',
  placeholder: 'Type a text',
  type: 'text',
};

export const Required = Template.bind({});
Required.args = {
  id: 'id-required',
  label: 'Required',
  name: 'name',
  placeholder: 'Type in a required field',
  type: 'text',
  required: true,
};

export const Number = Template.bind({});
Number.args = {
  id: 'id-number',
  label: 'Number',
  name: 'name',
  placeholder: '0',
  type: 'number',
  min: 0,
  max: 100,
};

export const Password = Template.bind({});
Password.args = {
  id: 'id-password',
  label: 'Password',
  name: 'name',
  placeholder: 'Type a password',
  type: 'password',
};
