class Api::V1::SurveysController < Api::V1::ApiController
  include SurveyConcern

  def show
    survey = Survey.where(params.permit(:id)).includes(questions: %i[question_type options]).take!
    authorize survey
    render json: parsed_surveys([survey]).first
  end

  def index
    surveys = Survey.ready_surveys.includes(questions: %i[question_type options]).includes([:survey_subject])
    authorize surveys

    render json: sorted_parsed_surveys(surveys)
  end

  private

  def sorted_parsed_surveys(surveys)
    sorted_surveys(surveys).map { |_status, array| parsed_surveys(array) }.flatten
  end

  def parsed_surveys(surveys)
    surveys.map { |survey| SurveyPresenter.new(survey, current_user).payload }
  end
end
