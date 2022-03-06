class AnswersSurveyPolicy < GenericPolicy
  def index?
    user.admin? || user.role.role_type == Role::TEACHER
  end

  class Scope < Scope
    def search_params
      { survey_id: user.surveys.map(&:id) }
    end
  end
end
