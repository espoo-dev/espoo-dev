FactoryBot.define do
  factory :option do
    sequence(:name) { |n| "Option #{n}" }
    association :question
    association :user
  end

  factory :correct_option, parent: :option do
    correct { true }
  end
end
