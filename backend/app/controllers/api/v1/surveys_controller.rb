class Api::V1::SurveysController < Api::V1::ApiController
  def show
    survey = Survey.find_by!(params.permit(:id))
    authorize survey
    render json: survey
  end

  def index
    surveys = Survey.ready_surveys_eager.where(params.permit(:user_id))
    authorize surveys
    render json: surveys
  end
end
