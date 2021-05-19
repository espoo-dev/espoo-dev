class Api::V1::RolesController < Api::V1::ApiController
  skip_before_action :authenticate_user!, only: [:index]

  def index
    render json: Role.all
  end
end
