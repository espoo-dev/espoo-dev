class JwtExampleController < ApplicationController
  def index
    render json: { example: 'sucess' }
  end
end
