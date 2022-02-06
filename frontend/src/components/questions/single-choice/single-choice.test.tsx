import { act, fireEvent, render, screen, waitFor } from 'test-utils';
import { SingleChoice } from './single-choice';

const options = [
  {
    id: 1,
    name: 'Cat',
  },
  {
    id: 2,
    name: 'Dog',
  },
  {
    id: 3,
    name: 'A bigger name',
  },
];

describe('SingleChoice', () => {
  it('should render all options', () => {
    render(<SingleChoice options={options} setResult={jest.fn()} />);
    options.forEach((option) => {
      expect(screen.getByText(option.name)).toBeInTheDocument();
    });
  });

  it('should select an option', async () => {
    const [option] = options;
    const testId = `single_choice_option_${option.id}`;

    const { getByTestId } = render(
      <SingleChoice options={options} setResult={jest.fn()} />
    );

    const buttonItem = getByTestId(testId);
    expect(buttonItem).toBeInTheDocument();

    act(() => {
      fireEvent.click(buttonItem);
    });

    await waitFor(() => {
      expect(buttonItem.getAttribute('aria-selected')).toEqual('true');

      const [, ...rest] = options;

      rest.forEach((opt) => {
        expect(
          getByTestId(`single_choice_option_${opt.id}`).getAttribute(
            'aria-selected'
          )
        ).toEqual('false');
      });
    });
  });
});
