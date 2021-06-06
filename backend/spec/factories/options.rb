FactoryBot.define do
  factory :option do
    name { 'option 1' }
    association :question
    association :user
  end

  factory :correct_option, parent: :option do
    correct { true }
  end
end
