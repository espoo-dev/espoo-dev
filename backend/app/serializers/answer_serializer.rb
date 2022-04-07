class AnswerSerializer < ActiveModel::Serializer
  attributes :id, :answers_survey_id, :question_id, :options, :user_answer

  def options
    object.options.map do |option|
      OptionSerializer.new(option)
    end
  end
end
