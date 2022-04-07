FactoryBot.define do
  factory :user do
    email { Faker::Internet.unique.email }
    password { '123456' }
    role { Role.find_by(role_type: Role::ADMIN) || create(:role_admin) }
  end

  factory :user_moderator, parent: :user do
    role { Role.find_by(role_type: Role::MODERATOR) || create(:role_moderator) }
  end

  factory :user_admin, parent: :user do
    role { Role.find_by(role_type: Role::ADMIN) || create(:role_admin) }
  end

  factory :user_teacher, parent: :user do
    role { Role.find_by(role_type: Role::TEACHER) || create(:role_teacher) }
  end

  factory :user_student, parent: :user do
    role { Role.find_by(role_type: Role::STUDENT) || create(:role_student) }
  end

  factory :user_with_surveys, parent: :user do
    surveys { build_list :survey, 1 }
  end
end
