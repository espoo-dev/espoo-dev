class SurveyPresenter < BasePresenter
  def initialize(survey, user = nil, simple = false)
    @survey = survey
    @user = user
    @simple = simple

    super()
  end

  def payload
    simple ? simple_payload : complete_payload
  end

  private

  def complete_payload
    simple_payload.merge(
      {
        answers_surveys: answers_surveys_payload,
        last_answers_survey: answers_surveys_payload.last
      }
    )
  end

  def simple_payload
    {
      id: @survey.id,
      name: @survey.name,
      description: @survey.description,
      total_questions_quantity: @survey.questions.size,
      answered_questions_quantity: @survey.last_answers_quantity
    }
  end

  def answers_surveys_payload
    @answers_surveys_payload ||= AnswersSurvey.by_user_and_survey(@user, @survey).map do |answer_survey|
      AnswersSurveyPresenter.new(answer_survey).payload
    end
  end
end
