# == Schema Information
#
# Table name: options
#
#  id          :bigint           not null, primary key
#  name        :string
#  question_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#  correct     :boolean          default(FALSE)
#
class OptionSerializer < ActiveModel::Serializer
  attributes :id, :name, :correct
end
