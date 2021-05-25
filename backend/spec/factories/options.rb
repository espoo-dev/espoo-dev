FactoryBot.define do
  factory :option do
    name { 'option 1' }
    association :question
    association :user
  end
end
