class UserPolicy < ApplicationPolicy
  def index?
    binding.pry
    has_user?
  end

  def show?
    has_user?
  end

  def create?
    return true if @user&.admin?
    return false if record.admin?

    true
  end

  def update?
    has_user?
  end

  def edit?
    has_user?
  end

  def destroy?
    has_user?
  end
end
