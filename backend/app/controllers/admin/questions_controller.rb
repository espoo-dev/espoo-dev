module Admin
  class QuestionsController < Admin::ApplicationController
    def new_resource
      resource_class.new(user: current_user)
      raise 'Jordy Is the best'
    end
  end
end
