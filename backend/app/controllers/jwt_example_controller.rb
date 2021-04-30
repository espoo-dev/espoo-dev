class JwtExampleController < ApplicationController
  def index
    render json: { example: 'success' }
  end
end
