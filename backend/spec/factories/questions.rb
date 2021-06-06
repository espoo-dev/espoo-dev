FactoryBot.define do
  factory :question do
    name { Faker::Name.unique.name }
    association :survey, questions: []
    association :question_type
    association :user
  end

  factory :single_choice_question, parent: :question do
    question_type { create(:question_type_single) }
  end

  factory :multiple_choice_question, parent: :question do
    question_type { create(:question_type_multiple) }
  end

  factory :multiple_choice_ready_question, parent: :multiple_choice_question do
    after(:create) do |question|
      create(:correct_option, question: question)
      question.ready_to_be_answered = true
      question.save
    end
  end
end
