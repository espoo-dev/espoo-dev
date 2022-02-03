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

  factory :group_with_1_group_dependency, parent: :group_with_1_survey do
    after(:create) do |group|
      dependent_group = create(:group_with_1_survey, user: group.user)
      group_dependency = create(:group_dependency, groups: [dependent_group], group: group)
      group.update!(required_group_dependency: group_dependency)
    end
  end
end
