FactoryBot.define do
  factory :answer do
    association  :answers_survey
    association  :question
  end

  factory :free_text_answer, parent: :answer do
    question { create(:free_text_question) }
  end
end
