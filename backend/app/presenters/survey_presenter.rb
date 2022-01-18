class SurveyPresenter < SimpleSurveyPresenter
  def payload
    complete_payload
  end

  private

  def complete_payload
    simple_payload.merge(
      {
        answers_surveys: answers_surveys_payload,
        current_answers_survey: answers_surveys_payload.last,
        questions: questions_payload,
        survey_subject_id: survey.survey_subject.id
      }
    )
  end

  def answers_surveys_payload
    @answers_surveys_payload ||= AnswersSurvey.by_user_and_survey(user, survey).map do |answer_survey|
      AnswersSurveyPresenter.new(answer_survey).payload
    end
  end

  def questions_payload
    survey.questions.map do |question|
      QuestionPresenter.new(question).payload
    end
  end
end
