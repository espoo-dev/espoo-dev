class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :name
  belongs_to :question_type
end
