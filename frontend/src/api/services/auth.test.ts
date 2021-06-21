import { AxiosResponse } from 'axios';
import { AuthService } from './auth';
import { httpClient } from '../client';
import { User, UserLogin } from 'api/models/user';

const expectedRes = {
  mock: true
};

jest.mock('../client', () => ({
  httpClient: {
    post: jest.fn((url: string, body: User) => Promise.resolve({ data: expectedRes }))
  }
}));

describe('AuthService', () => {
  let user: UserLogin;
  let instance: AuthService;
  let res: AxiosResponse<User>;

  describe('when returns valid data', () => {
    beforeEach(async () => {
      user = {
        email: 'admin@gmail.com',
        password: '123456',
      };

      instance = new AuthService(httpClient as any);

      res = await instance.authenticate(user);
    });

    it('should call the post method', async () => {
      expect(httpClient.post).toHaveBeenCalledTimes(1);
    });

    it('should return the expected data', async () => {
      expect(res.data).toEqual(expectedRes);
    });
  });

  describe('when return invalid data', () => {
    // TODO
  });
});
