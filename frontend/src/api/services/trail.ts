import { errorHandler } from '@api/error-handler';
import { Trail } from '@api/models/trail';
import { AxiosInstance, AxiosResponse } from 'axios';

export class TrailService {
  constructor(private httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  public async list(): Promise<AxiosResponse<Trail[] | undefined>> {
    try {
      const response = await this.httpClient.get<Trail[]>('/api/v1/trails', {
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

  public async get(id: number): Promise<AxiosResponse<Trail | undefined>> {
    try {
      const response = await this.httpClient.get<Trail>(
        `/api/v1/trails/${id}`,
        {
          params: {},
        }
      );

      if (response) {
        return response;
      }
    } catch (error) {
      errorHandler(error);
    }

    return undefined;
  }
}
