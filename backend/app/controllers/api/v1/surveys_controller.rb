class Api::V1::SurveysController < Api::V1::ApiController
  def show
    survey = Survey.find_by!(params.permit(:id))

    render json: survey
  end
end
