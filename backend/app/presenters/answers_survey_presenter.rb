class AnswersSurveyPresenter < BasePresenter
  attr_reader :answers_survey

  delegate :answers, to: :answers_survey

  def initialize(answers_survey)
    @answers_survey = answers_survey

    super()
  end

  def payload
    {
      id: @answers_survey.id,
      user_id: @answers_survey.user_id,
      status: @answers_survey.status
    }
  end
end
