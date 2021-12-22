import { fireEvent, render, screen } from 'test-utils';
import SingleChoice from './single-choice';

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

interface CreateAnswer {
  question_id: number;
  answers_survey_id: number;
  user_answer: string;
  option_ids: [number];
}

describe('SingleChoice', () => {
  it('should render all options', () => {
    render(<SingleChoice options={options} />);
    options.map((option) => {
      expect(screen.getByText(option.name)).toBeInTheDocument();
    });
  });

  it('should call api when click in any option', () => {
    const mockResponse = {
      mock: true,
    };
    const mockPost = jest.fn((url: string, body: CreateAnswer) => {
      return Promise.resolve({ data: mockResponse });
    });

    const { getByText } = render(<SingleChoice options={options} />);
    const buttonItem = getByText('Cat');
    fireEvent.click(buttonItem);

    expect(mockPost).toHaveBeenCalled();
  });
});
