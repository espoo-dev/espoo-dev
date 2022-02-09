import { AxiosInstance, AxiosResponse } from 'axios';
import {
  AnswerSurvey,
  AnswerSurveyCreate,
  AnswerSurveyGet,
} from '@api/models/answer_survey';
import { httpClient } from '../client';
import { AnswerSurveyService } from './answer_survey';

jest.mock('../client', () => ({
  httpClient: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

// expected result to tests
const mockResponse = {
  mock: true,
};

// Mock survey create
const mockAnswerSurveyCreate: AnswerSurveyCreate = {
  survey_id: 1,
};

const mockAnswerSurveyGet: AnswerSurveyGet = {
  id: 224,
};

describe('AnswerSurveyService', () => {
  let instance: AnswerSurveyService;
  let res: AxiosResponse<AnswerSurvey>;

  describe('register method', () => {
    describe('when returns expected data', () => {
      beforeEach(async () => {
        // mocking post implementation to return the expected value
        (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
          jest.fn((url: string, body: AnswerSurveyCreate) =>
            Promise.resolve({ data: mockResponse })
          )
        );

        instance = new AnswerSurveyService(httpClient as unknown);

        res = await instance.register(mockAnswerSurveyCreate);
      });

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
        (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
          jest.fn((url: string, body: AnswerSurveyCreate) =>
            Promise.reject({ data: mockResponse })
          )
        );

        instance = new AnswerSurveyService(httpClient as unknown);

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

  describe('get', () => {
    describe('when returns expected data', () => {
      beforeEach(async () => {
        // mocking post implementation to return the expected value
        (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
          jest.fn((url: string, body: AnswerSurveyGet) =>
            Promise.resolve({ data: mockResponse })
          )
        );

        instance = new AnswerSurveyService(httpClient as unknown);

        res = await instance.get(mockAnswerSurveyGet);
      });

      it('should call get method once', () => {
        expect(httpClient.get).toHaveBeenCalled();
      });

      it('should return expected data', () => {
        expect(res).toEqual(undefined);
      });
    });

    describe('when returns an error', () => {
      beforeEach(async () => {
        // mocking post implementation to throw error
        (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
          jest.fn((url: string, body: AnswerSurveyGet) =>
            Promise.reject({ data: mockResponse })
          )
        );

        instance = new AnswerSurveyService(httpClient as unknown);

        res = await instance.get(mockAnswerSurveyGet);
      });

      it('should call get method', () => {
        expect(httpClient.get).toHaveBeenCalled();
      });

      it('should return expected data', () => {
        expect(res).toEqual(undefined);
      });
    });
  });
});
