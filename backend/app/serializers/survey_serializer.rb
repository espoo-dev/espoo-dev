class SurveySerializer < ActiveModel::Serializer
  attributes :id, :name, :description
  has_many :questions
end
