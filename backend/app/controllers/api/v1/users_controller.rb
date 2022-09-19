class Api::V1::UsersController < Api::V1::ApiController
  skip_before_action :authenticate_user!, only: [:create]

  def index
    users = User.where(params.permit(:role_id)).includes(%i[surveys role])
    authorize users
    render json: users
  end

  def create
    user = User::UserCreator.call(**{ user_params: create_params })
    render json: user, status: :created
  end

  private

  def create_params
    params.permit(:email, :password, :role_id)
  end
end
