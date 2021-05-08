# All Administrate controllers inherit from this
# `Administrate::ApplicationController`, making it the ideal place to put
# authentication logic or other before_actions.
#
# If you want to add pagination or other controller-level concerns,
# you're free to overwrite the RESTful controller actions.
module Admin
  class ApplicationController < Administrate::ApplicationController
    include Administrate::Punditize

    before_action :authenticate_user!, :authenticate_admin
    after_action :verify_authorized
    around_action :skip_bullet, if: -> { defined?(Bullet) }

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def authenticate_admin
      authorize current_user
    end

    def render_not_found
      redirect_to '/404.html'
    end

    # Override this value to specify the number of elements to display at a time
    # on index pages. Defaults to 20.
    # def records_per_page
    #   params[:per_page] || 20
    # end
    def skip_bullet
      previous_value = Bullet.enable?
      Bullet.enable = false
      yield
    ensure
      Bullet.enable = previous_value
    end
  end
end
