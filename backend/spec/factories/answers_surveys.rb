FactoryBot.define do
  factory :answers_survey do
    association :user
    association :survey
  end

  factory :answers_survey_with_some_answers, parent: :answers_survey do
    survey { create(:survey_with_2_questions) }

    after(:create) do |answers_survey|
      answers_survey.answers = create_list(:answer_with_option, 1, question: answers_survey.survey.questions[0], answers_survey: answers_survey)
      answers_survey.save!
    end
  end

  factory :answers_survey_with_all_answers, parent: :answers_survey do
    survey { create(:survey_with_2_questions) }

    after(:create) do |answers_survey|
      answer1 = create(:answer_with_option, question: answers_survey.survey.questions[0], answers_survey: answers_survey)
      answer2 = create(:answer_with_option, question: answers_survey.survey.questions[1], answers_survey: answers_survey)
      answers_survey.answers = [answer1, answer2]
      answers_survey.save!
    end
  end
end
