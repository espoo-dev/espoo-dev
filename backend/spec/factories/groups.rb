FactoryBot.define do
  factory :group do
    sequence(:name) { |n| "Group #{n}" }
    association :user
  end
end
