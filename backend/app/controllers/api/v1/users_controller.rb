class Api::V1::UsersController < Api::V1::ApiController
  def index
    teachers = User.where(role: 'teacher')
    render json: teachers
  end
end
