class Option < ApplicationRecord
  belongs_to :user
  belongs_to :question
  validates :name, presence: true
  validate :validates_correct

  scope :correct, -> { where(correct: true) }

  private

  def validates_correct
    correct_options_positive = question&.options&.correct&.any?
    # i18n-tasks-use t('activerecord.errors.models.option.attributes.base.cant_create_option')
    errors.add(:base, :cant_create_option) if correct && question.single_choice? && correct_options_positive
  end
end
