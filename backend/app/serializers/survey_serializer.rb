class SurveySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :survey_subject_id, :answers_surveys, :current_answers_survey
  has_many :questions

  def answers_surveys
    instance_options[:answer_surveys]&.map { |answer_survey| SimpleAnswersSurveySerializer.new(answer_survey) } || []
  end

  def current_answers_survey
    answers_surveys.last
  end

  def self.model_name
    'Survey'
  end
end
