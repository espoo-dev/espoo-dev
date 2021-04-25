FactoryBot.define do
  factory :question do
    name { Faker::Name.unique.name }
    association :question_type
    association :user
  end
end
