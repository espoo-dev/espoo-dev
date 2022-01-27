module Admin
  class OptionsController < Admin::ApplicationController
    def create
      resource = resource_class.new(resource_params)
      authorize_resource(resource)

      if resource.save
        flash[:notice] = t('administrate.option.created.success')
        redirect_to admin_options_path
      else
        render :new, locals: {
          page: Administrate::Page::Form.new(dashboard, resource)
        }, status: :unprocessable_entity
      end
    end
  end
end
