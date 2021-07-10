class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :name, :question_type, :options

  def options
    object.options.map do |option|
      OptionSerializer.new(option)
    end
  end

  def question_type
    QuestionTypeSerializer.new(object.question_type)
  end
end
