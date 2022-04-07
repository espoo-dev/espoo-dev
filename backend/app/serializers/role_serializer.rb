# == Schema Information
#
# Table name: roles
#
#  id         :bigint           not null, primary key
#  role_type  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class RoleSerializer < ActiveModel::Serializer
  attributes :id, :role_type
end
