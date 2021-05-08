class QuestionTypePolicy < ApplicationPolicy
  def index?
    user?
  end

  def show?
    user?
  end
end
