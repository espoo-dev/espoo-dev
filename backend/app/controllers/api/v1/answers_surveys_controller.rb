class Api::V1::AnswersSurveysController < Api::V1::ApiController
  def create
    answers_survey = AnswersSurvey.new(answers_surveys_params)
    authorize answers_survey
    answers_survey.save!
    render json: answers_survey, status: :created
  end

  private

  def answers_surveys_params
    params.permit(:survey_id).merge(user_id: current_user.id)
  end
end
