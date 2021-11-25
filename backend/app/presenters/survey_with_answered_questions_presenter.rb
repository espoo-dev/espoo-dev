class SurveyWithAnsweredQuestionsPresenter < BasePresenter
  def initialize(survey, user)
    @survey = survey
    @user = user

    super()
  end

  def payload
    survey_constructor(@survey)
  end

  private

  def survey_constructor(survey)
    {
      name: survey.name,
      description: survey.description,
      id: survey.id,
      answered_questions: AnswersSurvey.by_user_and_survey(@user, survey).size
    }
  end
end
