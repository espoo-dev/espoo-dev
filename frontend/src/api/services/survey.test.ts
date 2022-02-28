import { Survey } from '@api/models/survey';
import { UserFilters } from '@api/models/user';
import { AxiosInstance, AxiosResponse } from 'axios';
import { httpClient } from '../client';
import { SurveyService } from './survey';

jest.mock('../client', () => ({
  httpClient: {
    get: jest.fn(),
  },
}));

// expected result to tests
const mockResponse = {
  mock: true,
};

const mockUserFilter: UserFilters = {
  role_id: 1,
};

describe('SurveyService', () => {
  let instance: SurveyService;
  let res: AxiosResponse<Survey[]>;
  let resById: AxiosResponse<Survey>;

  describe('list method', () => {
    describe('when returns expected data', () => {
      beforeEach(async () => {
        (httpClient as jest.Mocked<AxiosInstance>).get.mockImplementationOnce(
          jest.fn((url: string) => Promise.resolve({ data: mockResponse }))
        );

        instance = new SurveyService(httpClient as unknown);

        res = await instance.list();
      });

      it('should call the get method', () => {
        expect(httpClient.get).toHaveBeenCalled();
      });

      it('should return the expected data', () => {
        expect(res.data).toEqual(mockResponse);
      });
    });

    describe('when returns an error', () => {
      beforeEach(async () => {
        (httpClient as jest.Mocked<AxiosInstance>).get.mockImplementationOnce(
          jest.fn((url: string) => Promise.reject(new Error('test error')))
        );

        instance = new SurveyService(httpClient as unknown);

        res = await instance.list();
      });

      it('should call the get method', () => {
        expect(httpClient.get).toHaveBeenCalled();
      });

      it('should return the expected data', () => {
        expect(res).toEqual(undefined);
      });
    });
  });

  describe('get by id method', () => {
    describe('when returns expected data', () => {
      beforeEach(async () => {
        (httpClient as jest.Mocked<AxiosInstance>).get.mockImplementationOnce(
          jest.fn((url: string) => Promise.resolve({ data: mockResponse }))
        );

        instance = new SurveyService(httpClient as unknown);

        resById = await instance.get(1);
      });

      it('should call the get method', () => {
        expect(httpClient.get).toHaveBeenCalled();
      });

      it('should return the expected data', () => {
        expect(resById.data).toEqual(mockResponse);
      });
    });

    describe('when returns an error', () => {
      beforeEach(async () => {
        (httpClient as jest.Mocked<AxiosInstance>).get.mockImplementationOnce(
          jest.fn((url: string) => Promise.reject(new Error('test error')))
        );

        instance = new SurveyService(httpClient as unknown);

        resById = await instance.get(1);
      });

      it('should call the get method', () => {
        expect(httpClient.get).toHaveBeenCalled();
      });

      it('should return the expected data', () => {
        expect(resById).toEqual(undefined);
      });
    });
  });
});
