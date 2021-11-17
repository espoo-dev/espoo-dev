class SurveyWithAnsweredQuestions < Base
  def initialize(surveys, user)
    @surveys = surveys
    @user = user

    super()
  end

  def call
    @surveys.map { |survey| survey_constructor(survey) }
  end

  private

  def survey_constructor(survey)
    {
      title: survey.title,
      description: survey.description,
      id: survey.id,
      answered_questions: AnswersSurvey.by_user_and_survey(@user, survey).size
    }
  end
end
