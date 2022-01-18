class Api::V1::SurveysController < Api::V1::ApiController
  def show
    survey = Survey.where(params.permit(:id)).includes(questions: %i[question_type options]).take!
    authorize survey
    render json: survey_json(survey)
  end

  def index
    surveys = Survey.ready_surveys.includes(questions: %i[question_type options]).includes([:survey_subject])
    authorize surveys
    render json: parsed_surveys(surveys)
  end

  private

  def answers_surveys(user, survey)
    AnswersSurvey.where(user: user, survey: survey)
  end

  def parsed_surveys(surveys)
    surveys.map { |survey| survey_json(survey) }
  end

  def survey_json(survey)
    survey.answers_surveys_by_user = answers_surveys(current_user, survey)
    SurveyPresenter.new(survey, current_user).payload
  end
end
