FactoryBot.define do
  factory :role do
    role_type { Role::MODERATOR }
  end

  factory :role_admin, parent: :role do
    role_type { Role::ADMIN }
  end

  factory :role_teacher, parent: :role do
    role_type { Role::TEACHER }
  end

  factory :role_moderator, parent: :role do
    role_type { Role::MODERATOR }
  end
end
