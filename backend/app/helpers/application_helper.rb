module ApplicationHelper
  def teacher_role
    Role.find_by(role_type: Role::TEACHER)
  end

  def student_role
    Role.find_by(role_type: Role::STUDENT)
  end
end
