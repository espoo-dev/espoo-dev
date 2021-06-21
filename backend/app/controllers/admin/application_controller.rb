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
    rescue_from Pundit::NotAuthorizedError, with: :render_unauthorized

    def new_resource
      return resource_class.new(user: current_user) if resource_class.column_names.include?('user_id')

      resource_class.new
    end

    def render_not_found
      redirect_to '/404.html'
    end

    def render_unauthorized
      redirect_to '/401.html'
    end

    helper_method :filter_form_attributes
    def filter_form_attributes(attributes)
      return attributes if current_user&.admin?

      admin_attributes = %i[user role]
      attributes.reject { |attr| admin_attributes.include? attr.attribute }
    end

    def resource_params
      current_user.admin? ? super : super.merge(user_id: current_user.id)
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
