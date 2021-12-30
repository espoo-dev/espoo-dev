class QuestionTypePresenter < BasePresenter
  def initialize(question_type)
    @question_type = question_type

    super()
  end

  def payload
    {
      id: @question_type.id,
      name: @question_type.name
    }
  end
end
