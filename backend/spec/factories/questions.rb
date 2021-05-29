FactoryBot.define do
  factory :question do
    name { Faker::Name.unique.name }
    association :survey, questions: []
    association :question_type
    association :user
  end

  factory :single_choice_question, parent: :question do
    question_type { QuestionType.find_or_create_by(name: QuestionType::SINGLE_CHOICE) }
  end

  factory :multiple_choice_question, parent: :question do
    question_type { QuestionType.find_or_create_by(name: QuestionType::MULTIPLE_CHOICE) }
  end
end
