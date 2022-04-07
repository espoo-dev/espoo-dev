FactoryBot.define do
  factory :group do
    sequence(:name) { |n| "Group #{n}" }
    association :user
    association :trail
  end

  factory :group_with_1_survey, parent: :group do
    after(:create) do |group|
      answers_survey = create(:answers_survey_with_some_answers, user: group.user)
      group.surveys.push(answers_survey.survey)
      group.save!
    end
  end

  factory :group_with_1_survey_answered, parent: :group do
    after(:create) do |group|
      answers_survey = create(:answers_survey_with_all_answers, user: group.user)
      group.surveys.push(answers_survey.survey)
      group.save!
    end
  end

  factory :group_with_1_group_dependency, parent: :group_with_1_survey do
    after(:create) do |group|
      dependent_group = create(:group_with_1_survey, user: group.user)
      group.add_required_group!(dependent_group)
    end
  end

  factory :group_with_1_group_dependency_answered, parent: :group_with_1_survey do
    after(:create) do |group|
      dependent_group = create(:group_with_1_survey_answered, user: group.user)
      group.add_required_group!(dependent_group)
    end
  end

  factory :group_with_1_group_dependency_not_answered, parent: :group_with_1_survey do
    after(:create) do |group|
      dependent_group = create(:group_with_1_survey, user: group.user)
      group.add_required_group!(dependent_group)
    end
  end

  factory :group_answered_with_1_group_dependency_answered, parent: :group_with_1_survey_answered do
    after(:create) do |group|
      dependent_group = create(:group_with_1_survey_answered, user: group.user)
      group.add_required_group!(dependent_group)
    end
  end

  factory :group_with_1_group_dependency_answered_and_1_not, parent: :group_with_1_survey do
    after(:create) do |group|
      dependent_group = create(:group_with_1_survey_answered, user: group.user)
      group.add_required_group!(dependent_group)

      dependent_group2 = create(:group_with_1_survey, user: group.user)
      dependent_group.add_required_group!(dependent_group2)
    end
  end

  factory :group_with_2_group_dependencies_levels, parent: :group_with_1_survey do
    after(:create) do |group|
      dependent_group = create(:group_with_1_survey, user: group.user)
      group.add_required_group!(dependent_group)

      dependent_group2 = create(:group_with_1_survey, user: group.user)
      dependent_group.add_required_group!(dependent_group2)
    end
  end
end
