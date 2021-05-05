class UserPolicy < ApplicationPolicy
  def index?
    user?
  end

  def show?
    user?
  end

  def create?
    return true if @user&.admin?
    return false if record.admin?

    true
  end

  def update?
    user?
  end

  def edit?
    user?
  end

  def destroy?
    user?
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
