class Option < ApplicationRecord
  belongs_to :user
  belongs_to :question
  validates :name, presence: true
  validate :validates_correct
  validate :validates_ready

  scope :correct, -> { where(correct: true) }

  private

  def validates_correct
    correct_options_positive = question&.options&.correct&.any?
    # i18n-tasks-use t('activerecord.errors.models.option.attributes.base.cant_create_option')
    errors.add(:base, :cant_create_option) if !correct_was && correct && question.single_choice? && correct_options_positive
  end

  def validates_ready
    # i18n-tasks-use t('activerecord.errors.models.option.attributes.correct.cant_update_correct')
    errors.add(:correct, :cant_update_correct) if validation_helper
  end

  def validation_helper
    one_question = question&.options&.correct&.count == 1
    correct_was && !correct && question&.ready_to_be_answered && one_question
  end
end
