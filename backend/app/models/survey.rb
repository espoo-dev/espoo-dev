class Survey < ApplicationRecord
  validate :validates_ready
  validates :icon_url, format: { with: /\A#{URI::DEFAULT_PARSER.make_regexp(%w[http https])}\z/ }, allow_blank: true, allow_nil: true
  belongs_to :user
  belongs_to :survey_subject
  belongs_to :group, optional: true

  has_many :questions, dependent: :nullify
  has_many :answers_surveys, dependent: :destroy

  scope :by_user, lambda { |user|
    return where(user_id: user).includes([:questions]) unless user.admin?

    all.includes([:questions])
  }

  scope :ready_surveys, -> { where(ready: true).order(id: :desc) }

  scope :ready_surveys_eager, -> { ready_surveys.includes([:questions]) }

  def last_answers_survey(user)
    answers_surveys.where(user: user).last
  end

  def last_answers_quantity(user)
    last_answers_survey(user)&.answers&.count || 0
  end

  def validates_ready
    ready_questions = questions.all?(&:ready_to_be_answered)
    # i18n-tasks-use t('activerecord.errors.models.survey.attributes.ready.cant_update_ready')
    errors.add(:ready, :cant_update_ready) if ready && questions.any? && !ready_questions
  end

  def answers_ids_of_answers_surveys
    answers_surveys.map(&:answers_ids).flatten
  end
end
