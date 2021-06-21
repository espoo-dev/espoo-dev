import { Survey } from 'api/models/survey';
import { AxiosInstance, AxiosResponse } from 'axios';

export class SurveyService {
  constructor(private httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  public async list(): Promise<AxiosResponse<Survey[] | undefined>> {
    const response = await this.httpClient.get<Survey[]>('/api/v1/surveys', {
      params: {},
    });

    if (response) {
      return response;
    }

    return undefined;
  }
}
