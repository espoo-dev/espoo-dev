class SurveysController < ApplicationController
  def index
    @surveys = survey_presenters
  end

  private

  def survey_presenters
    Survey.ready_surveys.decorate.map do |survey|
      SurveyWithAnsweredQuestionsPresenter.payload(survey, current_user)
    end
  end
end
