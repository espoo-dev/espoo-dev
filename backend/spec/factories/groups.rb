FactoryBot.define do
  factory :group do
    sequence(:name) { |n| "Group #{n}" }
    association :user
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
      group_dependency = create(:group_dependency, groups: [dependent_group], group: group)
      group.update!(required_group_dependency: group_dependency)
    end
  end

  factory :group_with_1_group_dependency_answered, parent: :group_with_1_survey do
    after(:create) do |group|
      dependent_group = create(:group_with_1_survey_answered, user: group.user)
      group_dependency = create(:group_dependency, groups: [dependent_group], group: group)
      group.update!(required_group_dependency: group_dependency)
    end
  end

  factory :group_with_1_group_dependency_not_answered, parent: :group_with_1_survey do
    after(:create) do |group|
      dependent_group = create(:group_with_1_survey, user: group.user)
      group_dependency = create(:group_dependency, groups: [dependent_group], group: group)
      group.update!(required_group_dependency: group_dependency)
    end
  end

  factory :group_answered_with_1_group_dependency_answered, parent: :group_with_1_survey_answered do
    after(:create) do |group|
      dependent_group = create(:group_with_1_survey_answered, user: group.user)
      group_dependency = create(:group_dependency, groups: [dependent_group], group: group)
      group.update!(required_group_dependency: group_dependency)
    end
  end

  factory :group_with_1_group_dependency_answered_and_1_not, parent: :group_with_1_survey do
    after(:create) do |group|
      dependent_group = create(:group_with_1_survey_answered, user: group.user)
      group_dependency = create(:group_dependency, groups: [dependent_group], group: group)
      group.update!(required_group_dependency: group_dependency)

      dependent_group2 = create(:group_with_1_survey, user: group.user)
      group_dependency2 = create(:group_dependency, groups: [dependent_group2], group: dependent_group)
      dependent_group.update!(required_group_dependency: group_dependency2)
    end
  end

  factory :group_with_2_group_dependencies_levels, parent: :group_with_1_survey do
    after(:create) do |group|
      # TODO: extract this to a method named addDependency
      dependent_group = create(:group_with_1_survey, user: group.user)
      group_dependency = create(:group_dependency, groups: [dependent_group], group: group)
      group.update!(required_group_dependency: group_dependency)

      dependent_group2 = create(:group_with_1_survey, user: group.user)
      group_dependency2 = create(:group_dependency, groups: [dependent_group2], group: dependent_group)
      dependent_group.update!(required_group_dependency: group_dependency2)
    end
  end
end
