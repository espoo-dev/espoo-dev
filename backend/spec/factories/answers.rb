FactoryBot.define do
  factory :answer do
    association  :answers_survey
    association  :question
  end

  factory :free_text_answer, parent: :answer do
    question { create(:free_text_question) }
  end

  factory :answer_with_option, parent: :answer do
    options { [create(:option)] }
    question { create(:single_choice_question) }
  end
end
