class UserPolicy < GenericPolicy
  def index?
    user.admin? || user.role.role_type == Role::TEACHER
  end

  def new?
    user.admin?
  end

  def create?
    return true if user&.admin?
    return false if record.admin?

    true
  end

  class Scope < Scope
    def search_params
      { id: user.id }
    end
  end
end
