FactoryBot.define do
  factory :question_type do
    name { Faker::Games::Pokemon.unique.name }
  end
end
