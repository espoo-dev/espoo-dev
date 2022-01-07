class Question < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: :user_id }
  validate :validates_options
  validate :validates_ready
  validate :validates_ready_survey
  validate :survey_must_have_same_user

  belongs_to :user
  belongs_to :question_type
  belongs_to :survey, optional: true

  has_many :options, dependent: :destroy
  has_many :answers, dependent: :destroy

  delegate :single_choice?, to: :question_type, allow_nil: true
  delegate :free_text?, to: :question_type, allow_nil: true

  scope :by_user, lambda { |user|
    return where(user_id: user).includes([:options]) unless user.admin?

    all.includes([:options])
  }

  scope :answered_by_answers_survey, lambda { |answers_survey|
    joins(:answers).where(answers: { answers_survey_id: answers_survey.id })
  }

  private

  def survey_must_have_same_user
    return unless user&.present? && survey&.present?

    # i18n-tasks-use t('activerecord.errors.models.question.attributes.user_id.must_be_same_user')
    errors.add(:user_id, :must_be_same_user) if user != survey.user
  end

  def validates_options
    many_correct_options = options.correct.count > 1
    # i18n-tasks-use t('activerecord.errors.models.question.attributes.question_type.cant_change_question_type')
    errors.add(:question_type, :cant_change_question_type) if single_choice? && many_correct_options
  end

  def validates_ready
    # i18n-tasks-use t('activerecord.errors.models.question.attributes.base.not_ready_question')
    errors.add(:base, :not_ready_question) if ready_to_be_answered && options.correct.none?
  end

  def validates_ready_survey
    # i18n-tasks-use t('activerecord.errors.models.question.attributes.ready_to_be_answered.cant_update_ready_to_be_answered')
    errors.add(:ready_to_be_answered, :cant_update_ready_to_be_answered) if !ready_to_be_answered && survey&.ready
  end
end
