class SurveysController < ApplicationController
  def index
    @surveys = Survey.ready_surveys.decorate
  end
end
