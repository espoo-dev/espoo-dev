FactoryBot.define do
  factory :option do
    sequence(:name) { |n| "Option #{n}" }
    association :question
    association :user
  end
end
