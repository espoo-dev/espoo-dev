# == Schema Information
#
# Table name: group_dependencies
#
#  id         :bigint           not null, primary key
#  group_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :group_dependency do
    association :group
  end
end
