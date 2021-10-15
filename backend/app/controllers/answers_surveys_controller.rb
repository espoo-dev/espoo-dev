class AnswersSurveysController < ApplicationController
  def create
    AnswersSurvey.create!(create_answers_survey_params)
  end

  private

  def create_answers_survey_params
    params.permit(:survey_id).merge(user_id: current_user.id)
  end
end
