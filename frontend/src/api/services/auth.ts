import { AxiosInstance, AxiosResponse } from 'axios';
import { UserLogin, User, UserCreate } from '../models/user';

export class AuthService {
  constructor(private httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  public async authenticate(
    user: UserLogin
  ): Promise<AxiosResponse<User | undefined>> {
    const response = await this.httpClient.post<User>('/users/sign_in', {
      user,
    });

    if (response) {
      return response;
    }

    return undefined;
  }

  public async register(
    user: UserCreate
  ): Promise<AxiosResponse<User | undefined>> {
    const response = await this.httpClient.post<User>('api/v1/users', user);

    if (response) {
      return response;
    }

    return undefined;
  }
}
