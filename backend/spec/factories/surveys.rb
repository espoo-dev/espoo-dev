FactoryBot.define do
  factory :survey do
    name { Faker::Name.unique.name }
    description { Faker::Name.unique.name }
    association :user
    association :survey_subject
  end

  factory :survey_without_questions, parent: :survey do
    after(:create) do |survey|
      survey.questions = []
      survey.save!
    end
  end

  factory :survey_with_1_question, parent: :survey do
    after(:create) do |survey|
      survey.questions = build_list(:question, 1, user: survey.user)
      survey.save!
    end
  end

  factory :survey_with_2_questions, parent: :survey do
    after(:create) do |survey|
      survey.questions = create_list(:multiple_choice_ready_question, 2, user: survey.user)
      survey.ready = true
      survey.save!
    end
  end

  factory :not_ready_survey, parent: :survey do
    after(:create) do |survey|
      survey.questions = [
        build(:question_with_correct_option, user: survey.user),
        create(:multiple_choice_ready_question, user: survey.user)
      ]
      survey.save!
    end
  end

  factory :ready_survey, parent: :survey do
    after(:create) do |survey|
      survey.questions = create_list(:multiple_choice_ready_question, 1, user: survey.user, survey: survey)
      survey.ready = true
      survey.save!
    end
  end

  factory :ready_survey_with_2_questions, parent: :survey do
    after(:create) do |survey|
      survey.questions = create_list(:multiple_choice_ready_question, 2, user: survey.user, survey: survey)
      survey.ready = true
      survey.save!
    end
  end

  factory :ready_survey_with_diff_type_of_questions, parent: :survey do
    after(:create) do |survey|
      survey.questions = [
        create(:single_choice_ready_question, user: survey.user, survey: survey),
        create(:multiple_choice_ready_question, user: survey.user, survey: survey)
      ]
      survey.ready = true
      survey.save!
    end
  end

  factory :ready_survey_single_choise_question, parent: :survey do
    after(:create) do |survey|
      survey.questions = create_list(:single_choice_ready_question, 1, user: survey.user, survey: survey)
      survey.ready = true
      survey.save!
    end
  end

  factory :ready_survey_free_text_question, parent: :survey do
    after(:create) do |survey|
      survey.questions = create_list(:free_text_ready_question, 1, user: survey.user, survey: survey)
      survey.ready = true
      survey.save!
    end
  end

  factory :survey_with_answer, parent: :ready_survey do
    after(:create) do |survey|
      answersurvey = create(:answers_survey_with_some_answers, survey: survey, user: survey.user)
      answer = answersurvey.answers.first
      survey.questions.first.answers << answer
      survey.answers_surveys << answersurvey

      survey.save!
    end
  end

  factory :survey_with_two_answers, parent: :ready_survey do
    after(:create) do |survey|
      answersurvey = create(:answers_survey, survey: survey, user: survey.user)
      create_list(:answer_with_option, 2, answers_survey: answersurvey)
    end
  end

  factory :survey_with_two_questions_two_answers, parent: :ready_survey_with_2_questions do
    after(:create) do |survey|
      answer_survey = create(:answers_survey, survey: survey, user: survey.user)
      create(:answer_with_option, answers_survey: answer_survey, question: answer_survey.questions.first)
      create(:answer_with_option, answers_survey: answer_survey, question: answer_survey.questions.second)
    end
  end

  factory :survey_with_two_questions_one_answer, parent: :ready_survey_with_2_questions do
    after(:create) do |survey|
      answer_survey = create(:answers_survey, survey: survey, user: survey.user)
      create(:answer_with_option, answers_survey: answer_survey, question: answer_survey.questions.first)
    end
  end
end
