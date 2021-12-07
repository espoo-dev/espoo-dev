class AnswersSurveysController < ApplicationController
  def create
    answer_survey = AnswersSurvey.create!(create_answers_survey_params)

    redirect_to answer_survey.survey.questions.first
  rescue StandardError => err # rubocop:disable Naming/RescuedExceptionsVariableName
    flash[:danger] = err.message
    redirect_to surveys_path
  end

  private

  def create_answers_survey_params
    params.permit(:survey_id).merge(user_id: current_user.id)
  end
end
