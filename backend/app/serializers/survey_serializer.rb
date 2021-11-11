class SurveySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :survey_subject_id, :questions

  def questions
    object.questions.map do |question|
      QuestionSerializer.new(question)
    end
  end
end
