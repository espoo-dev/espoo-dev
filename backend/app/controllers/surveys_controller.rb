class SurveysController < ApplicationController
  def index
    @surveys = survey_presenters
  end

  private

  def survey_presenters
    Survey.ready_surveys.includes(questions: %i[question_type]).decorate.map do |survey|
      SurveyPresenter.payload(survey, current_user)
    end
  end
end
