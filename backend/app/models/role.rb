class Role < ApplicationRecord
  has_many :users, dependent: :nullify
  validates :role_type, presence: true

  def admin?
    role_type == 'admin'
  end
end
