class Question < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: :user_id }
  validate :validates_options
  belongs_to :user
  belongs_to :question_type
  belongs_to :survey, optional: true
  has_many :options, dependent: :destroy

  delegate :single_choice?, to: :question_type

  scope :by_user, lambda { |user|
    return all.includes([:options]) if user.admin?

    where(user_id: user).includes([:options])
  }

  private

  def validates_options
    many_correct_options = options.correct.count > 1
    # i18n-tasks-use t('activerecord.errors.models.question.attributes.question_type.cant_change_question_type')
    errors.add(:question_type, :cant_change_question_type) if many_correct_options && single_choice?
  end
end
