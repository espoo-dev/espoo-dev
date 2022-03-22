module Admin
  class OptionsController < Admin::ApplicationController
    def create
      resource = resource_class.new(resource_params)
      authorize_resource(resource)

      if resource.save
        redirect_to(
          after_resource_created_path(resource),
          notice: t('administrate.option.created.success')
        )
      else
        render :new, locals: {
          page: Administrate::Page::Form.new(dashboard, resource)
        }, status: :unprocessable_entity
      end
    end

    def after_resource_created_path(requested_resource)
      [:new, namespace, requested_resource.class.name.downcase.to_sym]
    end
  end
end
