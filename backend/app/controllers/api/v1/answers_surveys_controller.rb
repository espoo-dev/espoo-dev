class Api::V1::AnswersSurveysController < Api::V1::ApiController
  def create
    answers_survey = AnswersSurvey.create(answers_surveys_params.merge(user: current_user))
    authorize current_user, :create?
    render json: answers_survey, status: :created
  end

  private

  def answers_surveys_params
    params.permit(:survey_id)
  end
end
