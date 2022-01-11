class Api::V1::ApiController < ActionController::API
  include Pundit

  before_action :authenticate_user!, except: :seed_database

  rescue_from Pundit::NotAuthorizedError, with: :render_unauthorized
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  def render_unauthorized(message = 'Unauthorized')
    render json: { error_message: message }, status: :unauthorized
  end

  def render_unprocessable_entity(exception)
    render json: { error_message: exception.message }, status: :unprocessable_entity
  end

  def seed_database
    if Rails.env.production?
      render json: { message: 'Oops not in production :(' }, status: :unauthorized
    else
      Seeds.call
      render json: { message: 'uhu :)' }, status: :ok
    end
  end
end
