class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :role, :surveys

  def surveys
    object.surveys.map { |survey| SurveyPresenter.new(survey).simple_payload }
  end

  def role
    RoleSerializer.new object.role
  end
end
