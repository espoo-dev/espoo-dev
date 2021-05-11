class Role < ApplicationRecord
  has_many :users, dependent: :nullify
  validates :role_type, presence: true
  validates :role_type, uniqueness: true

  ADMIN = 'admin'.freeze
  TEACHER = 'teacher'.freeze
  MODERATOR = 'moderator'.freeze

  def admin?
    role_type == ADMIN
  end
end
