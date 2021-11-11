class SurveysController < ApplicationController
  def show
    @survey = Survey.find(params[:id])
    @answered_questions_quantity = AnswersSurvey.by_user_and_survey(current_user, @survey).size
  end

  def index
    @surveys = Survey.ready_surveys.decorate
  end
end
