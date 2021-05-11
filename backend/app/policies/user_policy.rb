class UserPolicy < GenericPolicy
  def create?
    return true if @user&.admin?
    return false if record.admin?

    true
  end

  class Scope < Scope
    def resolve_admin
      if user.admin?
        User.all
      else
        User.where(id: user.id)
      end
    end
  end
end
