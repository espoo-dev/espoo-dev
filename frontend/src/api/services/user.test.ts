import { User, UserFilters } from '@api/models/user';
import { AxiosInstance, AxiosResponse } from 'axios';
import { UserService } from './user';
import { httpClient } from '../client';

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

describe('RoleService', () => {
  let instance: UserService;
  let res: AxiosResponse<User[]>;

  describe('list method', () => {
    describe('when returns expected data', () => {
      beforeEach(async () => {
        (httpClient as jest.Mocked<AxiosInstance>).get.mockImplementationOnce(
          jest.fn((url: string) => Promise.resolve({ data: mockResponse }))
        );

        instance = new UserService(httpClient as unknown);

        res = await instance.list(mockUserFilter);
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

        instance = new UserService(httpClient as unknown);

        res = await instance.list(mockUserFilter);
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
