class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null

  has_many :answers_surveys, dependent: :destroy
  has_many :options, dependent: :destroy
  has_many :questions, dependent: :destroy
  has_many :surveys, dependent: :destroy
  has_many :groups, dependent: :destroy
  has_many :trails, dependent: :destroy

  belongs_to :role

  delegate :admin?, to: :role
  delegate :teacher?, to: :role
  delegate :student?, to: :role
end
