class Role < ApplicationRecord
  has_many :users, dependent: :nullify
  validates :role_type, presence: true
  validates :role_type, uniqueness: true

  before_destroy :check_users_before_destroy, prepend: true

  scope :by_user, lambda { |user|
    return all if user&.admin?

    where.not(role_type: Role::ADMIN)
  }

  ADMIN = 'admin'.freeze
  TEACHER = 'teacher'.freeze
  MODERATOR = 'moderator'.freeze
  STUDENT = 'student'.freeze

  def admin?
    role_type == ADMIN
  end

  def student?
    role_type == STUDENT
  end

  def check_users_before_destroy
    users_count = User.where(role_id: id)

    return unless users_count.any?

    # i18n-tasks-use t('activerecord.errors.models.role.attributes.users.cant_destroy_role')
    errors.add(:users, :cant_destroy_role, users_count: users_count.count)

    throw :abort
  end
end
