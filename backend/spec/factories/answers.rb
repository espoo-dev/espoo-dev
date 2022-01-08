FactoryBot.define do
  factory :answer do
    association  :answers_survey
    association  :question
  end

  factory :free_text_answer, parent: :answer do
    question { create(:free_text_question) }
  end

  factory :answer_with_option, parent: :answer do
    question { create(:single_choice_question) }

    before(:create) do |answer|
      answer.options.push(create(:option, question: answer.question))
      answer.save!
      answer.reload
    end
  end
end
