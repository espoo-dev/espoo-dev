class SurveyPresenter < BasePresenter
  def initialize(survey, user = nil)
    @survey = survey
    @user = user

    super()
  end

  def payload
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

  private

  def answers_surveys_payload
    @answers_surveys_payload ||= AnswersSurvey.by_user_and_survey(@user, @survey).map do |answer_survey|
      AnswersSurveyPresenter.new(answer_survey).payload
    end
  end
end
