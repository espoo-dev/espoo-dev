class Api::V1::SurveysController < Api::V1::ApiController
  def show
    survey = Survey.where(params.permit(:id)).includes(questions: %i[question_type options]).take!
    authorize survey
    render json: parsed_sorted_surveys([survey]).first
  end

  def index
    surveys = Survey.ready_surveys.includes(questions: %i[question_type options]).includes([:survey_subject])
    authorize surveys

    render json: parsed_sorted_surveys(surveys)
  end

  private

  def parsed_sorted_surveys(surveys)
    surveys.map { |survey| SurveyPresenter.new(survey, current_user) }.sort(&:compare).map(&:payload)
  end
end
