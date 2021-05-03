FactoryBot.define do
  factory :role do
    role_type { 'moderator' }
  end

  factory :role_admin, parent: :role do
    role_type { 'admin' }
  end

  factory :role_teacher, parent: :role do
    role_type { 'teacher' }
  end

  factory :role_moderator, parent: :role do
    role_type { 'moderator' }
  end
end
