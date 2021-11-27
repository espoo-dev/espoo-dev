import { AxiosInstance, AxiosResponse } from 'axios';
import { httpClient } from '../client';
import { AnswerSurvey, AnswerSurveyCreate } from '@api/models/answer_survey';
import { AnswerSurveyService } from './answer_survey';

// Mocking httpClient
jest.mock('../client', () => ({
  httpClient: {
    post: jest.fn()
  }
}));

// expected result to tests
const mockResponse = {
  mock: true
};

// Mock survey create
const mockAnswerSurveyCreate: AnswerSurveyCreate = {
  survey_id: 1,
};

describe('AnswerSurveyService', () => {
  let instance: AnswerSurveyService;
  let res: AxiosResponse<AnswerSurvey>;

  describe('register method', () => {
    describe('when returns expected data', () => {
      beforeEach(async () => {
        // mocking post implementation to return the expected value
        (httpClient as jest.Mocked<AxiosInstance>)
          .post
          .mockImplementationOnce(
            jest.fn((url: string, body: AnswerSurveyCreate) => {
              return Promise.resolve({ data: mockResponse });
            }
          )
        );

        instance = new AnswerSurveyService(httpClient as any);

        res = await instance.register(mockAnswerSurveyCreate);
      })

      it('should call post method once', () => {
        expect(httpClient.post).toHaveBeenCalled();
      });

      it('should return expected data', () => {
        expect(res.data).toEqual(mockResponse);
      });
    });

    describe('when returns an error', () => {
      beforeEach(async () => {
        // mocking post implementation to throw error
        (httpClient as jest.Mocked<AxiosInstance>)
          .post
          .mockImplementationOnce(
            jest.fn((url: string, body: AnswerSurveyCreate) => {
              return Promise.reject({ data: mockResponse });
            }
          )
        );

        instance = new AnswerSurveyService(httpClient as any);

        res = await instance.register(mockAnswerSurveyCreate);
      });

      it('should call post method', () => {
        expect(httpClient.post).toHaveBeenCalled();
      });

      it('should return expected data', () => {
        expect(res).toEqual(undefined);
      });
    });
  });
});
