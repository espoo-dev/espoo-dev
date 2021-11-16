import { errorHandler } from 'api/error-handler';
import { AxiosInstance, AxiosResponse } from 'axios';
import { AnswerSurveyCreate, AnswerSurvey } from '../models/answer_survey';

export class AnswerSurveyService {
  constructor(private httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  public async register(
    answer_survey: AnswerSurveyCreate
  ): Promise<AxiosResponse<AnswerSurvey | undefined>> {
    try {
      const response = await this.httpClient.post<AnswerSurvey>(
        'api/v1/answers_surveys',
        answer_survey
      );

      return response;
    } catch (error) {
      errorHandler(error);
    }

    return undefined;
  }
}
