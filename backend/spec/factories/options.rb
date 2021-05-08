FactoryBot.define do
  factory :option do
    option_type { 'option 1' }
    association :question
  end
end
