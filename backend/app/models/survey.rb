class Survey < ApplicationRecord
  validate :validates_ready
  belongs_to :user
  belongs_to :survey_subject

  has_many :questions, dependent: :nullify
  has_many :answers_surveys, dependent: :destroy

  scope :by_user, lambda { |user|
    return where(user_id: user).includes([:questions]) unless user.admin?

    all.includes([:questions])
  }

  scope :ready_surveys, -> { where(ready: true).includes([:questions]) }

  def validates_ready
    ready_questions = questions.all?(&:ready_to_be_answered)
    # i18n-tasks-use t('activerecord.errors.models.survey.attributes.ready.cant_update_ready')
    errors.add(:ready, :cant_update_ready) if ready && questions.any? && !ready_questions
  end
end
