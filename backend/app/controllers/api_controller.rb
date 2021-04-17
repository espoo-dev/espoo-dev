class ApiController < ActionController::API
  include Pundit

  before_action :authenticate_user!

  rescue_from Pundit::NotAuthorizedError, with: :render_unauthorized

  def render_unauthorized(message = 'Unauthorized')
    render json: { error_message: message }, status: :unauthorized
  end
end
