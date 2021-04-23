class Api::V1::UsersController < Api::V1::ApiController
  def index
    users = User.where(params.permit(:role))

    render json: users
  end
end
