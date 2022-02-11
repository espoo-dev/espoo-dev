import { Group } from '@api/models/group';
import { AxiosInstance, AxiosResponse } from 'axios';
import mockManyGroups from 'utils/mocks/groups';
import { httpClient } from '../client';
import { GroupService } from './group';

jest.mock('../client', () => ({
  httpClient: {
    get: jest.fn(),
  },
}));

describe('GroupService', () => {
  let instance: GroupService;
  let res: AxiosResponse<Group[]>;

  describe('list method', () => {
    describe('when returns expected data', () => {
      beforeEach(async () => {
        (httpClient as jest.Mocked<AxiosInstance>).get.mockImplementationOnce(
          jest.fn((url: string) => Promise.resolve({ data: mockManyGroups }))
        );

        instance = new GroupService(httpClient);

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

        instance = new GroupService(httpClient);

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
