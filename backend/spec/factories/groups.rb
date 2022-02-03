FactoryBot.define do
  factory :group do
    sequence(:name) { |n| "Group #{n}" }
    association :user
  end

  factory :group_with_1_survey, parent: :group do
    after(:create) do |group|
      answers_survey = create(:answers_survey_with_some_answers)
      group.surveys.push(answers_survey.survey)
      group.save!
    end
  end
end
