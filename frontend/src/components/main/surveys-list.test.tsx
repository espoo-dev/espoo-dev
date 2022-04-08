import React from 'react';
import { AnswerSurveyStatus, Survey } from 'api/models/survey';
import { AnswerSurveyCreate } from 'api/models/answer_survey';
import { fireEvent, render, screen, waitFor } from 'test-utils';
import { AxiosInstance } from 'axios';
import { useRouter } from 'next/router';
import { SurveysList } from './SurveysList';
import { httpClient } from '../../api/client';

jest.mock('../../api/client', () => ({
  httpClient: {
    post: jest.fn(),
  },
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

const mockRouter = {
  push: jest.fn()
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);

const mockResponse = {
  mock: true,
};

const urlApiCreateAnswerSurvey = 'api/v1/answers_surveys';

const surveyDefault: Survey = {
  id: 1,
  name: 'Animals survey',
  description: 'Nice animals',
  answers_surveys: [],
  total_questions_quantity: 0,
  current_answers_survey: {
    id: 1,
    status: AnswerSurveyStatus.NotStarted,
    user_id: 439,
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
};

describe('Surveys list', () => {
  const data: Survey[] = [surveyDefault];

  it('should render the item passed to the list', () => {
    const { getByText } = render(
      <SurveysList setSurveySelected={jest.fn()} data={data} />
    );

    const surveyName = getByText('Animals survey');

    expect(surveyName).toBeInTheDocument();
  });

  it('should call the function when clicked', async () => {
    const surveyCompleted: Survey = { ...surveyDefault };
    surveyCompleted.current_answers_survey.status =
      AnswerSurveyStatus.Completed;

    (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
      jest.fn((url: string, body: AnswerSurveyCreate) =>
        Promise.resolve({ data: mockResponse })
      )
    );

    const { getByTestId } = render(
      <SurveysList setSurveySelected={jest.fn()} data={[surveyCompleted]} />
    );

    const buttonItem = getByTestId('Animals survey');

    fireEvent.click(buttonItem);

    await waitFor(() =>
      expect(httpClient.post).toHaveBeenCalledWith(urlApiCreateAnswerSurvey, {
        survey_id: 1,
      })
    );
  });

  it('should not call api when select survey not started', async () => {
    (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
      jest.fn(
        (url: string, body: AnswerSurveyCreate) =>
          new Promise((reject) => {
            reject({ response: { data: mockResponse } });
          })
      )
    );

    await waitFor(() =>
      expect(httpClient.post).not.toHaveBeenCalledWith(urlApiCreateAnswerSurvey)
    );
    expect(screen.queryByText('Animals survey')).toBeNull();
  });

  it('should select survey when it is not started', async () => {
    const mockSurveySelected = jest.fn();
    const rendered = render(
      <SurveysList setSurveySelected={mockSurveySelected} data={data} />
    );
    const buttonItem = rendered.getByTestId('Animals survey');

    fireEvent.click(buttonItem);
    (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
      jest.fn(
        (url: string, body: AnswerSurveyCreate) =>
          new Promise((reject) => {
            reject({ response: { data: mockResponse } });
          })
      )
    );

    await waitFor(() =>
      expect(httpClient.post).not.toHaveBeenCalledWith(urlApiCreateAnswerSurvey)
    );
  });

  describe('Check create answer survey', () => {
    it('should create answers survey when survey has no current answers survey', async () => {
      const surveyWithoutCurrent: Survey = { ...surveyDefault };
      surveyWithoutCurrent.current_answers_survey = null;
      surveyWithoutCurrent.id = 2;

      (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
        jest.fn((url: string, body: AnswerSurveyCreate) =>
          Promise.resolve({ data: mockResponse })
        )
      );

      const { getByTestId } = render(
        <SurveysList
          setSurveySelected={jest.fn()}
          data={[surveyWithoutCurrent]}
        />
      );

      const buttonItem = getByTestId('Animals survey');

      fireEvent.click(buttonItem);

      await waitFor(() =>
        expect(httpClient.post).toHaveBeenCalledWith(urlApiCreateAnswerSurvey, {
          survey_id: 2,
        })
      );
      expect(mockRouter.push).toHaveBeenCalledWith(
        `/surveys/${surveyDefault.id}`
      );
    });

    it('should create answers survey when survey has current answers survey with status completed', async () => {
      const surveyCompleted: Survey = { ...surveyDefault };
      surveyCompleted.current_answers_survey.status =
        AnswerSurveyStatus.Completed;
      surveyCompleted.id = 3;

      (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
        jest.fn((url: string, body: AnswerSurveyCreate) =>
          Promise.resolve({ data: mockResponse })
        )
      );

      const { getByTestId } = render(
        <SurveysList setSurveySelected={jest.fn()} data={[surveyCompleted]} />
      );

      const buttonItem = getByTestId('Animals survey');

      fireEvent.click(buttonItem);

      await waitFor(() =>
        expect(httpClient.post).toHaveBeenCalledWith(urlApiCreateAnswerSurvey, {
          survey_id: 3,
        })
      );
    });

    it('should not create answers survey when survey has current answers survey with status not started', async () => {
      const surveyNotStarted: Survey = { ...surveyDefault };
      surveyNotStarted.current_answers_survey.status =
        AnswerSurveyStatus.NotStarted;
      surveyNotStarted.id = 4;

      (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
        jest.fn((url: string, body: AnswerSurveyCreate) =>
          Promise.resolve({ data: mockResponse })
        )
      );

      const { getByTestId } = render(
        <SurveysList setSurveySelected={jest.fn()} data={[surveyNotStarted]} />
      );

      const buttonItem = getByTestId('Animals survey');

      fireEvent.click(buttonItem);

      await waitFor(() =>
        expect(httpClient.post).not.toHaveBeenCalledWith(
          urlApiCreateAnswerSurvey,
          {
            survey_id: 4,
          }
        )
      );
    });

    it('should not create answers survey when survey has current answers survey with status started', async () => {
      const surveyStarted: Survey = { ...surveyDefault };
      surveyStarted.current_answers_survey.status = AnswerSurveyStatus.Started;
      surveyStarted.id = 5;

      (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
        jest.fn((url: string, body: AnswerSurveyCreate) =>
          Promise.resolve({ data: mockResponse })
        )
      );

      const { getByTestId } = render(
        <SurveysList setSurveySelected={jest.fn()} data={[surveyStarted]} />
      );

      const buttonItem = getByTestId('Animals survey');

      fireEvent.click(buttonItem);

      await waitFor(() =>
        expect(httpClient.post).not.toHaveBeenCalledWith(
          urlApiCreateAnswerSurvey,
          {
            survey_id: 5,
          }
        )
      );
    });
  });
});
