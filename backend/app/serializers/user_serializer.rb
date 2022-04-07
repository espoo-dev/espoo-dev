# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  phone                  :string
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  role_id                :bigint           not null
#
class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :role, :surveys

  def surveys
    object.surveys.map { |survey| SimpleSurveyPresenter.new(survey).payload }
  end

  def role
    RoleSerializer.new object.role
  end
end
