# == Schema Information
#
# Table name: trails
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  description :string
#  user_id     :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :trail do
    sequence(:name) { |n| "Trail #{n}" }
    association :user
  end

  factory :trail_with_1_group, parent: :trail do
    after(:create) do |trail|
      create_list(:group_with_1_survey, 1, user: trail.user, trail: trail)
    end
  end

  factory :trail_with_2_groups, parent: :trail do
    after(:create) do |trail|
      create_list(:group_with_1_survey, 2, user: trail.user, trail: trail)
    end
  end
end
