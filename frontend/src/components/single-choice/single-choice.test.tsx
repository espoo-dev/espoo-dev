import { httpClient } from '@api/client';
import { AnswerCreate } from '@api/models/answer';
import { AnswerSurveyStatus, Survey } from '@api/models/survey';
import { AxiosInstance } from 'axios';
import { fireEvent, render, screen, waitFor } from 'test-utils';
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

const survey: Survey = {
  id: 636,
  name: 'Animals survey - Teacher',
  description: 'Nice animals',
  survey_subject_id: 365,
  answers_surveys: [
    { id: 129, user_id: 692, status: AnswerSurveyStatus.Completed },
    { id: 130, user_id: 692, status: AnswerSurveyStatus.Completed },
  ],
  current_answers_survey: {
    id: 130,
    user_id: 692,
    status: AnswerSurveyStatus.Completed,
  },
  questions: [
    {
      id: 877,
      name: 'What is your favorite animal?',
      question_type: { id: 286, name: 'Single Choice' },
      options: [
        { id: 1157, name: 'Eagle' },
        { id: 1158, name: 'Dog' },
      ],
    },
    {
      id: 878,
      name: 'What is the bigger animal?',
      question_type: { id: 286, name: 'Single Choice' },
      options: [
        { id: 1159, name: 'Cat' },
        { id: 1160, name: 'Horse' },
      ],
    },
  ],
};

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
        options={survey.questions[0].options}
        setResult={jest.fn()}
        current_answers_survey_id={survey.current_answers_survey.id}
        question_id={survey.questions[0].id}
      />
    );
    const optionSelected = survey.questions[0].options[0];
    const buttonItem = getByText(optionSelected.name);
    fireEvent.click(buttonItem);

    await waitFor(() =>
      expect(httpClient.post).toHaveBeenCalledWith('api/v1/answers', {
        question_id: survey.questions[0].id,
        answers_survey_id: survey.current_answers_survey.id,
        option_ids: [optionSelected.id],
      })
    );
  });
});
