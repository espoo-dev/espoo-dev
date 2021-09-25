class AnswersSurveySerializer < ActiveModel::Serializer
  attributes :id, :survey, :user_id, :status

  def survey
    SurveySerializer.new(object.survey)
  end
end
