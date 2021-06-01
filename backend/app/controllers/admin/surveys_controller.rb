module Admin
  class SurveysController < Admin::ApplicationController
    def new_resource
      resource_class.new(user: current_user)
    end
  end
end
