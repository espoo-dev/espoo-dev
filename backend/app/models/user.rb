class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null

  belongs_to :role
  has_many :questions, dependent: :destroy
  has_many :surveys, dependent: :destroy

  validates :role, presence: true
  delegate :admin?, to: :role
end
