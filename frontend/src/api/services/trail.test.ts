import { Trail } from '@api/models/trail';
import { AxiosInstance, AxiosResponse } from 'axios';
import mockManyGroups from 'utils/mocks/groups';
import { httpClient } from '../client';
import { TrailService } from './trail';

jest.mock('../client', () => ({
  httpClient: {
    get: jest.fn(),
  },
}));

describe('TrailService', () => {
  let instance: TrailService;
  let res: AxiosResponse<Trail[]>;

  describe('list method', () => {
    describe('when returns expected data', () => {
      beforeEach(async () => {
        (httpClient as jest.Mocked<AxiosInstance>).get.mockImplementationOnce(
          jest.fn((url: string) => Promise.resolve({ data: mockManyGroups }))
        );

        instance = new TrailService(httpClient);

        res = await instance.list();
      });

      it('should call the get method', () => {
        expect(httpClient.get).toHaveBeenCalled();
      });

      it('should return the expected data', () => {
        expect(res.data).toEqual(mockManyGroups);
      });
    });

    describe('when returns an error', () => {
      beforeEach(async () => {
        (httpClient as jest.Mocked<AxiosInstance>).get.mockImplementationOnce(
          jest.fn((url: string) => Promise.reject(new Error('test error')))
        );

        instance = new TrailService(httpClient);

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
});
