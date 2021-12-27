import { errorHandler } from '@api/error-handler';
import { Survey } from 'api/models/survey';
import { AxiosInstance, AxiosResponse } from 'axios';

export class SurveyService {
  constructor(private httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  public async list(): Promise<AxiosResponse<Survey[] | undefined>> {
    try {
      const response = await this.httpClient.get<Survey[]>('/api/v1/surveys', {
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

  public async get(id: number): Promise<AxiosResponse<Survey | undefined>> {
    try {
      const response = await this.httpClient.get<Survey>(
        `/api/v1/surveys/${id}`,
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
