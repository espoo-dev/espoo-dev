class AnswersSurveyWithAnswersPresenter < AnswersSurveyPresenter
  protected

  def questions
    answers_survey.survey.questions.map do |question|
      QuestionWithAnswersPresenter.new(question, answers_survey).payload
    end
  end

  def answered_questions
    Question.answered_by_answers_survey(answers_survey).map do |question|
      QuestionWithAnswersPresenter.new(question, answers_survey).payload
    end
  end

  def not_answered_questions
    questions - answered_questions
  end

  def current_question_index
    answered_questions.length
  end
end
