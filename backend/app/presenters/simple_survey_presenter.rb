class SimpleSurveyPresenter < BasePresenter
  attr_reader :survey, :user

  def initialize(survey, user = nil)
    @survey = survey
    @user = user

    super()
  end

  def payload
    simple_payload
  end

  protected

  def simple_payload
    {
      id: survey.id,
      name: survey.name,
      description: survey.description,
      total_questions_quantity: survey.questions.size,
      answered_questions_quantity: survey.last_answers_quantity
    }
  end
end
