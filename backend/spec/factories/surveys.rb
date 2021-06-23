FactoryBot.define do
  factory :survey do
    name { Faker::Name.unique.name }
    description { Faker::Name.unique.name }
    association :user
    association :survey_subject

    after(:create) do |survey|
      survey.questions = build_list(:question, 1, user: survey.user)
      survey.save
    end
  end

  factory :survey_without_questions, parent: :survey do
    after(:create) do |survey|
      survey.questions = []
      survey.save
    end
  end

  factory :not_ready_survey, parent: :survey do
    after(:create) do |survey|
      survey.questions = [
        build(:question_with_correct_option, user: survey.user),
        create(:multiple_choice_ready_question, user: survey.user)
      ]
      survey.save
    end
  end

  factory :ready_survey, parent: :survey do
    after(:create) do |survey|
      survey.questions = create_list(:multiple_choice_ready_question, 1, user: survey.user, survey: survey)
      survey.ready = true
      survey.save
    end
  end
end
