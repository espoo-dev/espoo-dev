class AnswersSurveySerializer < ActiveModel::Serializer
  attributes :id, :survey, :user_id

  def survey
    SurveySerializer.new(object.survey)
  end
end
