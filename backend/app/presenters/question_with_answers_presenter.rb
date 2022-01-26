class QuestionWithAnswersPresenter < QuestionPresenter
  def payload
    {
      id: question.id,
      name: question.name,
      question_type: question_type,
      options: options,
      answered_options: answered_options,
      correct: correct?
    }
  end

  private

  def question_type
    QuestionTypePresenter.new(question.question_type).payload
  end

  def correct?
    correct_options_ids = question.correct_options.map(&:id).sort
    answered_options_ids = answered_options.pluck(:id).sort
    correct_options_ids == answered_options_ids
  end

  def options
    question.options.map do |option|
      OptionPresenter.new(option).payload
    end
  end

  def answered_options
    answers = answers_survey.answers.where(question: question)

    options = answers_options(answers)

    options.flatten.map do |option|
      OptionPresenter.payload(option)
    end
  end

  def answers_options(answers)
    options = []

    answers.each do |answer|
      options.push(answer.options)
    end

    options
  end
end
