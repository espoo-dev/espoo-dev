class SurveySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :survey_subject_id, :answers_surveys
  has_many :questions

  def answers_surveys
    @instance_options[:answer_surveys]&.map { |answer_survey| SimpleAnswersSurveySerializer.new(answer_survey) } || []
  end
end
