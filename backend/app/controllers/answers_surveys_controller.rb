class AnswersSurveysController < ApplicationController
  def create
    @first_question = survey.questions.first
    AnswersSurvey.find_or_create_by!(create_answers_survey_params)

    redirect_to @first_question
  rescue StandardError => err # rubocop:disable Naming/RescuedExceptionsVariableName
    redirect_to surveys_path, flash: err.message
  end

  private

  def survey
    @survey ||= Survey.find(params[:survey_id])
  end

  def create_answers_survey_params
    params.permit(:survey_id).merge(user_id: current_user.id)
  end
end
