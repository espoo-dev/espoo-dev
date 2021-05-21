import { AxiosInstance, AxiosResponse } from 'axios';
import { User, UserFilters } from '../models/user';

export class UserService {
  constructor(private httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  public async list(
    filters: UserFilters
  ): Promise<AxiosResponse<User[] | undefined>> {
    const response = await this.httpClient.get<User[]>('/api/v1/users', {
      params: filters,
    });

    if (response) {
      return response;
    }

    return undefined;
  }
}
