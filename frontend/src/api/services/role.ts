import { errorHandler } from '@api/error-handler';
import { Role } from 'api/models/role';
import { AxiosInstance, AxiosResponse } from 'axios';

export class RoleService {
  constructor(private httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  public async list(): Promise<AxiosResponse<Role[] | undefined>> {
    try {
      const response = await this.httpClient.get<Role[]>('/api/v1/roles');

      if (response) {
        return response;
      }
    } catch (error) {
      errorHandler(error);
    }

    return undefined;
  }
}
