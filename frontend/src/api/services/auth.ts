import { errorHandler } from 'api/error-handler';
import { AxiosInstance, AxiosResponse } from 'axios';
import { UserLogin, User, UserCreate } from '../models/user';

export class AuthService {
  constructor(private httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  public async authenticate(
    user: UserLogin
  ): Promise<AxiosResponse<User | undefined>> {
    try {
      const response = await this.httpClient.post<User>('/users/sign_in', {
        user,
      });

      return response;
    } catch (error) {
      errorHandler(error);
    }

    return undefined;
  }

  public async register(
    user: UserCreate
  ): Promise<AxiosResponse<User | undefined>> {
    try {
      const response = await this.httpClient.post<User>('api/v1/users', user);

      return response;
    } catch (error) {
      errorHandler(error);
    }

    return undefined;
  }
}
