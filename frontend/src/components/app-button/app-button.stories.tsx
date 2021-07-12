import React from 'react';
import { Meta, Story } from '@storybook/react';
import { AppButton, AppButtonProps } from './app-button';

export default {
  title: 'Components/AppButton',
  component: AppButton,
} as Meta;

const Template: Story<AppButtonProps> = (args) => <AppButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: 'Send',
};
