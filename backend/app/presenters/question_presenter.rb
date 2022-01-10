class QuestionPresenter < BasePresenter
  attr_reader :question, :answers_survey

  def initialize(question, answers_survey = nil)
    @question = question
    @answers_survey = answers_survey

    super()
  end

  def payload
    {
      id: question.id,
      name: question.name,
      question_type: question_type,
      options: options
    }
  end

  private

  def question_type
    QuestionTypePresenter.new(question.question_type).payload
  end

  def options
    question.options.map do |option|
      OptionPresenter.new(option).payload
    end
  end
end
