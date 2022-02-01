import { httpClient } from '@api/client';
import { AnswerCreate } from '@api/models/answer';
import { AxiosInstance } from 'axios';
import { fireEvent, render, screen, waitFor } from 'test-utils';
import mockSurvey from 'utils/mocks/survey';
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


jest.mock('../../api/client', () => ({
  httpClient: {
    post: jest.fn(),
  },
}));

describe('SingleChoice', () => {
  it('should render all options', () => {
    render(<SingleChoice options={options} setResult={jest.fn()} />);
    options.map((option) => {
      expect(screen.getByText(option.name)).toBeInTheDocument();
    });
  });

  it('should not call api when click in option without question and current survey', async () => {
    const mockResponse = {
      mock: true,
    };

    (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
      jest.fn((url: string, body: AnswerCreate) => {
        return Promise.resolve({ data: mockResponse });
      })
    );

    const { getByText } = render(
      <SingleChoice options={options} setResult={jest.fn()} />
    );
    const buttonItem = getByText('Cat');
    fireEvent.click(buttonItem);

    await waitFor(() =>
      expect(httpClient.post).not.toHaveBeenCalledWith('api/v1/answers')
    );
  });

  it('should call api when click in option with question and current survey', async () => {
    const mockResponse = {
      mock: true,
    };

    (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
      jest.fn((url: string, body: AnswerCreate) => {
        return Promise.resolve({ data: mockResponse });
      })
    );

    const { getByText } = render(
      <SingleChoice
        options={mockSurvey.questions[0].options}
        setResult={jest.fn()}
        current_answers_survey_id={mockSurvey.current_answers_survey.id}
        question_id={mockSurvey.questions[0].id}
      />
    );
    const optionSelected = mockSurvey.questions[0].options[0];
    const buttonItem = getByText(optionSelected.name);
    fireEvent.click(buttonItem);

    await waitFor(() =>
      expect(httpClient.post).toHaveBeenCalledWith('api/v1/answers', {
        question_id: mockSurvey.questions[0].id,
        answers_survey_id: mockSurvey.current_answers_survey.id,
        option_ids: [optionSelected.id],
      })
    );
  });
});
