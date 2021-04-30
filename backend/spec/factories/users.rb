FactoryBot.define do
  factory :user do
    email { Faker::Internet.unique.email }
    password { '123456' }
    association :role, factory: :role_admin
  end

  factory :user_moderator, parent: :user do
    association :role, factory: :role_moderator
  end

  factory :user_teacher, parent: :user do
    association :role, factory: :role_teacher
  end

  factory :user_with_surveys, parent: :user do
    surveys { build_list :survey, 1 }
  end
end
