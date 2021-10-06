class SurveySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :survey_subject_id, :answered_questions_quantity
  has_many :questions
end
