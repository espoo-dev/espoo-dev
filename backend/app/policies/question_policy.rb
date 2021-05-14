class QuestionPolicy < GenericPolicy
  class Scope < Scope
    def resolve_admin
      if user.admin?
        Question.all
      else
        Question.where(user_id: user.id)
      end
    end
  end
end
