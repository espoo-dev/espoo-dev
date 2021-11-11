class AnswersSurveysController < ApplicationController
  def create
    AnswersSurvey.find_or_create_by!(create_answers_survey_params)

    survey = Survey.find(params[:survey_id])
    redirect_to question_path(survey.questions.first)
  end

  private

  def create_answers_survey_params
    params.permit(:survey_id).merge(user_id: current_user.id)
  end
end
