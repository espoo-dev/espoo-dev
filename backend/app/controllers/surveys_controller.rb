class SurveysController < ApplicationController
  def index
    @surveys = SurveyWithAnsweredQuestions.call(Survey.ready_surveys.decorate, current_user)
  end
end
