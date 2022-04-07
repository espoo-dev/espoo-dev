# == Schema Information
#
# Table name: answers
#
#  id                :bigint           not null, primary key
#  question_id       :bigint           not null
#  answers_survey_id :bigint           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  user_answer       :string
#
class AnswerSerializer < ActiveModel::Serializer
  attributes :id, :answers_survey_id, :question_id, :options, :user_answer

  def options
    object.options.map do |option|
      OptionSerializer.new(option)
    end
  end
end
