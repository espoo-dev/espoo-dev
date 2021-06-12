class Survey < ApplicationRecord
  belongs_to :user

  has_many :questions, dependent: :nullify
  has_many :answers_surveys, dependent: :destroy

  scope :by_user, lambda { |user|
    return where(user_id: user).includes([:questions]) unless user.admin?

    all.includes([:questions])
  }
end
