class AnswersOptionPolicy < GenericPolicy
  def index?
    user.admin? || user.teacher?
  end

  class Scope < Scope
    def search_params
      answers_options_ids = AnswersOption.by_user(user).pluck(:id)

      { id: answers_options_ids }
    end
  end
end
