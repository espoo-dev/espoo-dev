import { AxiosInstance } from 'axios';
import { AuthService } from './auth';
import { httpClient } from '../client';

jest.mock('./auth');
jest.mock('../client');

const factory = () => {
  const MockClient = httpClient as jest.Mocked<AxiosInstance>;
  const MockService = AuthService as jest.Mock<AuthService>;

  return {
    MockClient,
    MockService,
  };
};

describe('AuthService', () => {
  it('should make a request', async () => {
    const { MockClient, MockService } = factory();

    const user = {
      email: 'admin@gmail.com',
      password: '123456',
    };

    const instance = new MockService(MockClient) as jest.Mocked<AuthService>;

    const res = await instance.authenticate(user);

    console.log('res', res);

    expect(MockClient.post).toHaveBeenCalledTimes(1);
    expect(res).toHaveProperty('data');
  });
});
