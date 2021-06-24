class Api::V1::RolesController < Api::V1::ApiController
  skip_before_action :authenticate_user!, only: [:index]

  def index
    roles = Role.all
    authorize roles
    render json: roles
  end
end
