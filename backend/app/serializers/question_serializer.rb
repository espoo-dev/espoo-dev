class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :name, :question_type

  def question_type
    QuestionTypeSerializer.new(object.question_type)
  end
end
