import React from 'react';
import { Survey } from 'api/models/survey';
import { AnswerSurveyCreate } from 'api/models/answer_survey';
import { fireEvent, render, screen, waitFor } from 'test-utils';
import { SurveysList } from './SurveysList';
import { AxiosInstance } from 'axios';
import { httpClient } from '../../api/client';

jest.mock('../../api/client', () => ({
  httpClient: {
    post: jest.fn(),
  },
}));

describe('Surveys list', () => {
  const data: Survey[] = [
    {
      id: 1,
      name: 'Animals survey',
      description: 'Nice animals',
      answers_surveys: [],
      current_answers_survey: {
        id: 1,
        status: 'not started',
        user_id: 439,
      },
      questions: [
        {
          id: 1,
          name: 'What is your favorite animal?',
          question_type: {
            id: 1,
            name: 'Single Choice',
          },
        },
      ],
      survey_subject_id: 12,
    },
  ];

  it('should render the item passed to the list', () => {
    const { getByText } = render(<SurveysList data={data} />);

    const surveyName = getByText('Animals survey');

    expect(surveyName).toBeInTheDocument();
  });

  it('should call the function when clicked', async () => {
    const mockResponse = {
      mock: true,
    };

    (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
      jest.fn((url: string, body: AnswerSurveyCreate) => {
        return Promise.resolve({ data: mockResponse });
      })
    );

    const { getByTestId } = render(<SurveysList data={data} />);

    const buttonItem = getByTestId('Animals survey');

    fireEvent.click(buttonItem);

    await waitFor(() =>
      expect(httpClient.post).toHaveBeenCalledWith('api/v1/answers_surveys', {
        survey_id: 1,
      })
    );
  });

  it('should not show a survey when api return error', async () => {
    const mockResponse = {
      mock: true,
    };

    (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
      jest.fn((url: string, body: AnswerSurveyCreate) => {
        return Promise.reject({ response: { data: mockResponse } });
      })
    );

    await waitFor(() =>
      expect(httpClient.post).toHaveBeenCalledWith('api/v1/answers_surveys', {
        survey_id: 1,
      })
    );
    expect(screen.queryByText('Animals survey')).toBeNull();
  });
});
