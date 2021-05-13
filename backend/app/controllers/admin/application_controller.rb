# All Administrate controllers inherit from this
# `Administrate::ApplicationController`, making it the ideal place to put
# authentication logic or other before_actions.
#
# If you want to add pagination or other controller-level concerns,
# you're free to overwrite the RESTful controller actions.
module Admin
  class ApplicationController < Administrate::ApplicationController
    include Administrate::Punditize

    before_action :authenticate_user!
    after_action :verify_authorized
    around_action :skip_bullet, if: -> { defined?(Bullet) }

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from Pundit::NotAuthorizedError, with: :render_not_found

    def render_not_found
      redirect_to '/404.html'
    end

    helper_method :filter_form_attributes
    def filter_form_attributes(attributes)
      return attributes if current_user&.admin?

      admin_attributes = %i[user role]
      attributes.reject { |attr| admin_attributes.include? attr.attribute }
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
