class Option < ApplicationRecord
  belongs_to :user
  belongs_to :question
  validates :name, presence: true
  validate :validates_correct

  scope :correct, -> { where(correct: true) }

  private

  def validates_correct
    return unless question

    # i18n-tasks-use t('activerecord.errors.models.option.attributes.base.cant_create_option')
    errors.add(:base, :cant_create_option) if question.options.correct.count.positive? && question.question_type.name == 'Single Choice' && correct
  end
end
