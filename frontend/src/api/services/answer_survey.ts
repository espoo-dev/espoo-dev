import { errorHandler } from 'api/error-handler';
import { AxiosInstance, AxiosResponse } from 'axios';
import {
  AnswerSurveyCreate,
  AnswerSurvey,
  AnswerSurveyGet,
  AnswerSurveyReceive,
} from '../models/answer_survey';

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

  public async smartRegister(
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

  public async get(
    answer_survey: AnswerSurveyGet
  ): Promise<AxiosResponse<AnswerSurveyReceive | undefined>> {
    try {
      const response = await this.httpClient.get<AnswerSurveyReceive>(
        `api/v1/answers_surveys/${answer_survey.id}`
      );

      return response;
    } catch (error) {
      errorHandler(error);
    }

    return undefined;
  }
}
