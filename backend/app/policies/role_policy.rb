class RolePolicy < ApplicationPolicy
  def destroy?
    false
  end
end
