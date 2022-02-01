class AnswersSurveyWithAnswersPresenter < AnswersSurveyPresenter
  protected

  def all_questions
    answers_survey.survey.questions.sort_by(&:id).map do |question|
      QuestionWithAnswersPresenter.new(question, answers_survey).payload
    end
  end

  def questions
    answered_questions + not_answered_questions
  end

  def answered_questions
    Question.answered_by_answers_survey(answers_survey).sort_by(&:id).map do |question|
      QuestionWithAnswersPresenter.new(question, answers_survey).payload
    end
  end

  def not_answered_questions
    all_questions - answered_questions
  end

  def current_question_index
    answered_questions.length
  end
end
