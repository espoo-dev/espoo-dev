class UsersController < ApiController
  skip_before_action :authenticate_user!, only: [:create]

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
