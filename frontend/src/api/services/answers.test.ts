import { AxiosInstance, AxiosResponse } from 'axios';
import { httpClient } from '../client';
import { AnswerCreate } from '@api/models/answer';
import { Question } from '@api/models/survey';
import { AnswerService } from './answers';

jest.mock('../client', () => ({
  httpClient: {
    post: jest.fn(),
  },
}));

const mockResponse = {
  mock: true,
};

const mockAnswerCreate: AnswerCreate = {
  question_id: 1,
  answers_survey_id: 1,
  user_answer: 'test',
  option_ids: [1],
};

describe('AnswerService', () => {
  let instance: AnswerService;
  let res: AxiosResponse<Question>;

  describe('create answer method', () => {
    describe('when returns expected data', () => {
      beforeEach(async () => {
        (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
          jest.fn((url: string, body: AnswerCreate) => {
            return Promise.resolve({ data: mockResponse });
          })
        );

        instance = new AnswerService(httpClient as any);

        res = await instance.create(mockAnswerCreate);
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
        (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
          jest.fn((url: string, body: AnswerCreate) => {
            return Promise.reject({ data: mockResponse });
          })
        );

        instance = new AnswerService(httpClient as any);

        res = await instance.create(mockAnswerCreate);
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
