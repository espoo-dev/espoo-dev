class AnswersSurveysController < ApplicationController
  def create
    @survey = Survey.find(params[:survey_id])
    @first_question = @survey.questions.includes(%i[options question_type]).first
    AnswersSurvey.find_or_create_by!(create_answers_survey_params)

    redirect_to @first_question
  rescue StandardError => e
    redirect_to root_path, flash: e.message
  end

  private

  def create_answers_survey_params
    params.permit(:survey_id).merge(user_id: current_user.id)
  end
end
