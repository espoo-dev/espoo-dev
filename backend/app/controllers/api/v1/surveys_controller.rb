class Api::V1::SurveysController < Api::V1::ApiController
  def show
    survey = Survey.find_by!(params.permit(:id))

    render json: survey
  end

  def index
    surveys = Survey.where(params.permit(:user_id)).includes([:questions])

    render json: surveys
  end
end
