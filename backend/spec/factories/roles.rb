FactoryBot.define do
  factory :role_teacher, class: "Role" do
    role_type { "teacher" }
  end

  factory :role_admin, class: "Role" do
    role_type { "admin" }
  end

  factory :role_moderator, class: "Role" do
    role_type { "moderator" }
  end

end
