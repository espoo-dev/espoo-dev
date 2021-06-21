class SurveySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :survey_subject_id
  has_many :questions
end
