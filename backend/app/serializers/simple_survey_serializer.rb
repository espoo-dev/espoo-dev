class SimpleSurveySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :questions_quantity

  def questions_quantity
    object.questions.size
  end
end
