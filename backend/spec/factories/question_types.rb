FactoryBot.define do
  factory :question_type do
    name { Faker::Games::Pokemon.unique.name }
  end

  factory :question_type_multiple, parent: :question_type do
    name { 'Multiple Choice' }
  end

  factory :question_type_single, parent: :question_type do
    name { 'Single Choice' }
  end
end
