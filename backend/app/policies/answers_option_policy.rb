class AnswersOptionPolicy < GenericPolicy
  def index?
    user.admin? || user.teacher?
  end

  class Scope < Scope
    def search_params
      answers_ids = user.surveys.map(&:answers_ids_of_answers_surveys).flatten

      { id: answers_ids }
    end
  end
end
