import { AnswerCreate } from '@api/models/answer';
import { Question } from '@api/models/survey';
import { errorHandler } from 'api/error-handler';
import { AxiosInstance, AxiosResponse } from 'axios';

export class AnswerService {
  constructor(private httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  public async create(
    answer: AnswerCreate
  ): Promise<AxiosResponse<Question | undefined>> {
    try {
      const response = await this.httpClient.post<Question>(
        'api/v1/answers',
        answer
      );

      return response;
    } catch (error) {
      errorHandler(error);
    }

    return undefined;
  }
}
