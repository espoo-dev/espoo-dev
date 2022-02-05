FactoryBot.define do
  factory :trail do
    sequence(:name) { |n| "Trail #{n}" }
    association :user
  end
end
