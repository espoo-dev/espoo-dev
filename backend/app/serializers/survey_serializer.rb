class SurveySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :survey_subject_id, :answers_surveys, :current_answers_survey
  has_many :questions

  def answers_surveys
    survey_instance = object.instance_of?(Survey) ? object : object.object

    survey_instance.answers_surveys_by_user&.map { |answer_survey| SimpleAnswersSurveySerializer.new(answer_survey) } || []
  end

  def current_answers_survey
    answers_surveys.last
  end

  def self.model_name
    'Survey'
  end
end
