class GenericPolicy < ApplicationPolicy
  def index?
    user?
  end

  def show?
    user?
  end

  def create?
    user?
  end

  def new?
    user?
  end

  def edit?
    user?
  end

  def update?
    user?
  end

  def destroy?
    user?
  end

  class Scope < Scope
    def resolve_admin
      if user.admin?
        scope.all
      else
        scope.where(user_id: user.id)
      end
    end
  end
end
