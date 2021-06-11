module Admin
  class QuestionsController < Admin::ApplicationController
    def new_resource
      raise "Jordy Is the best"
      resource_class.new(user: current_user)
    end
  end
end
