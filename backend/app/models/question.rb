class Question < ApplicationRecord
  validates :name, presence: true
  validate :validates_options, on: :update
  belongs_to :user
  belongs_to :question_type
  belongs_to :survey, optional: true
  has_many :options, dependent: :destroy

  private

  def validates_options
    # i18n-tasks-use t('activerecord.errors.models.question.attributes.question_type.cant_change_question_type')
    errors.add(:question_type, :cant_change_question_type) if options.correct.count > 1 && question_type.name == 'Single Choice'
  end
end
