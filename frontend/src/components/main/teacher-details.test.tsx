import { User } from 'api/models/user';
import React from 'react';
import { render, fireEvent, screen } from 'test-utils';
import { TeacherDetails } from './TeacherDetails';

describe('Teacher details', () => {
  let mockTeacher!: User;

  beforeAll(() => {
    mockTeacher = {
      email: 'admin@admin.com',
      id: 1,
      phone: '',
      role: {
        id: 1,
        role_type: 'admin',
      },
    };
  });

  it('should create the component with the given data', () => {
    const { getByText } = render(<TeacherDetails data={mockTeacher} />);
    const element = getByText(mockTeacher.email);
    expect(element).toBeInTheDocument();
  });

  it('should run the function when clicked on follow button', () => {
    const mockFollow = jest.fn();
    const { getByText } = render(
      <TeacherDetails data={mockTeacher} onClickFollow={mockFollow} />
    );

    const followBtn = getByText('Follow');
    fireEvent.click(followBtn);

    expect(mockFollow).toBeCalledTimes(1);
  });

  it('should run the function when clicked on close button', () => {
    const mockClose = jest.fn();
    const { getByTitle } = render(
      <TeacherDetails data={mockTeacher} onClickClose={mockClose} />
    );

    const closeBtn = getByTitle('close');
    fireEvent.click(closeBtn);

    expect(mockClose).toBeCalledTimes(1);
  });

  it('should show dashes when email is empty', () => {
    mockTeacher.email = '';

    const { getByTestId } = render(
      <TeacherDetails data={mockTeacher} />
    );

    const emailEl = getByTestId('user_email');

    expect(emailEl).toHaveTextContent('---');
  });
});
