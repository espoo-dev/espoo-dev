class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :role, :surveys

  def surveys
    object.surveys.map { |s| SimpleSurveySerializer.new(s) }
  end
end
