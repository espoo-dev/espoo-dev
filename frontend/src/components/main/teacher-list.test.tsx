import { User } from 'api/models/user';
import React from 'react';
import { fireEvent, render } from 'test-utils';
import { TeachersList } from './TeachersList';

describe('Teacher list', () => {
  it('should render the item passed to the list', () => {
    const data: User[] = [
      {
        email: 'admin@gmail.com',
        id: 1,
        phone: '',
        role: {
          id: 1,
          role_type: 'admin',
        },
      },
    ];

    const { getByText } = render(
      <TeachersList data={data} onSelect={() => { }} />
    );

    const user = getByText('admin@gmail.com');

    expect(user).toBeInTheDocument();
  });

  it('should call the function when clicked', () => {
    const mockSelect = jest.fn();
    const data: User[] = [
      {
        email: 'admin@gmail.com',
        id: 1,
        phone: '',
        role: {
          id: 1,
          role_type: 'admin',
        },
      },
    ];

    const { getByTestId } = render(
      <TeachersList data={data} onSelect={mockSelect} />
    );

    const listItem = getByTestId('admin@gmail.com');

    fireEvent.click(listItem);

    expect(mockSelect).toBeCalledTimes(1);
  });

  it('should not render the component without the props', () => {
    const { getByText } = render(
      <TeachersList data={[]} onSelect={() => { }} />
    );

    const emptyMsg = getByText('No data to display...');

    expect(emptyMsg).toBeInTheDocument();
  });
});
