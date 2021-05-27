FactoryBot.define do
  factory :question do
    name { Faker::Name.unique.name }
    association :survey, questions: []
    association :question_type
    association :user
  end

  factory :single_choice_question, parent: :question do
    question_type { QuestionType.find_by(name: QuestionType::SINGLE_CHOICE) || create(:question_type_single) }
  end

  factory :multiple_choice_question, parent: :question do
    question_type { QuestionType.find_by(name: QuestionType::MULTIPLE_CHOICE) || create(:question_type_multiple) }
  end
end
