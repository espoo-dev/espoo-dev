# == Schema Information
#
# Table name: roles
#
#  id         :bigint           not null, primary key
#  role_type  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :role do
    role_type { Role::MODERATOR }
    initialize_with { Role.find_or_create_by(role_type: Role::MODERATOR) }
  end

  factory :role_admin, parent: :role do
    role_type { Role::ADMIN }
    initialize_with { Role.find_or_create_by(role_type: Role::ADMIN) }
  end

  factory :role_teacher, parent: :role do
    role_type { Role::TEACHER }
    initialize_with { Role.find_or_create_by(role_type: Role::TEACHER) }
  end

  factory :role_moderator, parent: :role do
    role_type { Role::MODERATOR }
  end

  factory :role_student, parent: :role do
    role_type { Role::STUDENT }
    initialize_with { Role.find_or_create_by(role_type: Role::STUDENT) }
  end
end
