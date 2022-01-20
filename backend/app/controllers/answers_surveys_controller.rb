class AnswersSurveysController < ApplicationController
  def create
    answer_survey = find_or_create_not_completed_answer_survey

    redirect_to answer_survey.survey.questions.first
  rescue StandardError => err # rubocop:disable Naming/RescuedExceptionsVariableName
    flash[:danger] = err.message
    redirect_to surveys_path
  end

  private

  def find_or_create_not_completed_answer_survey
    answer_survey = AnswersSurvey.where(create_answers_survey_params).last
    return answer_survey if answer_survey&.not_completed?

    AnswersSurvey.create!(create_answers_survey_params)
  end

  def create_answers_survey_params
    params.permit(:survey_id).merge(user_id: current_user.id)
  end
end
