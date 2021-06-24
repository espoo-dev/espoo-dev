class Api::V1::RolesController < Api::V1::ApiController
  skip_before_action :authenticate_user!, only: [:index]

  def index
    roles = if current_user&.admin?
              Role.all
            else
              Role.where.not(role_type: Role::ADMIN)
            end

    render json: roles
  end
end
