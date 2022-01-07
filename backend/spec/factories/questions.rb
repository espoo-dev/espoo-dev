FactoryBot.define do
  factory :question do
    name { Faker::Name.unique.name }
    association :question_type
    association :user
  end

  factory :single_choice_question, parent: :question do
    question_type { create(:question_type_single) }
  end

  factory :multiple_choice_question, parent: :question do
    question_type { create(:question_type_multiple) }
  end

  factory :free_text_question, parent: :question do
    question_type { create(:question_type_free_text) }
  end

  factory :question_with_correct_option, parent: :question do
    options { create_list :correct_option, 1 }
  end

  factory :multiple_choice_ready_question, parent: :multiple_choice_question do
    after(:create) do |question|
      create(:correct_option, question: question)
      question.ready_to_be_answered = true
      question.save!
    end
  end

  factory :question_with_answer, parent: :question do
    after(:create) do |question|
      create(:answer_with_option, question: question)
      question.save!
    end
  end
end
