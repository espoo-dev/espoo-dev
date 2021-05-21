class Survey < ApplicationRecord
  belongs_to :user
  has_many :questions, dependent: :nullify

  scope :by_user, lambda { |user|
    return Survey.where(user_id: user).includes([:questions]) unless user.admin?

    Survey.all.includes([:questions])
  }
end
