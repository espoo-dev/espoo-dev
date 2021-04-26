class Api::V1::UsersController < Api::V1::ApiController
  skip_before_action :authenticate_user!, only: [:create]

  def index
    users = User.where(params.permit(:role))

    render json: users
  end

  def create
    user = User.create!(create_params)

    render json: user, status: :created
  end

  private

  def create_params
    return params.permit(:email, :password, :role) if params['role'] != User::ADMIN_ROLE

    raise Pundit::NotAuthorizedError, "Can't create admin user :("
  end
end
