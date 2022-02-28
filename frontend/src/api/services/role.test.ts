import { Role } from '@api/models/role';
import { AxiosInstance, AxiosResponse } from 'axios';
import { RoleService } from './role';
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

describe('RoleService', () => {
  let instance: RoleService;
  let res: AxiosResponse<Role[]>;

  describe('list method', () => {
    describe('when returns expected data', () => {
      beforeEach(async () => {
        (httpClient as jest.Mocked<AxiosInstance>).get.mockImplementationOnce(
          jest.fn((url: string) => Promise.resolve({ data: mockResponse }))
        );

        instance = new RoleService(httpClient as unknown);

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

        instance = new RoleService(httpClient as unknown);

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
