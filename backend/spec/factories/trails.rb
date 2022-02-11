FactoryBot.define do
  factory :trail do
    sequence(:name) { |n| "Trail #{n}" }
    association :user
  end

  factory :trail_with_2_groups, parent: :trail do
    after(:create) do |trail|
      create_list(:group_with_1_survey, 2, user: trail.user, trail: trail)
    end
  end
end
