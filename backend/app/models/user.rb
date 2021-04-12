class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null

  ADMIN_ROLE = 'admin'.freeze
  ROLES = [ADMIN_ROLE, 'moderator'].freeze

  validates :role, presence: true, inclusion: { in: ROLES }

  def admin?
    role == ROLES[0]
  end
end
