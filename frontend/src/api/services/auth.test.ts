import { AxiosInstance, AxiosResponse } from 'axios';
import { User, UserCreate, UserLogin } from 'api/models/user';
import { AuthService } from './auth';
import { httpClient } from '../client';

jest.mock('../client', () => ({
  httpClient: {
    post: jest.fn(),
  },
}));

// expected result to tests
const mockResponse = {
  mock: true,
};

// mocked user
const mockUserLogin: UserLogin = {
  email: 'admin@gmail.com',
  password: '123456',
};

const mockUserCreate: UserCreate = {
  email: 'admin@gmail.com',
  password: '123456',
  role_id: 1,
};

describe('AuthService', () => {
  let instance: AuthService;
  let res: AxiosResponse<User>;

  describe('authenticate method', () => {
    describe('when returns valid data', () => {
      beforeEach(async () => {
        // mocking post implementation to return the expected value
        (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
          jest.fn((url: string, body: UserLogin) =>
            Promise.resolve({ data: mockResponse })
          )
        );

        instance = new AuthService(httpClient as unknown);

        res = await instance.authenticate(mockUserLogin);
      });

      it('should call the post method', () => {
        expect(httpClient.post).toHaveBeenCalled();
      });

      it('should return the expected data', () => {
        expect(res.data).toEqual(mockResponse);
      });
    });

    describe('when request throw error', () => {
      beforeEach(async () => {
        // mocking post implementation to throw error
        (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
          jest.fn((url: string, body: UserLogin) =>
            Promise.reject(new Error('test error'))
          )
        );

        instance = new AuthService(httpClient as unknown);

        res = await instance.authenticate(mockUserLogin);
      });

      it('should call the post method', () => {
        expect(httpClient.post).toHaveBeenCalled();
      });

      it('should return undefined when there is an error in the request', () => {
        expect(res).toEqual(undefined);
      });
    });
  });

  describe('register method', () => {
    describe('when returns the expected data', () => {
      beforeEach(async () => {
        // mocking post implementation to return the expected value
        (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
          jest.fn((url: string, body: UserCreate) =>
            Promise.resolve({ data: mockResponse })
          )
        );

        instance = new AuthService(httpClient as unknown);

        res = await instance.register(mockUserCreate);
      });

      it('should call the post method once', () => {
        expect(httpClient.post).toHaveBeenCalled();
      });

      it('should return the expected data', () => {
        expect(res.data).toEqual(mockResponse);
      });
    });

    describe('when the request throw error', () => {
      beforeEach(async () => {
        // mocking post implementation to return the expected value
        (httpClient as jest.Mocked<AxiosInstance>).post.mockImplementationOnce(
          jest.fn((url: string, body: UserCreate) =>
            Promise.reject(new Error('test error'))
          )
        );

        instance = new AuthService(httpClient as unknown);

        res = await instance.register(mockUserCreate);
      });

      it('should call the post method', () => {
        expect(httpClient.post).toHaveBeenCalled();
      });

      it('should return the expected data', () => {
        expect(res).toEqual(undefined);
      });
    });
  });
});
