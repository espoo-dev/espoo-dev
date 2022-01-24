import { render, fireEvent, screen, waitFor } from 'test-utils';
import MultipleChoice from './multiple-choice';

let options = [];

describe('MultipleChoice', () => {
  beforeEach(() => {
    options = [
      {
        id: 1,
        name: 'Cat',
      },
      {
        id: 2,
        name: 'Dog',
      },
    ];
  });
  it('should render component with all options', () => {
    const rendered = render(
      <MultipleChoice options={options} setResult={jest.fn()} />
    );
    options.map((option) => {
      expect(rendered.getAllByText(option.name)).toHaveLength(1);
    });
  });

  it('should select only one option', () => {
    const rendered = render(
      <MultipleChoice options={options} setResult={jest.fn()} />
    );
    const buttonItem = rendered.getByText(options[0].name);
    fireEvent.click(buttonItem);
    expect(screen.getByTestId(options[0].id + '-selected')).toBeInTheDocument();
    expect(
      screen.getByTestId(options[1].id + '-unselected')
    ).toBeInTheDocument();
  });

  it('should select many options', () => {
    const rendered = render(
      <MultipleChoice options={options} setResult={jest.fn()} />
    );
    options.map((option) => {
      const buttonItem = rendered.getByText(option.name);
      fireEvent.click(buttonItem);
      expect(screen.getByTestId(option.id + '-selected')).toBeInTheDocument();
    });
  });
});
