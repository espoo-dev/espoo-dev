require 'administrate/base_dashboard'

class ApplicationDashboard < Administrate::BaseDashboard
  def display_resource(resource)
    resource.try(:name).presence || resource.id
  end
end
