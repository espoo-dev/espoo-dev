class AnswersSurveyPresenter < BasePresenter
  attr_reader :answers_survey

  delegate :answers, to: :answers_survey

  def initialize(answers_survey, user)
    @answers_survey = answers_survey
    @user = user

    super()
  end

  def payload
    {
      id: @answers_survey.id,
      user_id: @answers_survey.user_id,
      status: @answers_survey.status,
      questions: questions,
      answered_questions: answered_questions,
      not_answered_questions: not_answered_questions,
      current_question_index: current_question_index
    }
  end

  private

  def questions
    @answers_survey.survey.questions.map { |question|
      QuestionPresenter.new(question).payload
    }
  end

  def answered_questions
    Question.answered_by_answers_survey(@answers_survey).map { |question|
      QuestionPresenter.new(question).payload
    }
  end

  def not_answered_questions
    questions - answered_questions
  end

  def current_question_index
    answered_questions.length
  end
end
