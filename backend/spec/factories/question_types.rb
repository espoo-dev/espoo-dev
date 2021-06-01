FactoryBot.define do
  factory :question_type do
    name { Faker::Name.unique.name }
  end

  factory :question_type_single, parent: :question_type do
    name { QuestionType::SINGLE_CHOICE }
  end

  factory :question_type_multiple, parent: :question_type do
    name { QuestionType::MULTIPLE_CHOICE }
  end
end
