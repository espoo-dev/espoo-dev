FactoryBot.define do
  factory :question_type do
    initialize_with { QuestionType.find_or_create_by(name: QuestionType::SINGLE_CHOICE) }
  end

  factory :question_type_single, parent: :question_type do
    name { QuestionType::SINGLE_CHOICE }
    initialize_with { QuestionType.find_or_create_by(name: QuestionType::SINGLE_CHOICE) }
  end

  factory :question_type_multiple, parent: :question_type do
    name { QuestionType::MULTIPLE_CHOICE }
    initialize_with { QuestionType.find_or_create_by(name: QuestionType::MULTIPLE_CHOICE) }
  end

  factory :question_type_free_text, parent: :question_type do
    name { QuestionType::FREE_TEXT }
    initialize_with { QuestionType.find_or_create_by(name: QuestionType::FREE_TEXT) }
  end
end
