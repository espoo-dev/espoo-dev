# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  phone                  :string
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  role_id                :bigint           not null
#
# Foreign Keys
#
#  fk_rails_...  (role_id => roles.id)
#
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

  after_create :slack_notify

  private

  def slack_notify
    SlackService.call(message)
  end

  def message
    I18n.t('users.create', **translate_arguments)
  end

  def translate_arguments
    {
      role: role.role_type.humanize,
      date: created_at,
      admin: roles_count(Role::ADMIN),
      teacher: roles_count(Role::TEACHER),
      student: roles_count(Role::STUDENT),
      total: User.count
    }
  end

  def roles_count(type)
    Role.find_by(role_type: type)&.users&.count || 0
  end
end
