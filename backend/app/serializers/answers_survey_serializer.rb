class AnswersSurveySerializer < SimpleAnswersSurveySerializer
  attributes :survey

  def survey
    SurveySerializer.new(object.survey)
  end
end
