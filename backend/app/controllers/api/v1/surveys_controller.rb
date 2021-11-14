class Api::V1::SurveysController < Api::V1::ApiController
  def show
    survey = Survey.where(params.permit(:id)).includes(questions: %i[question_type options]).take!
    authorize survey
    render json: survey, answer_surveys: answer_surveys(current_user, survey)
  end

  def index
    surveys = Survey.ready_surveys_eager.where(params.permit(:user_id))
    authorize surveys
    render json: surveys
  end

  private

  def answer_surveys(user, survey)
    AnswersSurvey.where(user: user, survey: survey)
  end
end
