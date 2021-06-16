FactoryBot.define do
  factory :survey do
    name { Faker::Name.unique.name }
    description { Faker::Name.unique.name }
    association :user
    questions { build_list :question, 1 }
  end

  factory :not_ready_survey, parent: :survey do
    questions { [build(:question_with_correct_option), create(:multiple_choice_ready_question)] }
  end

  factory :ready_survey, parent: :survey do
    questions { create_list :multiple_choice_ready_question, 1 }
    after(:create) do |survey|
      survey.ready = true
      survey.save
    end
  end
end
