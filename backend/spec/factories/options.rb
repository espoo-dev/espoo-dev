FactoryBot.define do
  factory :option do
    sequence(:name) { |n| "Option #{n}" }
    association :question
    association :user
  end

  factory :correct_option, parent: :option do
    correct { true }
  end

  factory :free_text_option, parent: :correct_option do
    name { Faker::Name.unique.name }
  end
end
