class Api::V1::SurveysController < Api::V1::ApiController
  def show
    survey = Survey.find_by!(params.permit(:id))

    render json: survey
  end

  def index
    surveys = Survey.ready_surveys.by_user(current_user).where(params.permit(:user_id))

    render json: surveys
  end
end
