module Admin
  class OptionsController < Admin::ApplicationController
    def after_resource_created_path(requested_resource)
      [:new, namespace, requested_resource.class.name.downcase.to_sym]
    end
  end
end
