module Admin
  class SurveysController < Admin::ApplicationController
    def resource_params
      super.merge(user_id: current_user.id)
    end
  end
end
