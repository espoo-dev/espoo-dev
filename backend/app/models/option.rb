class Option < ApplicationRecord
  belongs_to :user
  belongs_to :question
  validates :name, presence: true
  validate :validates_correct
  validate :validates_ready

  scope :correct, -> { where(correct: true) }

  delegate :single_choice?, to: :question, allow_nil: true

  private

  def validates_correct
    correct_options_positive = question&.options&.correct&.any?
    # i18n-tasks-use t('activerecord.errors.models.option.attributes.base.cant_create_option')
    return if correct_was

    errors.add(:base, :cant_create_option) if correct && single_choice? && correct_options_positive
  end

  # rubocop:disable Metrics/PerceivedComplexity
  def validates_ready
    one_question = question&.options&.correct&.one?
    # i18n-tasks-use t('activerecord.errors.models.option.attributes.correct.cant_update_correct')
    return unless correct_was

    errors.add(:correct, :cant_update_correct) if !correct && question&.ready_to_be_answered && one_question
  end
  # rubocop:enable Metrics/PerceivedComplexity
end
