import { errorHandler } from '@api/error-handler';
import { Group } from '@api/models/group';
import { AxiosInstance, AxiosResponse } from 'axios';

export class GroupService {
  constructor(private httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  public async list(): Promise<AxiosResponse<Group[] | undefined>> {
    try {
      const response = await this.httpClient.get<Group[]>('/api/v1/groups', {
        params: {},
      });

      if (response) {
        return response;
      }
    } catch (error) {
      errorHandler(error);
    }

    return undefined;
  }
}
